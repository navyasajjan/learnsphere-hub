import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CourseCard } from '@/components/CourseCard';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Upload, CheckCircle, Clock, FileText, Play } from 'lucide-react';
import { courses } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function ContentAdminDashboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const myCourses = courses.slice(0, 6);

  return (
    <DashboardLayout userRole="content_admin" userName="Content Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Upload and manage SCORM/xAPI courses</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="My Courses"
            value="42"
            icon={BookOpen}
            description="Published content"
          />
          <StatCard
            title="Pending Review"
            value="8"
            icon={Clock}
            description="Awaiting approval"
          />
          <StatCard
            title="Total Uploads"
            value="156"
            icon={Upload}
            description="All time"
          />
          <StatCard
            title="Validation Pass"
            value="94%"
            icon={CheckCircle}
            description="SCORM compliance"
          />
        </div>

        {/* Upload & Management Tabs */}
        <Tabs defaultValue="upload" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upload">Upload Course</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload SCORM/xAPI Course</CardTitle>
                <CardDescription>
                  Upload a SCORM 1.2, SCORM 2004, or xAPI package for validation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Course Package</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      Drop your SCORM/xAPI package here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: ZIP (SCORM 1.2, SCORM 2004, xAPI)
                    </p>
                    <Input type="file" className="hidden" accept=".zip" />
                  </div>
                </div>

                {/* Course Details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input id="title" placeholder="Enter course title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Select>
                      <SelectTrigger id="sector">
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shipping">Shipping</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="catering">Catering</SelectItem>
                        <SelectItem value="driving">Driving</SelectItem>
                        <SelectItem value="soft-skills">Soft Skills</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">SCORM Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scorm12">SCORM 1.2</SelectItem>
                        <SelectItem value="scorm2004">SCORM 2004</SelectItem>
                        <SelectItem value="xapi">xAPI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter course description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" placeholder="safety, compliance, beginner" />
                </div>

                {/* Validation Status */}
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      SCORM Validation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Upload a package to run automatic validation checks
                    </p>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Uploading Course",
                        description: "Validating SCORM package...",
                      });
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload & Validate
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Test Preview",
                        description: "Opening SCORM player preview...",
                      });
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Test Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Input 
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myCourses.map((course) => (
                <div key={course.id} className="relative">
                  <Badge className="absolute top-4 right-4 z-10">Published</Badge>
                  <CourseCard
                    course={course}
                    actionButton={{
                      label: 'Edit Course',
                      onClick: () => {
                        toast({
                          title: "Edit Course",
                          description: `Opening editor for ${course.title}`,
                        });
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest content management actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Published', course: 'Maritime Safety Fundamentals', time: '2 hours ago', status: 'success' },
                { action: 'Uploaded', course: 'Guest Experience Excellence', time: '5 hours ago', status: 'pending' },
                { action: 'Updated', course: 'Professional Housekeeping', time: '1 day ago', status: 'success' },
                { action: 'Validation Failed', course: 'Food Safety Basics', time: '2 days ago', status: 'error' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${
                      activity.status === 'success' ? 'bg-success' :
                      activity.status === 'pending' ? 'bg-warning' :
                      'bg-destructive'
                    }`} />
                    <div>
                      <p className="font-medium">{activity.action}: {activity.course}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
