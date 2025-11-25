import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CourseCard } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus } from 'lucide-react';
import { courses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function SuperAdminCourses() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
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
            onClick={() => {
              toast({
                title: "Add New Course",
                description: "Opening course creation form...",
              });
            }}
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
    </DashboardLayout>
  );
}
