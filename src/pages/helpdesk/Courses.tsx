import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CourseCard } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, BookOpen, Users, Clock, AlertCircle } from 'lucide-react';
import { courses } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function HelpDeskCourses() {
  const { toast } = useToast();
  const [openCourseDetails, setOpenCourseDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setOpenCourseDetails(true);
  };

  return (
    <DashboardLayout userRole="helpdesk" userName="Support Agent">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">All Courses</h1>
          <p className="text-muted-foreground">View all courses and their technical details</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45m</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses by name, ID, or sector..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All SCORM Types</SelectItem>
              <SelectItem value="scorm12">SCORM 1.2</SelectItem>
              <SelectItem value="scorm2004">SCORM 2004</SelectItem>
              <SelectItem value="xapi">xAPI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div key={course.id} className="relative">
              {index < 2 && (
                <Badge className="absolute top-4 right-4 z-10 bg-destructive" variant="destructive">
                  Issues Reported
                </Badge>
              )}
              <CourseCard
                course={course}
                actionButton={{
                  label: 'View Details',
                  onClick: () => handleViewDetails(course),
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Course Details Dialog */}
      <Dialog open={openCourseDetails} onOpenChange={setOpenCourseDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Course Technical Details</DialogTitle>
            <DialogDescription>
              SCORM and technical information for {selectedCourse?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[500px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Course Title</Label>
                <p className="font-medium">{selectedCourse?.title}</p>
              </div>
              <div className="space-y-2">
                <Label>Course ID</Label>
                <p className="font-mono text-sm">{selectedCourse?.id}</p>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <p className="font-medium">{selectedCourse?.category}</p>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <p className="font-medium">{selectedCourse?.duration}</p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <h4 className="font-semibold">SCORM Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="text-sm text-muted-foreground">SCORM Version</span>
                  <span className="text-sm font-medium">SCORM 2004 3rd Edition</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="text-sm text-muted-foreground">Package Type</span>
                  <span className="text-sm font-medium">CAM (Content Aggregation Model)</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="text-sm text-muted-foreground">Manifest File</span>
                  <span className="text-sm font-mono">imsmanifest.xml</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="text-sm text-muted-foreground">Launch File</span>
                  <span className="text-sm font-mono">index.html</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <h4 className="font-semibold">Usage Statistics</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">342</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-muted-foreground">Avg Completion</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Active Issues</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <h4 className="font-semibold">Recent Issues</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">LMSInitialize() timeout</span>
                  <Badge variant="destructive">High</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Score not recording</span>
                  <Badge variant="default">Medium</Badge>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
