import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, Upload, Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function ClientAdminEmployees() {
  const employees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@company.com', department: 'Operations', assignedCourses: 5, completedCourses: 3, progress: 60, status: 'active' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@company.com', department: 'Sales', assignedCourses: 4, completedCourses: 4, progress: 100, status: 'active' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@company.com', department: 'Operations', assignedCourses: 6, completedCourses: 2, progress: 33, status: 'active' },
    { id: 4, name: 'James Wilson', email: 'james.w@company.com', department: 'HR', assignedCourses: 3, completedCourses: 0, progress: 0, status: 'inactive' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@company.com', department: 'Sales', assignedCourses: 5, completedCourses: 5, progress: 100, status: 'active' },
  ];

  return (
    <DashboardLayout userRole="client_admin" userName="Client Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Employee Management</h1>
            <p className="text-muted-foreground">Manage and track employee training</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Employees</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search employees..." className="pl-10" />
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
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
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
