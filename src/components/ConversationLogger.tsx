
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { MessageSquare, TrendingUp, Clock, DollarSign, Activity } from 'lucide-react';

interface Conversation {
  id: string;
  user_input: string;
  bot_response: string;
  price: number;
  metadata: any;
  created_at: string;
}

const ConversationLogger = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { user } = useAuth();

  // Fetch conversations on component mount
  useEffect(() => {
    if (user) {
      fetchConversations();
      startBotChatListener();
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

  const startBotChatListener = () => {
    if (!user) return;

    setIsListening(true);
    
    // Listen for Omnidim voice agent events
    const checkForOmnidimEvents = () => {
      if (window.omnidim) {
        console.log('Omnidim voice agent detected, setting up listeners');
        
        // Override or listen to Omnidim events if available
        if (window.omnidim.onConversation) {
          const originalHandler = window.omnidim.onConversation;
          window.omnidim.onConversation = (data: any) => {
            console.log('Captured conversation data:', data);
            logBotConversation(data.userInput, data.botResponse, data.price || 0.01);
            if (originalHandler) originalHandler(data);
          };
        }
      }
    };

    // Check for widget events via DOM mutations or custom events
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              // Look for chat messages in the Omnidim widget
              if (element.matches('[class*="chat"], [class*="message"], [id*="omnidim"]') ||
                  element.querySelector('[class*="chat"], [class*="message"]')) {
                console.log('Detected chat activity');
                extractConversationFromDOM();
              }
            }
          });
        }
      });
    });

    // Observe the entire document for chat widget changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Listen for custom events that might be dispatched by the chat widget
    const handleChatEvent = (event: any) => {
      console.log('Chat event detected:', event.detail);
      if (event.detail?.userMessage && event.detail?.botResponse) {
        logBotConversation(
          event.detail.userMessage,
          event.detail.botResponse,
          event.detail.price || 0.01
        );
      }
    };

    document.addEventListener('omnidim-conversation', handleChatEvent);
    document.addEventListener('chat-message', handleChatEvent);

    // Try to detect existing chat elements
    setTimeout(checkForOmnidimEvents, 2000);

    // Cleanup function
    return () => {
      observer.disconnect();
      document.removeEventListener('omnidim-conversation', handleChatEvent);
      document.removeEventListener('chat-message', handleChatEvent);
    };
  };

  const extractConversationFromDOM = () => {
    // Try to extract conversation data from DOM elements
    const chatElements = document.querySelectorAll('[class*="chat"], [class*="message"], [data-chat]');
    
    chatElements.forEach(element => {
      const textContent = element.textContent || '';
      if (textContent.length > 10) {
        // Simple heuristic to detect user vs bot messages
        const isUserMessage = element.className.includes('user') || 
                             element.getAttribute('data-role') === 'user';
        
        if (isUserMessage) {
          // Store user message temporarily
          sessionStorage.setItem('lastUserMessage', textContent);
        } else {
          // This might be a bot response
          const lastUserMessage = sessionStorage.getItem('lastUserMessage');
          if (lastUserMessage && lastUserMessage !== textContent) {
            logBotConversation(lastUserMessage, textContent, 0.01);
            sessionStorage.removeItem('lastUserMessage');
          }
        }
      }
    });
  };

  const logBotConversation = async (userInput: string, botResponse: string, price: number = 0.01) => {
    if (!user || !userInput || !botResponse) return;

    try {
      const { error } = await supabase
        .from('conversations')
        .insert([
          {
            user_id: user.id,
            user_input: userInput,
            bot_response: botResponse,
            price: price,
            metadata: {
              timestamp: new Date().toISOString(),
              source: 'omnidim_voice_agent',
              user_agent: navigator.userAgent,
              auto_logged: true
            }
          }
        ]);

      if (error) throw error;
      
      console.log('Conversation logged successfully');
      // Refresh conversations
      fetchConversations();
    } catch (error: any) {
      console.error('Failed to log conversation:', error);
      setError(`Failed to log conversation: ${error.message}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const totalPrice = conversations.reduce((sum, conv) => sum + conv.price, 0);

  return (
    <div className="space-y-6">
      {/* Auto-logging Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Automatic Bot Chat Logging
          </CardTitle>
          <CardDescription>
            Automatically capturing conversations from the Omnidim voice agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant={isListening ? "default" : "secondary"} className="px-3 py-1">
              <Activity className="w-3 h-3 mr-1" />
              {isListening ? "Listening for Chats" : "Not Active"}
            </Badge>
            <p className="text-sm text-gray-600">
              The system is monitoring for chat interactions and automatically logging them to the database.
            </p>
          </div>

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
            <CardTitle>Auto-Logged Conversations</CardTitle>
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
                    {conversation.metadata?.auto_logged && (
                      <Badge variant="outline" className="text-xs">
                        Auto-logged
                      </Badge>
                    )}
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
                No conversations logged yet. Start a chat with the voice agent to see data here.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationLogger;
