import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Mail, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Alert, AlertDescription } from '@/components/ui/alert';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const EmailSubscription = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validateApiKey = (key: string) => {
    return key.length >= 20; // Basic validation for API key length
  };

  const handleSubscribe = async () => {
    try {
      // Validate inputs
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      if (!validateApiKey(apiKey)) {
        setError('Please enter a valid Gmail API key');
        return;
      }

      setIsLoading(true);
      setError('');
      setSuccess('');

      // First, verify the API key by making a test request
      const testResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!testResponse.ok) {
        throw new Error('Invalid Gmail API key. Please check your credentials.');
      }

      // Store API key in Supabase
      const { error: storageError } = await supabase
        .from('gmail_api_keys')
        .upsert([
          {
            email: email,
            api_key: apiKey,
            created_at: new Date().toISOString(),
          },
        ], {
          onConflict: 'email'
        });

      if (storageError) {
        console.error('Storage error:', storageError);
        throw new Error('Failed to store API key. Please try again.');
      }

      // Send welcome email using Gmail API
      const emailContent = {
        to: email,
        subject: 'Welcome to Sneakers Price Comparison Bot',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6B46C1;">Welcome to Sneakers Price Comparison Bot!</h1>
            <p style="color: #4A5568; line-height: 1.6;">
              Thank you for subscribing to our service. We will keep you updated with the best sneaker deals.
            </p>
            <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <h2 style="color: #2D3748;">What's Next?</h2>
              <ul style="color: #4A5568;">
                <li>Get notified about price drops</li>
                <li>Receive weekly deal summaries</li>
                <li>Access exclusive sneaker deals</li>
              </ul>
            </div>
          </div>
        `
      };

      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw: btoa(
            `To: ${emailContent.to}\r\n` +
            `Subject: ${emailContent.subject}\r\n` +
            'Content-Type: text/html; charset=utf-8\r\n\r\n' +
            emailContent.html
          ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to send welcome email');
      }

      setSuccess('Successfully subscribed! Welcome email sent.');
      setEmail('');
      setApiKey('');
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
      >
        <Mail className="w-4 h-4 mr-2" />
        Subscribe for Updates
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-800 border-purple-500/20">
          <DialogHeader>
            <DialogTitle className="text-purple-200">Subscribe for Updates</DialogTitle>
            <DialogDescription className="text-purple-300">
              Enter your email and Gmail API key to receive price updates and notifications.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-purple-500/20 text-white"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-purple-200">Gmail API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Gmail API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-gray-700 border-purple-500/20 text-white"
                disabled={isLoading}
              />
              <p className="text-xs text-purple-300">
                You can get your Gmail API key from the Google Cloud Console
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-500/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-900/50 border-green-500/20">
                <AlertDescription className="text-green-200">{success}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleSubscribe}
              disabled={isLoading || !email || !apiKey}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailSubscription; 