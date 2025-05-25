
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Mic, 
  Database, 
  Mail, 
  BarChart3, 
  Shield, 
  Settings, 
  Activity,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  MessageSquare,
  TrendingUp,
  Download
} from 'lucide-react';
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
                <h1 className="text-2xl font-bold text-gray-900">VoiceFlow Integration Platform</h1>
                <p className="text-sm text-gray-600">Omnidim Voice Agent Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isVoiceAgentActive ? "default" : "destructive"} className="px-3 py-1">
                <Activity className="w-3 h-3 mr-1" />
                {isVoiceAgentActive ? "Agent Active" : "Agent Offline"}
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Status Alert */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Integration Status</AlertTitle>
          <AlertDescription className="text-green-700">
            Omnidim voice agent is successfully integrated and monitoring user interactions. 
            Data flow to Google Sheets and email automation are operational.
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
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-6 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="interactions" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Interactions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
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
              Documentation
            </TabsTrigger>
          </TabsList>

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
