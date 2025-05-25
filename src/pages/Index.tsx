
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Mic, 
  Database, 
  Mail, 
  BarChart3, 
  Shield, 
  Settings, 
  Activity,
  FileText,
  MessageSquare,
  TrendingUp,
  Download,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ConversationLogger from '@/components/ConversationLogger';
import EmailSettings from '@/components/EmailSettings';
import VoiceAgentDashboard from '@/components/VoiceAgentDashboard';
import InteractionMonitor from '@/components/InteractionMonitor';
import DataAnalytics from '@/components/DataAnalytics';
import AutomationSettings from '@/components/AutomationSettings';
import SecurityPanel from '@/components/SecurityPanel';
import DocumentationPanel from '@/components/DocumentationPanel';

const Index = () => {
  const [isVoiceAgentActive, setIsVoiceAgentActive] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Initialize Omnidim voice agent
    const script = document.createElement('script');
    script.id = 'omnidimension-web-widget';
    script.async = true;
    script.src = 'https://backend.omnidim.io/web_widget.js?secret_key=9b46b5f166ac64575594de19b1858626';
    
    script.onload = () => {
      setIsVoiceAgentActive(true);
      console.log('Omnidim voice agent loaded successfully');
    };
    
    script.onerror = () => {
      console.error('Failed to load Omnidim voice agent');
    };
    
    document.head.appendChild(script);

    // Simulate interaction updates
    const interval = setInterval(() => {
      setInteractionCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => {
      clearInterval(interval);
      const existingScript = document.getElementById('omnidimension-web-widget');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: "Total Interactions",
      value: interactionCount.toString(),
      icon: MessageSquare,
      trend: "+12% from last week"
    },
    {
      title: "Active Projects",
      value: "24",
      icon: FileText,
      trend: "+3 new this month"
    },
    {
      title: "Email Reports Sent",
      value: "156",
      icon: Mail,
      trend: "8 pending delivery"
    },
    {
      title: "Data Sync Status",
      value: isVoiceAgentActive ? "Connected" : "Disconnected",
      icon: Database,
      trend: `Last sync: ${lastSyncTime.toLocaleTimeString()}`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Conversation Logger</h1>
                <p className="text-sm text-gray-600">Chatbot Analytics & Email Integration Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
              <Badge variant={isVoiceAgentActive ? "default" : "destructive"} className="px-3 py-1">
                <Activity className="w-3 h-3 mr-1" />
                {isVoiceAgentActive ? "Agent Active" : "Agent Offline"}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Alert */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <Activity className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Welcome to Conversation Logger!</AlertTitle>
          <AlertDescription className="text-green-700">
            Log chatbot conversations, analyze pricing data, and send reports via email. 
            All your conversation data is securely stored and can be exported at any time.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="logger" className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-8 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="logger" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Logger
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="interactions" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Monitor
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Docs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="logger">
            <ConversationLogger />
          </TabsContent>

          <TabsContent value="email">
            <EmailSettings />
          </TabsContent>

          <TabsContent value="dashboard">
            <VoiceAgentDashboard />
          </TabsContent>

          <TabsContent value="interactions">
            <InteractionMonitor />
          </TabsContent>

          <TabsContent value="analytics">
            <DataAnalytics />
          </TabsContent>

          <TabsContent value="automation">
            <AutomationSettings />
          </TabsContent>

          <TabsContent value="security">
            <SecurityPanel />
          </TabsContent>

          <TabsContent value="docs">
            <DocumentationPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
