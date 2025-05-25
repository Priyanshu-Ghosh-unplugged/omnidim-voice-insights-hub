
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Code, 
  Settings, 
  Database,
  Mail,
  Shield,
  Webhook,
  ExternalLink,
  BookOpen,
  HelpCircle,
  CheckCircle
} from 'lucide-react';

const DocumentationPanel = () => {
  const implementationSteps = [
    {
      step: 1,
      title: "Omnidim Voice Agent Integration",
      description: "Insert the Omnidim script into your website's HTML",
      status: "completed",
      code: `<script id="omnidimension-web-widget" async src="https://backend.omnidim.io/web_widget.js?secret_key=9b46b5f166ac64575594de19b1858626"></script>`
    },
    {
      step: 2,
      title: "Interaction Data Capture",
      description: "Set up webhooks to capture voice agent interaction details",
      status: "completed",
      code: `// Webhook endpoint to receive interaction data
app.post('/webhook/omnidim', (req, res) => {
  const interactionData = req.body;
  // Process and log interaction details
  logInteraction(interactionData);
  res.status(200).send('OK');
});`
    },
    {
      step: 3,
      title: "Google Sheets Integration",
      description: "Configure Google Sheets API to store interaction data",
      status: "completed",
      code: `const { GoogleSpreadsheet } = require('google-spreadsheet');

async function logToSheets(data) {
  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth(credentials);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow(data);
}`
    },
    {
      step: 4,
      title: "Project Analysis Algorithm",
      description: "Implement logic to identify top 3 projects from data",
      status: "completed",
      code: `function analyzeTopProjects(interactions) {
  const projectStats = {};
  
  interactions.forEach(interaction => {
    const project = interaction.project;
    if (!projectStats[project]) {
      projectStats[project] = {
        inquiries: 0,
        engagement: 0,
        satisfaction: 0
      };
    }
    
    projectStats[project].inquiries++;
    projectStats[project].engagement += interaction.engagement;
    projectStats[project].satisfaction += interaction.rating;
  });
  
  return Object.entries(projectStats)
    .sort((a, b) => b[1].inquiries - a[1].inquiries)
    .slice(0, 3);
}`
    },
    {
      step: 5,
      title: "Email Automation Setup",
      description: "Configure automated email reports with project analysis",
      status: "completed",
      code: `const nodemailer = require('nodemailer');

async function sendProjectReport(topProjects, callDetails) {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'reports@company.com',
    subject: 'Top 3 Projects - Voice Agent Report',
    html: generateReportHTML(topProjects, callDetails)
  };
  
  await transporter.sendMail(mailOptions);
}`
    }
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/interactions",
      description: "Create new interaction record",
      example: `{
  "caller": "John Smith",
  "phone": "+1-555-123-4567",
  "project": "Website Redesign",
  "duration": "4:32",
  "sentiment": "positive"
}`
    },
    {
      method: "GET",
      endpoint: "/api/interactions",
      description: "Retrieve interaction history",
      example: `{
  "page": 1,
  "limit": 20,
  "filter": {
    "project": "Website Redesign",
    "date_range": "2024-01-01 to 2024-01-31"
  }
}`
    },
    {
      method: "GET",
      endpoint: "/api/analytics/top-projects",
      description: "Get top 3 projects analysis",
      example: `{
  "period": "last_30_days",
  "metrics": ["inquiries", "engagement", "satisfaction"]
}`
    }
  ];

  const troubleshooting = [
    {
      issue: "Omnidim script not loading",
      solution: "Verify the secret key and ensure the script is placed in the <head> section",
      severity: "high"
    },
    {
      issue: "Google Sheets sync failing",
      solution: "Check API credentials and sheet permissions",
      severity: "medium"
    },
    {
      issue: "Email reports not sending",
      solution: "Verify SMTP settings and email authentication",
      severity: "medium"
    },
    {
      issue: "Data analysis showing incorrect results",
      solution: "Review data filtering logic and date range calculations",
      severity: "low"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Integration Documentation
          </CardTitle>
          <CardDescription>
            Comprehensive guide for Omnidim voice agent integration with automated data flow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Implementation</h3>
              <p className="text-sm text-gray-600">Step-by-step integration guide</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">Configuration</h3>
              <p className="text-sm text-gray-600">Settings and automation setup</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                <HelpCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-2">Troubleshooting</h3>
              <p className="text-sm text-gray-600">Common issues and solutions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Tabs */}
      <Tabs defaultValue="implementation" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
        </TabsList>

        <TabsContent value="implementation">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Steps</CardTitle>
              <CardDescription>
                Follow these steps to integrate the complete voice agent system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {implementationSteps.map((step) => (
                  <div key={step.step} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-medium">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="font-medium">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {step.status}
                      </Badge>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <pre className="text-xs overflow-x-auto">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>
                Available endpoints for integration and data management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                        {endpoint.method}
                      </Badge>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{endpoint.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm font-medium mb-2">Example Request/Response:</h4>
                      <pre className="text-xs overflow-x-auto">
                        <code>{endpoint.example}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Best Practices</CardTitle>
              <CardDescription>
                Guidelines for secure implementation and data handling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium mb-2">Data Encryption</h3>
                  <p className="text-sm text-gray-600">
                    All voice interaction data is encrypted using AES-256 encryption both in transit and at rest.
                    Ensure your Google Sheets and email integrations use HTTPS/TLS.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium mb-2">API Authentication</h3>
                  <p className="text-sm text-gray-600">
                    Use service account credentials for Google Sheets API. Store API keys and secrets in 
                    environment variables, never in code repositories.
                  </p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-medium mb-2">Data Privacy</h3>
                  <p className="text-sm text-gray-600">
                    Implement data anonymization for PII. Follow GDPR and CCPA guidelines for data retention 
                    and user consent. Provide clear privacy policies for voice interactions.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-medium mb-2">Access Control</h3>
                  <p className="text-sm text-gray-600">
                    Implement role-based access control. Enable two-factor authentication for all admin accounts.
                    Regularly audit access logs and rotate credentials.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshooting">
          <Card>
            <CardHeader>
              <CardTitle>Common Issues & Solutions</CardTitle>
              <CardDescription>
                Frequently encountered problems and their resolutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {troubleshooting.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{item.issue}</h3>
                      <Badge 
                        variant={item.severity === 'high' ? 'destructive' : 
                                item.severity === 'medium' ? 'secondary' : 'outline'}
                      >
                        {item.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{item.solution}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="text-center">
                <h3 className="font-medium mb-2">Need Additional Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our support team for advanced troubleshooting and custom integration assistance.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Support Portal
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Download Documentation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Export Documentation</h3>
              <p className="text-sm text-gray-600">Download complete integration guide and code samples</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                PDF Guide
              </Button>
              <Button variant="outline" size="sm">
                <Code className="w-4 h-4 mr-2" />
                Code Samples
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationPanel;
