import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CourseCard } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { courses } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

export default function EmployeeCourses() {
  const assignedCourses = courses.slice(0, 4);
  const inProgressCourses = courses.slice(4, 6);
  const completedCourses = courses.slice(6, 9);

  return (
    <DashboardLayout userRole="employee" userName="John Doe">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Browse and access your training courses</p>
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
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="shipping">Shipping</SelectItem>
              <SelectItem value="hospitality">Hospitality</SelectItem>
              <SelectItem value="soft-skills">Soft Skills</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="assigned" className="space-y-6">
          <TabsList>
            <TabsTrigger value="assigned">Assigned ({assignedCourses.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgressCourses.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="assigned" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignedCourses.map((course) => (
                <div key={course.id} className="relative">
                  <Badge className="absolute top-4 right-4 z-10 bg-warning">New</Badge>
                  <CourseCard
                    course={course}
                    actionButton={{
                      label: 'Start Course',
                      onClick: () => console.log('Start', course.id),
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inProgressCourses.map((course) => (
                <div key={course.id} className="relative">
                  <Badge className="absolute top-4 right-4 z-10 bg-primary">65% Complete</Badge>
                  <CourseCard
                    course={course}
                    actionButton={{
                      label: 'Continue',
                      onClick: () => console.log('Continue', course.id),
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map((course) => (
                <div key={course.id} className="relative">
                  <Badge className="absolute top-4 right-4 z-10 bg-success">Completed</Badge>
                  <CourseCard
                    course={course}
                    actionButton={{
                      label: 'View Certificate',
                      onClick: () => console.log('Certificate', course.id),
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
