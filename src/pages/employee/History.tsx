import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Award, Clock, CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function EmployeeHistory() {
  const activities = [
    { id: 1, type: 'completed', course: 'Maritime Safety Fundamentals', date: '2024-08-20', duration: '45 min', score: 92 },
    { id: 2, type: 'completed', course: 'Professional Housekeeping', date: '2024-08-15', duration: '38 min', score: 88 },
    { id: 3, type: 'started', course: 'Guest Experience Excellence', date: '2024-08-12', duration: '15 min', score: null },
    { id: 4, type: 'completed', course: 'Customer Service Excellence', date: '2024-08-10', duration: '52 min', score: 95 },
    { id: 5, type: 'certificate', course: 'Food Safety & Hygiene', date: '2024-07-25', duration: null, score: 89 },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed': return CheckCircle;
      case 'started': return BookOpen;
      case 'certificate': return Award;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'completed': return 'text-success';
      case 'started': return 'text-primary';
      case 'certificate': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <DashboardLayout userRole="employee" userName="John Doe">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Learning History</h1>
            <p className="text-muted-foreground">Track your learning journey and progress</p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="started">Started</SelectItem>
              <SelectItem value="certificate">Certificates</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Started or completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-success">62.5% completion rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Learning Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5 hrs</div>
              <p className="text-xs text-muted-foreground">Total time spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91%</div>
              <p className="text-xs text-success">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Your recent learning activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  const colorClass = getActivityColor(activity.type);
                  
                  return (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${colorClass}`} />
                          <span className="capitalize">{activity.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{activity.course}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>
                        {activity.duration ? (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {activity.duration}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {activity.score ? (
                          <Badge variant="outline" className="bg-success/10 text-success">
                            {activity.score}%
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
