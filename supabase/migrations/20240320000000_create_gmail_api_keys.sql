-- Create table for storing Gmail API keys
CREATE TABLE IF NOT EXISTS gmail_api_keys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    api_key TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_gmail_api_keys_email ON gmail_api_keys(email);

-- Add RLS (Row Level Security) policies
ALTER TABLE gmail_api_keys ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to manage their own API keys
CREATE POLICY "Users can manage their own API keys"
    ON gmail_api_keys
    FOR ALL
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_gmail_api_keys_updated_at
    BEFORE UPDATE ON gmail_api_keys
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 