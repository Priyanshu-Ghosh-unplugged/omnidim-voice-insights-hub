
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  Play, 
  Pause, 
  Phone,
  Clock,
  User,
  MessageSquare,
  Calendar,
  MapPin,
  Headphones
} from 'lucide-react';

const InteractionMonitor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLiveMonitoring, setIsLiveMonitoring] = useState(true);

  const interactions = [
    {
      id: "INT-001",
      caller: "John Smith",
      phone: "+1 (555) 123-4567",
      project: "Website Redesign",
      startTime: "2024-01-15 10:30:00",
      duration: "4:32",
      status: "completed",
      sentiment: "positive",
      transcript: "Hello, I'm interested in redesigning our company website...",
      location: "New York, NY",
      followUp: true
    },
    {
      id: "INT-002", 
      caller: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      project: "Mobile App Development",
      startTime: "2024-01-15 11:15:00",
      duration: "7:18",
      status: "completed",
      sentiment: "neutral",
      transcript: "We need a mobile app for our retail business...",
      location: "Los Angeles, CA",
      followUp: false
    },
    {
      id: "INT-003",
      caller: "Mike Wilson",
      phone: "+1 (555) 456-7890",
      project: "E-commerce Platform",
      startTime: "2024-01-15 12:00:00",
      duration: "3:45",
      status: "in-progress",
      sentiment: "positive",
      transcript: "Looking for a comprehensive e-commerce solution...",
      location: "Chicago, IL",
      followUp: true
    }
  ];

  const filteredInteractions = interactions.filter(interaction =>
    interaction.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Live Monitoring Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="w-5 h-5" />
            Live Interaction Monitoring
          </CardTitle>
          <CardDescription>
            Real-time monitoring and management of voice agent interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={isLiveMonitoring ? "default" : "outline"}
                onClick={() => setIsLiveMonitoring(!isLiveMonitoring)}
                className="flex items-center gap-2"
              >
                {isLiveMonitoring ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isLiveMonitoring ? 'Pause Monitoring' : 'Start Monitoring'}
              </Button>
              <Badge variant={isLiveMonitoring ? "default" : "secondary"}>
                {isLiveMonitoring ? 'Live' : 'Paused'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Log
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by caller name, project, or phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Advanced Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Interaction History</CardTitle>
          <CardDescription>
            Detailed log of all voice agent interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInteractions.map((interaction) => (
              <div key={interaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{interaction.caller}</h3>
                      <p className="text-sm text-gray-600">{interaction.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={interaction.status === 'completed' ? 'default' : 
                               interaction.status === 'in-progress' ? 'secondary' : 'destructive'}
                    >
                      {interaction.status}
                    </Badge>
                    <Badge 
                      variant={interaction.sentiment === 'positive' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {interaction.sentiment}
                    </Badge>
                  </div>
                </div>

                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="mt-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">Project:</span>
                        <span>{interaction.project}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">Duration:</span>
                        <span>{interaction.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">Start Time:</span>
                        <span>{new Date(interaction.startTime).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">Location:</span>
                        <span>{interaction.location}</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="transcript" className="mt-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">{interaction.transcript}</p>
                      <Button variant="link" size="sm" className="mt-2 p-0">
                        View Full Transcript
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="actions" className="mt-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4 mr-2" />
                        Replay Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      {interaction.followUp && (
                        <Button size="sm">
                          Schedule Follow-up
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractionMonitor;
