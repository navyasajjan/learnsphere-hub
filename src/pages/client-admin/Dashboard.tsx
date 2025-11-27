import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, BookOpen, TrendingUp, AlertCircle, Search, Upload, UserPlus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientAdminDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const employees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@company.com', department: 'Operations', assignedCourses: 5, completedCourses: 3, progress: 60, status: 'active' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@company.com', department: 'Sales', assignedCourses: 4, completedCourses: 4, progress: 100, status: 'active' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@company.com', department: 'Operations', assignedCourses: 6, completedCourses: 2, progress: 33, status: 'active' },
    { id: 4, name: 'James Wilson', email: 'james.w@company.com', department: 'HR', assignedCourses: 3, completedCourses: 0, progress: 0, status: 'inactive' },
  ];

  const teams = [
    { name: 'Operations Team', members: 12, avgProgress: 67, mandatoryCourses: 8, overdue: 2 },
    { name: 'Sales Team', members: 8, avgProgress: 82, mandatoryCourses: 6, overdue: 0 },
    { name: 'HR Team', members: 5, avgProgress: 45, mandatoryCourses: 5, overdue: 3 },
  ];

  return (
    <DashboardLayout userRole="client_admin" userName="Client Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Company Dashboard</h1>
            <p className="text-muted-foreground">Manage employees and training programs</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/client-admin/employees')}
            >
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
            <Button onClick={() => navigate('/client-admin/employees')}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value="247"
            icon={Users}
            description="32 active learners"
          />
          <StatCard
            title="Assigned Courses"
            value="1,284"
            icon={BookOpen}
            description="Across all employees"
          />
          <StatCard
            title="Avg Completion"
            value="73%"
            icon={TrendingUp}
            description="+8% from last month"
          />
          <StatCard
            title="Overdue Training"
            value="15"
            icon={AlertCircle}
            description="Requires attention"
          />
        </div>

        {/* Team Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Team Progress Overview</CardTitle>
            <CardDescription>Training completion by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {teams.map((team) => (
                <div key={team.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{team.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {team.members} members • {team.mandatoryCourses} mandatory courses
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{team.avgProgress}%</p>
                      {team.overdue > 0 && (
                        <Badge variant="destructive" className="mt-1">
                          {team.overdue} overdue
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={team.avgProgress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employee List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Employee Management</CardTitle>
                <CardDescription>View and manage employee training</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search employees..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.assignedCourses}</TableCell>
                    <TableCell>{employee.completedCourses}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={employee.progress} className="h-2 w-20" />
                        <span className="text-sm">{employee.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Manage
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Manage {employee.name}</DialogTitle>
                            <DialogDescription>
                              View and update employee training assignments
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm text-muted-foreground">{employee.email}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Department</p>
                                <p className="text-sm text-muted-foreground">{employee.department}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Training Progress</p>
                              <div className="flex items-center gap-2">
                                <Progress value={employee.progress} className="h-2 flex-1" />
                                <span className="text-sm font-medium">{employee.progress}%</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {employee.completedCourses} of {employee.assignedCourses} courses completed
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                className="flex-1"
                                onClick={() => {
                                  toast({
                                    title: "Assigning Courses",
                                    description: `Opening course assignment for ${employee.name}`,
                                  });
                                }}
                              >
                                Assign Courses
                              </Button>
                              <Button 
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                  toast({
                                    title: "Viewing Progress",
                                    description: `Loading detailed progress for ${employee.name}`,
                                  });
                                }}
                              >
                                View Full Progress
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

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Assign Courses</CardTitle>
              <CardDescription>Assign training to teams or individuals</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/client-admin/assignments')}
              >
                Manage Assignments
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Download Reports</CardTitle>
              <CardDescription>Export compliance and progress reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/client-admin/reports')}
              >
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">View Certificates</CardTitle>
              <CardDescription>Access employee completion certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Certificates",
                    description: "Opening employee certificates...",
                  });
                }}
              >
                View All
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
