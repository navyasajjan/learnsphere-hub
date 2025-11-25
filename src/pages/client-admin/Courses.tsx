import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CourseCard } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { courses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function ClientAdminCourses() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
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
                onClick: () => {
                  toast({
                    title: "Assign Course",
                    description: `Select employees to assign ${course.title}`,
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
