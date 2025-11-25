import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, AlertCircle } from 'lucide-react';

export default function HelpDeskLogs() {
  const logs = [
    { id: 1, user: 'John Smith', course: 'Maritime Safety', error: 'LMSInitialize() failed - Connection timeout', time: '10:30 AM', severity: 'high', module: 'Module 3' },
    { id: 2, user: 'Sarah Johnson', course: 'Guest Experience', error: 'LMSCommit() returned error code 201', time: '09:45 AM', severity: 'medium', module: 'Module 1' },
    { id: 3, user: 'Mike Chen', course: 'Food Safety', error: 'Invalid manifest structure detected', time: '08:15 AM', severity: 'high', module: 'Entry' },
    { id: 4, user: 'Emily Davis', course: 'Leadership', error: 'LMSGetValue() undefined response', time: '07:50 AM', severity: 'medium', module: 'Module 2' },
  ];

  return (
    <DashboardLayout userRole="helpdesk" userName="HelpDesk">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">SCORM Error Logs</h1>
            <p className="text-muted-foreground">View and troubleshoot SCORM player issues</p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {logs.map((log) => (
            <Card key={log.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 h-3 w-3 rounded-full flex-shrink-0 ${
                    log.severity === 'high' ? 'bg-destructive' :
                    log.severity === 'medium' ? 'bg-warning' :
                    'bg-muted-foreground'
                  }`} />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{log.user}</p>
                          <Badge variant="outline">{log.module}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{log.course}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{log.time}</p>
                        <Badge variant={log.severity === 'high' ? 'destructive' : 'default'} className="mt-1">
                          {log.severity}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded font-mono text-sm">
                      {log.error}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
