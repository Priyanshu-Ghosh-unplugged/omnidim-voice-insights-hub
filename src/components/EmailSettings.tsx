
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Settings, Send, Eye, EyeOff } from 'lucide-react';

const EmailSettings = () => {
  const [gmailApiKey, setGmailApiKey] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserSettings();
    }
  }, [user]);

  const fetchUserSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('gmail_api_key, email_address')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setGmailApiKey(data.gmail_api_key || '');
        setEmailAddress(data.email_address || '');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert([
          {
            user_id: user.id,
            gmail_api_key: gmailApiKey,
            email_address: emailAddress
          }
        ]);

      if (error) throw error;
      setSuccess('Settings saved successfully!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendConversationLog = async () => {
    if (!user || !gmailApiKey || !emailAddress) {
      setError('Please save your Gmail API key and email address first.');
      return;
    }

    setSendingEmail(true);
    setError(null);
    setSuccess(null);

    try {
      // Fetch all conversations
      const { data: conversations, error: fetchError } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Call edge function to send email
      const { data, error } = await supabase.functions.invoke('send-conversation-log', {
        body: {
          conversations,
          emailAddress,
          gmailApiKey
        }
      });

      if (error) throw error;
      setSuccess('Conversation log sent successfully!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Gmail API Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Gmail API Configuration
          </CardTitle>
          <CardDescription>
            Configure your Gmail API credentials to send conversation logs via email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={saveSettings} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="your-email@gmail.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Gmail API Key</label>
              <div className="relative mt-1">
                <Input
                  type={showApiKey ? 'text' : 'password'}
                  value={gmailApiKey}
                  onChange={(e) => setGmailApiKey(e.target.value)}
                  placeholder="Enter your Gmail API key"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your API key is securely stored and never shared
              </p>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </form>

          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Send Email Button */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Send Conversation Log
          </CardTitle>
          <CardDescription>
            Send your complete conversation history to your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={sendConversationLog} 
            disabled={sendingEmail || !gmailApiKey || !emailAddress}
            className="w-full"
            size="lg"
          >
            {sendingEmail ? 'Sending...' : 'Send Log via Email'}
            <Send className="w-4 h-4 ml-2" />
          </Button>
          
          {(!gmailApiKey || !emailAddress) && (
            <Alert className="mt-4 border-yellow-200 bg-yellow-50">
              <AlertDescription className="text-yellow-700">
                Please configure your Gmail API key and email address above before sending.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Gmail API Setup Guide</CardTitle>
          <CardDescription>
            Follow these steps to get your Gmail API key
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Step 1: Enable Gmail API</h4>
            <p className="text-sm text-gray-600">
              1. Go to the Google Cloud Console<br/>
              2. Create a new project or select existing one<br/>
              3. Enable the Gmail API for your project
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Step 2: Create Credentials</h4>
            <p className="text-sm text-gray-600">
              1. Go to Credentials section<br/>
              2. Click "Create Credentials" → "API Key"<br/>
              3. Restrict the key to Gmail API only
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Step 3: Configure OAuth</h4>
            <p className="text-sm text-gray-600">
              1. Set up OAuth 2.0 consent screen<br/>
              2. Add your email to test users<br/>
              3. Create OAuth 2.0 Client ID
            </p>
          </div>
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-blue-700">
              <strong>Security Note:</strong> Your API key is encrypted and stored securely. 
              We recommend using OAuth 2.0 for production applications.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSettings;
