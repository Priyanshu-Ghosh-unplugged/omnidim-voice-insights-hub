
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Lock, 
  Eye, 
  Key, 
  AlertTriangle,
  CheckCircle,
  FileText,
  Clock,
  Users,
  Database,
  Globe
} from 'lucide-react';

const SecurityPanel = () => {
  const [securitySettings, setSecuritySettings] = useState({
    dataEncryption: true,
    accessLogging: true,
    ipWhitelist: false,
    twoFactorAuth: true,
    dataRetention: true,
    anonymization: true
  });

  const securityScore = 85;

  const securityLogs = [
    {
      timestamp: "2024-01-15 10:30:00",
      event: "Data Access",
      user: "admin@company.com",
      action: "Exported interaction logs",
      status: "success"
    },
    {
      timestamp: "2024-01-15 09:15:00",
      event: "Authentication",
      user: "user@company.com",
      action: "Successful login",
      status: "success"
    },
    {
      timestamp: "2024-01-15 08:45:00",
      event: "API Request",
      user: "system",
      action: "Google Sheets sync",
      status: "success"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Score */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Shield className="w-5 h-5" />
            Security Score
          </CardTitle>
          <CardDescription className="text-green-700">
            Overall security posture assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-800">{securityScore}/100</span>
              <Badge className="bg-green-600 text-white">Excellent</Badge>
            </div>
            <Progress value={securityScore} className="h-3" />
            <p className="text-sm text-green-700">
              Your security configuration meets industry best practices for voice agent data handling.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data Privacy & Protection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Data Privacy & Protection
          </CardTitle>
          <CardDescription>
            Configure data handling and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Data Encryption</Label>
                  <p className="text-sm text-gray-600">Encrypt all voice interaction data</p>
                </div>
                <Switch 
                  checked={securitySettings.dataEncryption}
                  onCheckedChange={(checked) => 
                    setSecuritySettings(prev => ({ ...prev, dataEncryption: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Data Anonymization</Label>
                  <p className="text-sm text-gray-600">Remove PII from stored data</p>
                </div>
                <Switch 
                  checked={securitySettings.anonymization}
                  onCheckedChange={(checked) => 
                    setSecuritySettings(prev => ({ ...prev, anonymization: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Data Retention Policy</Label>
                  <p className="text-sm text-gray-600">Auto-delete old interaction data</p>
                </div>
                <Switch 
                  checked={securitySettings.dataRetention}
                  onCheckedChange={(checked) => 
                    setSecuritySettings(prev => ({ ...prev, dataRetention: checked }))
                  }
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Data Protection Status
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>AES-256 encryption enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>GDPR compliance active</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>90-day retention policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>PII anonymization enabled</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Access Control
          </CardTitle>
          <CardDescription>
            Manage user access and authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Require 2FA for all users</p>
                </div>
                <Switch 
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => 
                    setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Access Logging</Label>
                  <p className="text-sm text-gray-600">Log all data access attempts</p>
                </div>
                <Switch 
                  checked={securitySettings.accessLogging}
                  onCheckedChange={(checked) => 
                    setSecuritySettings(prev => ({ ...prev, accessLogging: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">IP Whitelist</Label>
                  <p className="text-sm text-gray-600">Restrict access by IP address</p>
                </div>
                <Switch 
                  checked={securitySettings.ipWhitelist}
                  onCheckedChange={(checked) => 
                    setSecuritySettings(prev => ({ ...prev, ipWhitelist: checked }))
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Allowed IP Addresses</Label>
              <Input placeholder="192.168.1.100" />
              <Input placeholder="10.0.0.50" />
              <Button variant="outline" size="sm">Add IP Address</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Security Audit Log
          </CardTitle>
          <CardDescription>
            Recent security events and access logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{log.event}</p>
                    <p className="text-xs text-gray-600">{log.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={log.status === 'success' ? 'default' : 'destructive'} className="text-xs">
                      {log.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full Security Log
          </Button>
        </CardContent>
      </Card>

      {/* Compliance & Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Compliance & Certifications
          </CardTitle>
          <CardDescription>
            Industry standards and regulatory compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-medium">GDPR Compliant</p>
                <p className="text-xs text-gray-600">EU Data Protection</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-medium">CCPA Compliant</p>
                <p className="text-xs text-gray-600">California Privacy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-medium">SOC 2 Type II</p>
                <p className="text-xs text-gray-600">Security Controls</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Security Recommendations</AlertTitle>
        <AlertDescription>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Regularly review access logs for suspicious activity</li>
            <li>• Update authentication credentials every 90 days</li>
            <li>• Monitor data export patterns for anomalies</li>
            <li>• Keep backup encryption keys in secure offline storage</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SecurityPanel;
