
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Mic, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare,
  TrendingUp,
  Calendar,
  Star,
  Activity
} from 'lucide-react';

const VoiceAgentDashboard = () => {
  const recentInteractions = [
    {
      id: 1,
      caller: "John Smith",
      project: "Website Redesign",
      duration: "4:32",
      timestamp: "2 minutes ago",
      sentiment: "positive",
      status: "completed"
    },
    {
      id: 2,
      caller: "Sarah Johnson",
      project: "Mobile App Development",
      duration: "7:18",
      timestamp: "8 minutes ago",
      sentiment: "neutral",
      status: "completed"
    },
    {
      id: 3,
      caller: "Mike Wilson",
      project: "E-commerce Platform",
      duration: "3:45",
      timestamp: "15 minutes ago",
      sentiment: "positive",
      status: "completed"
    }
  ];

  const topProjects = [
    {
      name: "Website Redesign",
      inquiries: 45,
      engagement: 92,
      lastContact: "2 hours ago"
    },
    {
      name: "Mobile App Development",
      inquiries: 38,
      engagement: 87,
      lastContact: "4 hours ago"
    },
    {
      name: "E-commerce Platform",
      inquiries: 32,
      engagement: 84,
      lastContact: "1 hour ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Voice Agent Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Voice Agent Status
            </CardTitle>
            <CardDescription className="text-blue-100">
              Real-time monitoring of Omnidim integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Connection Status</span>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Uptime</span>
                <span>99.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Response Time</span>
                <span>1.2s avg</span>
              </div>
              <Separator className="bg-blue-400" />
              <Button variant="secondary" size="sm" className="w-full">
                View Technical Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Today's Performance
            </CardTitle>
            <CardDescription>
              Key metrics for voice interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Call Volume</span>
                  <span>67/100</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Resolution Rate</span>
                  <span>84/100</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Customer Satisfaction</span>
                  <span>92/100</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Interactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Voice Interactions
          </CardTitle>
          <CardDescription>
            Latest calls processed by the Omnidim agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInteractions.map((interaction) => (
              <div key={interaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{interaction.caller}</p>
                    <p className="text-sm text-gray-600">{interaction.project}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{interaction.duration}</span>
                    <Badge 
                      variant={interaction.sentiment === 'positive' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {interaction.sentiment}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{interaction.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Performing Projects
          </CardTitle>
          <CardDescription>
            Projects ranked by user engagement and inquiry frequency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-600">{project.inquiries} inquiries</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{project.engagement}% engagement</span>
                  </div>
                  <p className="text-xs text-gray-500">Last: {project.lastContact}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAgentDashboard;
