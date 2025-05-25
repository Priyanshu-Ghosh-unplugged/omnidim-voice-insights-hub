
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { MessageSquare, Send, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface Conversation {
  id: string;
  user_input: string;
  bot_response: string;
  price: number;
  metadata: any;
  created_at: string;
}

const ConversationLogger = () => {
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [price, setPrice] = useState('0.00');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortByPrice, setSortByPrice] = useState(false);
  const { user } = useAuth();

  // Fetch conversations on component mount
  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user, sortByPrice]);

  const fetchConversations = async () => {
    try {
      let query = supabase
        .from('conversations')
        .select('*');

      if (sortByPrice) {
        query = query.order('price', { ascending: true });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      setConversations(data || []);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const logConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('conversations')
        .insert([
          {
            user_id: user.id,
            user_input: userInput,
            bot_response: botResponse,
            price: parseFloat(price),
            metadata: {
              timestamp: new Date().toISOString(),
              user_agent: navigator.userAgent
            }
          }
        ]);

      if (error) throw error;

      // Clear form
      setUserInput('');
      setBotResponse('');
      setPrice('0.00');

      // Refresh conversations
      fetchConversations();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const totalPrice = conversations.reduce((sum, conv) => sum + conv.price, 0);

  return (
    <div className="space-y-6">
      {/* Logging Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Log New Conversation
          </CardTitle>
          <CardDescription>
            Record chatbot interactions with pricing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={logConversation} className="space-y-4">
            <div>
              <label className="text-sm font-medium">User Input</label>
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter user's message..."
                required
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Bot Response</label>
              <Textarea
                value={botResponse}
                onChange={(e) => setBotResponse(e.target.value)}
                placeholder="Enter bot's response..."
                required
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Price (USD)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Price represents the cost of processing this conversation (API calls, compute time, etc.)
              </p>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Logging...' : 'Log Conversation'}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Total Conversations</span>
            </div>
            <p className="text-2xl font-bold mt-1">{conversations.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Total Cost</span>
            </div>
            <p className="text-2xl font-bold mt-1">${totalPrice.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Avg Cost</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              ${conversations.length > 0 ? (totalPrice / conversations.length).toFixed(2) : '0.00'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conversations List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Conversation History</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortByPrice(!sortByPrice)}
            >
              Sort by {sortByPrice ? 'Date' : 'Price'}
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <CardDescription>
            {sortByPrice ? 'Sorted by price (ascending)' : 'Sorted by date (newest first)'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatDate(conversation.created_at)}
                    </span>
                  </div>
                  <Badge variant="secondary">
                    ${conversation.price.toFixed(2)}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-blue-700">User:</p>
                    <p className="text-sm bg-blue-50 p-2 rounded">{conversation.user_input}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700">Bot:</p>
                    <p className="text-sm bg-green-50 p-2 rounded">{conversation.bot_response}</p>
                  </div>
                </div>
              </div>
            ))}
            {conversations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No conversations logged yet. Start by logging your first conversation above.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationLogger;
