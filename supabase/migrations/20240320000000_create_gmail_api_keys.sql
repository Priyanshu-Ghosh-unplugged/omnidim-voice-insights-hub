-- Create table for storing Gmail API keys
CREATE TABLE IF NOT EXISTS gmail_api_keys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    api_key TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    last_used_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_api_key CHECK (length(api_key) >= 20)
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_gmail_api_keys_email ON gmail_api_keys(email);
CREATE INDEX IF NOT EXISTS idx_gmail_api_keys_is_active ON gmail_api_keys(is_active);

-- Add RLS (Row Level Security) policies
ALTER TABLE gmail_api_keys ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to manage their own API keys
CREATE POLICY "Users can manage their own API keys"
    ON gmail_api_keys
    FOR ALL
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Create policy to allow users to view their own API keys
CREATE POLICY "Users can view their own API keys"
    ON gmail_api_keys
    FOR SELECT
    USING (auth.uid() = id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function to update last_used_at timestamp
CREATE OR REPLACE FUNCTION update_last_used_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_used_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_gmail_api_keys_updated_at
    BEFORE UPDATE ON gmail_api_keys
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to automatically update last_used_at
CREATE TRIGGER update_gmail_api_keys_last_used_at
    BEFORE UPDATE ON gmail_api_keys
    FOR EACH ROW
    WHEN (OLD.api_key IS DISTINCT FROM NEW.api_key)
    EXECUTE FUNCTION update_last_used_at_column();

-- Create function to deactivate old API keys
CREATE OR REPLACE FUNCTION deactivate_old_api_keys()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE gmail_api_keys
    SET is_active = false
    WHERE email = NEW.email
    AND id != NEW.id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to deactivate old API keys
CREATE TRIGGER deactivate_old_gmail_api_keys
    BEFORE INSERT ON gmail_api_keys
    FOR EACH ROW
    EXECUTE FUNCTION deactivate_old_api_keys(); 