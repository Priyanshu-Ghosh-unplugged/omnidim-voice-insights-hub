
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Database, 
  Mail, 
  Settings, 
  Zap, 
  Calendar,
  FileSpreadsheet,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Webhook
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AutomationSettings = () => {
  const { toast } = useToast();
  const [sheetsUrl, setSheetsUrl] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [automations, setAutomations] = useState({
    googleSheets: true,
    emailReports: true,
    webhook: false,
    dailyReports: true,
    weeklyAnalysis: true
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Automation settings have been updated successfully.",
    });
  };

  const testConnection = (type: string) => {
    toast({
      title: "Testing Connection",
      description: `Testing ${type} integration...`,
    });
    
    // Simulate connection test
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: `${type} integration is working properly.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Automation Status */}
      <Alert className="border-blue-200 bg-blue-50">
        <Zap className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Automation Status</AlertTitle>
        <AlertDescription className="text-blue-700">
          All automation workflows are active and processing data in real-time. 
          Last successful data sync: 2 minutes ago.
        </AlertDescription>
      </Alert>

      {/* Google Sheets Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            Google Sheets Integration
          </CardTitle>
          <CardDescription>
            Automatically log voice interaction data to Google Sheets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable Google Sheets Sync</Label>
              <p className="text-sm text-gray-600">Real-time data logging to spreadsheet</p>
            </div>
            <Switch 
              checked={automations.googleSheets}
              onCheckedChange={(checked) => 
                setAutomations(prev => ({ ...prev, googleSheets: checked }))
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sheets-url">Google Sheets URL</Label>
            <div className="flex gap-2">
              <Input
                id="sheets-url"
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={sheetsUrl}
                onChange={(e) => setSheetsUrl(e.target.value)}
              />
              <Button variant="outline" onClick={() => testConnection('Google Sheets')}>
                Test
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Data Fields Being Logged:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>• Caller Information</div>
              <div>• Call Duration</div>
              <div>• Project Interest</div>
              <div>• Sentiment Analysis</div>
              <div>• Timestamp</div>
              <div>• Location Data</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Automation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Automation
          </CardTitle>
          <CardDescription>
            Automated email reports with top projects and call summaries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable Email Reports</Label>
              <p className="text-sm text-gray-600">Send automated project analysis emails</p>
            </div>
            <Switch 
              checked={automations.emailReports}
              onCheckedChange={(checked) => 
                setAutomations(prev => ({ ...prev, emailReports: checked }))
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipient-email">Recipient Email</Label>
              <Input
                id="recipient-email"
                type="email"
                placeholder="reports@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="send-frequency">Send Frequency</Label>
              <Input
                id="send-frequency"
                placeholder="Daily at 9:00 AM"
                disabled
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-template">Email Template</Label>
            <Textarea
              id="email-template"
              placeholder="Subject: Daily Voice Agent Report&#10;&#10;Dear Team,&#10;&#10;Here's your daily summary of voice agent interactions..."
              value={emailTemplate}
              onChange={(e) => setEmailTemplate(e.target.value)}
              rows={6}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Send className="w-4 h-4 mr-2" />
              Send Test Email
            </Button>
            <Button variant="outline" onClick={() => testConnection('Email Service')}>
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="w-5 h-5" />
            Webhook Integration
          </CardTitle>
          <CardDescription>
            Send real-time data to external systems via webhooks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable Webhook</Label>
              <p className="text-sm text-gray-600">Send data to external APIs in real-time</p>
            </div>
            <Switch 
              checked={automations.webhook}
              onCheckedChange={(checked) => 
                setAutomations(prev => ({ ...prev, webhook: checked }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                placeholder="https://your-api.com/webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <Button variant="outline" onClick={() => testConnection('Webhook')}>
                Test
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Webhook Payload Example:</h4>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
{`{
  "event": "call_completed",
  "data": {
    "caller": "John Smith",
    "project": "Website Redesign",
    "duration": "4:32",
    "sentiment": "positive",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Scheduled Reports
          </CardTitle>
          <CardDescription>
            Configure automated report generation and delivery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Daily Summary Report</h4>
                <p className="text-sm text-gray-600">Daily overview of interactions and top projects</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  9:00 AM
                </Badge>
                <Switch 
                  checked={automations.dailyReports}
                  onCheckedChange={(checked) => 
                    setAutomations(prev => ({ ...prev, dailyReports: checked }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Weekly Analysis Report</h4>
                <p className="text-sm text-gray-600">Comprehensive weekly performance analysis</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Monday 8:00 AM
                </Badge>
                <Switch 
                  checked={automations.weeklyAnalysis}
                  onCheckedChange={(checked) => 
                    setAutomations(prev => ({ ...prev, weeklyAnalysis: checked }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Save Configuration</h3>
              <p className="text-sm text-gray-600">Apply all automation settings</p>
            </div>
            <Button onClick={handleSaveSettings} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Save All Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationSettings;
