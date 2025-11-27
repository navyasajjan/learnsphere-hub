import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CourseCard } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Filter, Plus } from 'lucide-react';
import { courses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function SuperAdminCourses() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddCourse, setOpenAddCourse] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseSector, setCourseSector] = useState('');
  const [courseStatus, setCourseStatus] = useState('draft');

  const handleAddCourse = () => {
    if (!courseTitle || !courseDescription || !courseSector) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Course Created",
      description: `${courseTitle} has been added successfully`,
    });
    setOpenAddCourse(false);
    setCourseTitle('');
    setCourseDescription('');
    setCourseSector('');
    setCourseStatus('draft');
  };

  return (
    <DashboardLayout userRole="super_admin" userName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Course Library</h1>
            <p className="text-muted-foreground">Manage all courses across the platform</p>
          </div>
          <Button 
            className="gap-2"
            onClick={() => setOpenAddCourse(true)}
          >
            <Plus className="h-4 w-4" />
            Add New Course
          </Button>
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
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Under Review</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-sectors">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-sectors">All Sectors</SelectItem>
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
                label: 'Manage Course',
                onClick: () => {
                  toast({
                    title: "Manage Course",
                    description: `Managing ${course.title}`,
                  });
                },
              }}
            />
          ))}
        </div>
      </div>

      <Dialog open={openAddCourse} onOpenChange={setOpenAddCourse}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Create a new course for the platform. Fill in all required information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="course-title">Course Title *</Label>
              <Input
                id="course-title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="e.g. Advanced Safety Training"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="course-description">Description *</Label>
              <Textarea
                id="course-description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Describe the course content and objectives..."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="course-sector">Sector *</Label>
                <Select value={courseSector} onValueChange={setCourseSector}>
                  <SelectTrigger id="course-sector">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shipping">Shipping</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="soft-skills">Soft Skills</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-status">Initial Status</Label>
                <Select value={courseStatus} onValueChange={setCourseStatus}>
                  <SelectTrigger id="course-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddCourse(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCourse}>Create Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
