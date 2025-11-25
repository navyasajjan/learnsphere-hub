import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CourseCard } from '@/components/CourseCard';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, TrendingUp, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { courses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function EmployeeDashboard() {
  const { toast } = useToast();
  const assignedCourses = courses.slice(0, 3);

  return (
    <DashboardLayout userRole="employee" userName="John Doe">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back, John!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Enrolled Courses"
            value="8"
            icon={BookOpen}
            description="3 in progress"
          />
          <StatCard
            title="Completed"
            value="5"
            icon={Award}
            description="62.5% completion rate"
          />
          <StatCard
            title="Learning Hours"
            value="24.5"
            icon={Clock}
            description="This month"
          />
          <StatCard
            title="Average Score"
            value="87%"
            icon={TrendingUp}
            description="+5% from last month"
          />
        </div>

        {/* Continue Learning */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              Continue Learning
            </CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Guest Experience Excellence</p>
                  <p className="text-sm text-muted-foreground">Hospitality • 65% complete</p>
                </div>
                <Button onClick={() => {
                  toast({
                    title: "Resuming Course",
                    description: "Loading Guest Experience Excellence...",
                  });
                }}>Resume</Button>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Effective Communication Skills</p>
                  <p className="text-sm text-muted-foreground">Soft Skills • 45% complete</p>
                </div>
                <Button variant="outline" onClick={() => {
                  toast({
                    title: "Resuming Course",
                    description: "Loading Effective Communication Skills...",
                  });
                }}>Resume</Button>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Assigned Courses */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Assigned Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                actionButton={{
                  label: 'Start Course',
                  onClick: () => {
                    toast({
                      title: "Starting Course",
                      description: `Opening ${course.title}...`,
                    });
                  },
                }}
              />
            ))}
          </div>
        </div>

        {/* Recent Certificates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { course: 'Maritime Safety Fundamentals', date: '2024-01-20', score: 92 },
                { course: 'Professional Housekeeping Standards', date: '2024-01-15', score: 88 },
                { course: 'Customer Service Excellence', date: '2024-01-10', score: 95 },
              ].map((cert, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">{cert.course}</p>
                      <p className="text-sm text-muted-foreground">Completed {cert.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">{cert.score}%</p>
                    <Button 
                      variant="link" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Certificate",
                          description: `Opening certificate for ${cert.course}`,
                        });
                      }}
                    >View Certificate</Button>
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
