import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function HelpDeskTickets() {
  const tickets = [
    { id: 'TK-001', user: 'John Smith', email: 'john.s@company.com', issue: 'Cannot access course', priority: 'high', status: 'open', created: '1 hour ago', category: 'Access Issue' },
    { id: 'TK-002', user: 'Sarah Johnson', email: 'sarah.j@company.com', issue: 'SCORM player error on Module 3', priority: 'high', status: 'in-progress', created: '3 hours ago', category: 'Technical' },
    { id: 'TK-003', user: 'Mike Chen', email: 'mike.c@company.com', issue: 'Certificate not generated after completion', priority: 'medium', status: 'in-progress', created: '5 hours ago', category: 'Certificate' },
    { id: 'TK-004', user: 'Emily Davis', email: 'emily.d@company.com', issue: 'Course progress not saving', priority: 'high', status: 'open', created: '6 hours ago', category: 'Technical' },
    { id: 'TK-005', user: 'James Wilson', email: 'james.w@company.com', issue: 'How to reset my password?', priority: 'low', status: 'resolved', created: '1 day ago', category: 'Account' },
  ];

  const stats = [
    { label: 'Open', value: tickets.filter(t => t.status === 'open').length, icon: AlertCircle, color: 'text-destructive' },
    { label: 'In Progress', value: tickets.filter(t => t.status === 'in-progress').length, icon: Clock, color: 'text-warning' },
    { label: 'Resolved', value: tickets.filter(t => t.status === 'resolved').length, icon: CheckCircle, color: 'text-success' },
  ];

  return (
    <DashboardLayout userRole="helpdesk" userName="HelpDesk">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Support Tickets</h1>
            <p className="text-muted-foreground">Manage and resolve user issues</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                    {stat.label} Tickets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">Current status</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Tickets</CardTitle>
            <CardDescription>View and manage support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ticket.user}</p>
                        <p className="text-xs text-muted-foreground">{ticket.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate">{ticket.issue}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.category}</Badge>
                    </TableCell>
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
                      <Button size="sm" variant="ghost">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Response</CardTitle>
            <CardDescription>Add a note or resolve the selected ticket</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea placeholder="Enter your response or support note..." rows={4} />
            <div className="flex gap-2">
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Note
              </Button>
              <Button variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Resolved
              </Button>
              <Button variant="outline">Assign to Me</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
