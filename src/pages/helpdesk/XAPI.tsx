import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity } from 'lucide-react';

export default function HelpDeskXAPI() {
  const statements = [
    { id: 1, actor: 'emily.davis@company.com', verb: 'completed', object: 'Maritime Safety Module 3', result: 'score: 92%', timestamp: '2 min ago' },
    { id: 2, actor: 'james.wilson@company.com', verb: 'attempted', object: 'Guest Experience Quiz', result: 'score: 78%', timestamp: '5 min ago' },
    { id: 3, actor: 'sarah.johnson@company.com', verb: 'experienced', object: 'Food Safety Training', result: 'duration: 45min', timestamp: '12 min ago' },
    { id: 4, actor: 'john.smith@company.com', verb: 'passed', object: 'Leadership Assessment', result: 'score: 88%', timestamp: '18 min ago' },
    { id: 5, actor: 'mike.chen@company.com', verb: 'failed', object: 'Safety Quiz', result: 'score: 65%', timestamp: '25 min ago' },
  ];

  return (
    <DashboardLayout userRole="helpdesk" userName="HelpDesk">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">xAPI Timeline</h1>
            <p className="text-muted-foreground">Real-time learning activity statements</p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Verbs</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="attempted">Attempted</SelectItem>
              <SelectItem value="passed">Passed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Statements
            </CardTitle>
            <CardDescription>Live xAPI learning activity tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {statements.map((statement) => (
                <div key={statement.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <Badge variant="outline" className="capitalize min-w-24 justify-center">
                      {statement.verb}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{statement.actor}</p>
                      <p className="text-xs text-muted-foreground">{statement.object}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{statement.result}</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">{statement.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
