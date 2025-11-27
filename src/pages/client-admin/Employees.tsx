import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, UserPlus, Upload, Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ClientAdminEmployees() {
  const { toast } = useToast();
  const [openBulkUpload, setOpenBulkUpload] = useState(false);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeDepartment, setEmployeeDepartment] = useState('');

  const employees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@company.com', department: 'Operations', assignedCourses: 5, completedCourses: 3, progress: 60, status: 'active' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@company.com', department: 'Sales', assignedCourses: 4, completedCourses: 4, progress: 100, status: 'active' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@company.com', department: 'Operations', assignedCourses: 6, completedCourses: 2, progress: 33, status: 'active' },
    { id: 4, name: 'James Wilson', email: 'james.w@company.com', department: 'HR', assignedCourses: 3, completedCourses: 0, progress: 0, status: 'inactive' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@company.com', department: 'Sales', assignedCourses: 5, completedCourses: 5, progress: 100, status: 'active' },
  ];

  const handleBulkUpload = () => {
    toast({
      title: "Upload Started",
      description: "Processing employee data from CSV file...",
    });
    setOpenBulkUpload(false);
  };

  const handleAddEmployee = () => {
    if (!employeeName || !employeeEmail || !employeeDepartment) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Employee Added",
      description: `${employeeName} has been added successfully`,
    });
    setOpenAddEmployee(false);
    setEmployeeName('');
    setEmployeeEmail('');
    setEmployeeDepartment('');
  };

  return (
    <DashboardLayout userRole="client_admin" userName="Client Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Employee Management</h1>
            <p className="text-muted-foreground">Manage and track employee training</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpenBulkUpload(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Exporting Data",
                  description: "Employee data is being exported to CSV...",
                });
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setOpenAddEmployee(true)}>
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
      </div>

      <Dialog open={openBulkUpload} onOpenChange={setOpenBulkUpload}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bulk Upload Employees</DialogTitle>
            <DialogDescription>
              Upload a CSV file with employee information to add multiple employees at once.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="csv-file">CSV File *</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv,.xlsx,.xls"
              />
              <p className="text-xs text-muted-foreground">
                Required columns: Name, Email, Department
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-muted/50">
              <h4 className="text-sm font-medium mb-2">CSV Format Example:</h4>
              <code className="text-xs block">
                Name,Email,Department<br />
                John Doe,john@company.com,Sales<br />
                Jane Smith,jane@company.com,Operations
              </code>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenBulkUpload(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkUpload}>Upload & Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddEmployee} onOpenChange={setOpenAddEmployee}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogDescription>
              Add a new employee to your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="emp-name">Full Name *</Label>
              <Input
                id="emp-name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-email">Email Address *</Label>
              <Input
                id="emp-email"
                type="email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                placeholder="john.doe@company.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emp-department">Department *</Label>
              <Select value={employeeDepartment} onValueChange={setEmployeeDepartment}>
                <SelectTrigger id="emp-department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddEmployee(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEmployee}>Add Employee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
