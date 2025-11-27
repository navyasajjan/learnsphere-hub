import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CourseCard } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { courses } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ContentAdminCourses() {
  const { toast } = useToast();
  const [openEditCourse, setOpenEditCourse] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseStatus, setCourseStatus] = useState('');

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course);
    setCourseTitle(course.title);
    setCourseDescription(course.description || '');
    setCourseStatus('published');
    setOpenEditCourse(true);
  };

  const handleSaveCourse = () => {
    toast({
      title: "Course Updated",
      description: `${courseTitle} has been updated successfully`,
    });
    setOpenEditCourse(false);
  };

  return (
    <DashboardLayout userRole="content_admin" userName="Content Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Courses you've created and manage</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-10" />
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
          <Button variant="outline" onClick={() => setOpenFilters(true)}>
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="relative">
              <Badge className="absolute top-4 right-4 z-10">Published</Badge>
              <CourseCard
                course={course}
                actionButton={{
                  label: 'Edit Course',
                  onClick: () => handleEditCourse(course),
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Edit Course Dialog */}
      <Dialog open={openEditCourse} onOpenChange={setOpenEditCourse}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update course information and settings
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Course Title</Label>
              <Input
                id="edit-title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={courseStatus} onValueChange={setCourseStatus}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select>
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditCourse(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCourse}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filters Dialog */}
      <Dialog open={openFilters} onOpenChange={setOpenFilters}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Advanced Filters</DialogTitle>
            <DialogDescription>
              Filter courses by multiple criteria
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Sector</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="shipping">Shipping</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>SCORM Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="scorm12">SCORM 1.2</SelectItem>
                  <SelectItem value="scorm2004">SCORM 2004</SelectItem>
                  <SelectItem value="xapi">xAPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Duration Range</Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Min" />
                <span>-</span>
                <Input type="number" placeholder="Max" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Created Date</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenFilters(false)}>
              Reset
            </Button>
            <Button onClick={() => {
              toast({
                title: "Filters Applied",
                description: "Courses filtered successfully",
              });
              setOpenFilters(false);
            }}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
