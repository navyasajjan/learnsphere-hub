import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CourseCard } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter } from 'lucide-react';
import { courses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function ClientAdminCourses() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [assignTo, setAssignTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const employees = [
    { id: '1', name: 'Sarah Johnson', department: 'Operations' },
    { id: '2', name: 'Michael Chen', department: 'Sales' },
    { id: '3', name: 'Emily Davis', department: 'Operations' },
    { id: '4', name: 'James Wilson', department: 'HR' },
    { id: '5', name: 'Lisa Anderson', department: 'Sales' },
  ];

  const handleAssignCourse = () => {
    if (!assignTo || !dueDate) {
      toast({
        title: "Error",
        description: "Please select assignment target and due date",
        variant: "destructive",
      });
      return;
    }

    if (assignTo === 'individual' && selectedEmployees.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one employee",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Course Assigned",
      description: `${selectedCourse?.title} has been assigned successfully`,
    });
    setOpenAssignDialog(false);
    setSelectedCourse(null);
    setAssignTo('');
    setDueDate('');
    setIsMandatory(false);
    setSelectedEmployees([]);
  };

  const openAssignModal = (course: any) => {
    setSelectedCourse(course);
    setOpenAssignDialog(true);
  };

  return (
    <DashboardLayout userRole="client_admin" userName="Admin User">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Course Library</h1>
          <p className="text-muted-foreground">Browse and assign courses to your employees</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="shipping">Shipping</SelectItem>
              <SelectItem value="hospitality">Hospitality</SelectItem>
              <SelectItem value="soft-skills">Soft Skills</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => {
              toast({
                title: "Advanced Filters",
                description: "Opening filter options...",
              });
            }}
          >
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              actionButton={{
                label: 'Assign to Employees',
                onClick: () => openAssignModal(course),
              }}
            />
          ))}
        </div>
      </div>

      <Dialog open={openAssignDialog} onOpenChange={setOpenAssignDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Assign Course to Employees</DialogTitle>
            <DialogDescription>
              Assign "{selectedCourse?.title}" to employees or teams
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="assign-to">Assign To *</Label>
              <Select value={assignTo} onValueChange={setAssignTo}>
                <SelectTrigger id="assign-to">
                  <SelectValue placeholder="Select assignment target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="operations">Operations Team</SelectItem>
                  <SelectItem value="sales">Sales Team</SelectItem>
                  <SelectItem value="hr">HR Team</SelectItem>
                  <SelectItem value="individual">Individual Employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {assignTo === 'individual' && (
              <div className="grid gap-2">
                <Label>Select Employees</Label>
                <div className="border rounded-md p-4 max-h-48 overflow-y-auto space-y-3">
                  {employees.map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={employee.id}
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedEmployees([...selectedEmployees, employee.id]);
                          } else {
                            setSelectedEmployees(selectedEmployees.filter(id => id !== employee.id));
                          }
                        }}
                      />
                      <label
                        htmlFor={employee.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {employee.name} - {employee.department}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="due-date">Due Date *</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority" className="mb-2">Priority</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="mandatory"
                    checked={isMandatory}
                    onCheckedChange={(checked) => setIsMandatory(checked as boolean)}
                  />
                  <label
                    htmlFor="mandatory"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Mandatory Course
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAssignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignCourse}>Assign Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
