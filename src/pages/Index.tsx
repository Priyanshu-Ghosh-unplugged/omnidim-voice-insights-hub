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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <div className="border-b border-purple-500/20 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                  Sneakers Price Comparison Bot
                </h1>
                <p className="text-sm text-purple-200">Find the Best Deals on Your Favorite Sneakers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-200" />
                <span className="text-sm text-purple-200">{user.email}</span>
              </div>
              <Badge variant={isVoiceAgentActive ? "default" : "destructive"} className="px-3 py-1 bg-purple-600 hover:bg-purple-700">
                <Activity className="w-3 h-3 mr-1" />
                {isVoiceAgentActive ? "Agent Active" : "Agent Offline"}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="border-purple-500 text-purple-200 hover:bg-purple-600 hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Alert */}
        <Alert className="mb-6 border-purple-500/20 bg-purple-900/50">
          <Activity className="h-4 w-4 text-purple-400" />
          <AlertTitle className="text-purple-200">Welcome to Sneakers Price Comparison Bot!</AlertTitle>
          <AlertDescription className="text-purple-300">
            Compare prices across multiple platforms, track price history, and get notified of the best deals. 
            Your ultimate companion for finding the perfect sneakers at the best price.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 backdrop-blur-sm border-purple-500/20 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-200">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-xs text-purple-300 mt-1">{stat.trend}</p>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="logger" className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-8 bg-gray-800/50 backdrop-blur-sm border-purple-500/20">
            <TabsTrigger value="logger" className="flex items-center gap-2 text-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4" />
              Logger
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2 text-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="interactions" className="flex items-center gap-2 text-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4" />
              Monitor
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 text-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Database className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2 text-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Settings className="w-4 h-4" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 text-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2 text-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
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
