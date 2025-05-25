import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Mail, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

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

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      // Store API key in Supabase
      const { error: storageError } = await supabase
        .from('gmail_api_keys')
        .upsert([
          {
            email: email,
            api_key: apiKey,
            created_at: new Date().toISOString(),
          },
        ]);

      if (storageError) throw storageError;

      // Send welcome email using Gmail API
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw: btoa(
            `To: ${email}\r\n` +
            'Subject: Welcome to Sneakers Price Comparison Bot\r\n' +
            'Content-Type: text/html; charset=utf-8\r\n\r\n' +
            '<h1>Welcome to Sneakers Price Comparison Bot!</h1>' +
            '<p>Thank you for subscribing to our service. We will keep you updated with the best sneaker deals.</p>'
          ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
        }),
      });

      if (!response.ok) throw new Error('Failed to send email');

      setSuccess('Successfully subscribed! Welcome email sent.');
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {success && (
              <p className="text-green-400 text-sm">{success}</p>
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