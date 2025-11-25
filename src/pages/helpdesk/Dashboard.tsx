import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Users, MessageSquare, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

export default function HelpDeskDashboard() {
  const tickets = [
    { id: 'TK-001', user: 'John Smith', issue: 'Cannot access course', priority: 'high', status: 'open', created: '1 hour ago' },
    { id: 'TK-002', user: 'Sarah Johnson', issue: 'SCORM player error', priority: 'medium', status: 'in-progress', created: '3 hours ago' },
    { id: 'TK-003', user: 'Mike Chen', issue: 'Certificate not generated', priority: 'low', status: 'resolved', created: '1 day ago' },
  ];

  const userSearchResults = [
    { id: 1, name: 'Emily Davis', email: 'emily.d@company.com', company: 'ABC Corp', enrollments: 5, completed: 3, lastActive: '2 hours ago' },
    { id: 2, name: 'James Wilson', email: 'james.w@company.com', company: 'XYZ Ltd', enrollments: 8, completed: 6, lastActive: '1 day ago' },
  ];

  return (
    <DashboardLayout userRole="helpdesk" userName="HelpDesk">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">HelpDesk Dashboard</h1>
          <p className="text-muted-foreground">Support users and troubleshoot issues</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Open Tickets"
            value="12"
            icon={MessageSquare}
            description="Requires attention"
          />
          <StatCard
            title="Resolved Today"
            value="8"
            icon={CheckCircle}
            description="94% satisfaction"
          />
          <StatCard
            title="Avg Response Time"
            value="12m"
            icon={Clock}
            description="Within SLA"
          />
          <StatCard
            title="Active Users"
            value="284"
            icon={Users}
            description="Online now"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="search" className="space-y-4">
          <TabsList>
            <TabsTrigger value="search">User Search</TabsTrigger>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="logs">SCORM Logs</TabsTrigger>
          </TabsList>

          {/* User Search Tab */}
          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Users</CardTitle>
                <CardDescription>Find users and view their learning progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or company..."
                    className="pl-10"
                  />
                </div>

                {/* Search Results */}
                <div className="space-y-4">
                  {userSearchResults.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-3 flex-1">
                            <div>
                              <h3 className="font-semibold text-lg">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <Badge variant="outline" className="mt-1">{user.company}</Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Enrollments</p>
                                <p className="font-semibold">{user.enrollments}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Completed</p>
                                <p className="font-semibold">{user.completed}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Last Active</p>
                                <p className="font-semibold text-sm">{user.lastActive}</p>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Overall Progress</span>
                                <span className="font-medium">{Math.round((user.completed / user.enrollments) * 100)}%</span>
                              </div>
                              <Progress value={(user.completed / user.enrollments) * 100} className="h-2" />
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-4">
                            <Button size="sm">View Details</Button>
                            <Button size="sm" variant="outline">Reset Progress</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Support Tickets</CardTitle>
                <CardDescription>Manage and resolve user issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                        <TableCell>{ticket.user}</TableCell>
                        <TableCell>{ticket.issue}</TableCell>
                        <TableCell>
                          <Badge variant={
                            ticket.priority === 'high' ? 'destructive' :
                            ticket.priority === 'medium' ? 'default' :
                            'secondary'
                          }>
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            ticket.status === 'open' ? 'destructive' :
                            ticket.status === 'in-progress' ? 'default' :
                            'secondary'
                          }>
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{ticket.created}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Add Support Note */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Support Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="Enter support note or resolution..." rows={3} />
                <div className="flex gap-2">
                  <Button>Add Note</Button>
                  <Button variant="outline">Mark as Resolved</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SCORM Logs Tab */}
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SCORM Error Logs</CardTitle>
                <CardDescription>View and troubleshoot SCORM player issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: 'John Smith', course: 'Maritime Safety', error: 'LMSInitialize() failed', time: '10:30 AM', severity: 'high' },
                    { user: 'Sarah Johnson', course: 'Guest Experience', error: 'Connection timeout', time: '09:45 AM', severity: 'medium' },
                    { user: 'Mike Chen', course: 'Food Safety', error: 'Invalid manifest', time: '08:15 AM', severity: 'low' },
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                        log.severity === 'high' ? 'bg-destructive' :
                        log.severity === 'medium' ? 'bg-warning' :
                        'bg-muted-foreground'
                      }`} />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{log.user} - {log.course}</p>
                          <span className="text-sm text-muted-foreground">{log.time}</span>
                        </div>
                        <p className="text-sm font-mono bg-muted px-2 py-1 rounded">{log.error}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* xAPI Statement Viewer */}
            <Card>
              <CardHeader>
                <CardTitle>Recent xAPI Statements</CardTitle>
                <CardDescription>Real-time learning activity tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { actor: 'emily.davis@company.com', verb: 'completed', object: 'Maritime Safety Module 3', timestamp: '2 min ago' },
                    { actor: 'james.wilson@company.com', verb: 'attempted', object: 'Guest Experience Quiz', timestamp: '5 min ago' },
                    { actor: 'sarah.johnson@company.com', verb: 'experienced', object: 'Food Safety Training', timestamp: '12 min ago' },
                  ].map((statement, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{statement.verb}</Badge>
                        <div>
                          <p className="text-sm font-medium">{statement.actor}</p>
                          <p className="text-xs text-muted-foreground">{statement.object}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{statement.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
