import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Users, BookOpen, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function ClientAdminAssignments() {
  const { toast } = useToast();
  const assignments = [
    { id: 1, course: 'Maritime Safety Fundamentals', assignedTo: 'Operations Team', employees: 12, completed: 8, dueDate: '2024-09-30', status: 'active', mandatory: true },
    { id: 2, course: 'Guest Experience Excellence', assignedTo: 'All Employees', employees: 247, completed: 189, dueDate: '2024-10-15', status: 'active', mandatory: true },
    { id: 3, course: 'Leadership Skills', assignedTo: 'Management', employees: 15, completed: 15, dueDate: '2024-08-30', status: 'completed', mandatory: false },
    { id: 4, course: 'Food Safety & Hygiene', assignedTo: 'Catering Dept', employees: 28, completed: 12, dueDate: '2024-09-25', status: 'active', mandatory: true },
  ];

  return (
    <DashboardLayout userRole="client_admin" userName="Client Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Course Assignments</h1>
            <p className="text-muted-foreground">Assign and track training programs</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Course Assignment</DialogTitle>
                <DialogDescription>Assign courses to employees or teams</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Course</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Maritime Safety Fundamentals</SelectItem>
                      <SelectItem value="2">Guest Experience Excellence</SelectItem>
                      <SelectItem value="3">Food Safety & Hygiene</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assign To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team or individuals" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Employees</SelectItem>
                      <SelectItem value="operations">Operations Team</SelectItem>
                      <SelectItem value="sales">Sales Team</SelectItem>
                      <SelectItem value="hr">HR Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mandatory">Mandatory</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">Create Assignment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Across all teams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">From assignments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73%</div>
              <p className="text-xs text-success">+8% this month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assignment Overview</CardTitle>
            <CardDescription>Manage course assignments and track progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{assignment.course}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        {assignment.assignedTo}
                      </div>
                    </TableCell>
                    <TableCell>{assignment.employees}</TableCell>
                    <TableCell>
                      <span className="font-medium">{assignment.completed}</span>
                      <span className="text-muted-foreground"> / {assignment.employees}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {assignment.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={assignment.status === 'active' ? 'default' : 'secondary'}>
                        {assignment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={assignment.mandatory ? 'destructive' : 'outline'}>
                        {assignment.mandatory ? 'Mandatory' : 'Optional'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">View</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px]">
                          <DialogHeader>
                            <DialogTitle>{assignment.course}</DialogTitle>
                            <DialogDescription>
                              Assignment details and progress tracking
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Assigned To</p>
                                <p className="text-sm text-muted-foreground">{assignment.assignedTo}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Due Date</p>
                                <p className="text-sm text-muted-foreground">{assignment.dueDate}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Total Employees</p>
                                <p className="text-sm text-muted-foreground">{assignment.employees}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Completed</p>
                                <p className="text-sm text-muted-foreground">{assignment.completed} employees</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Completion Rate</p>
                                <p className="text-sm font-medium">{Math.round((assignment.completed / assignment.employees) * 100)}%</p>
                              </div>
                              <Progress value={(assignment.completed / assignment.employees) * 100} className="h-2" />
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button 
                                className="flex-1"
                                onClick={() => {
                                  toast({
                                    title: "Sending Reminders",
                                    description: `Reminder sent to ${assignment.employees - assignment.completed} employees`,
                                  });
                                }}
                              >
                                Send Reminder
                              </Button>
                              <Button 
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                  toast({
                                    title: "Extending Deadline",
                                    description: "Opening deadline extension options...",
                                  });
                                }}
                              >
                                Extend Deadline
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
