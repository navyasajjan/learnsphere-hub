import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function ClientAdminTeams() {
  const teams = [
    { id: 1, name: 'Operations Team', members: 45, manager: 'John Smith', assignedCourses: 12, avgProgress: 78, status: 'active' },
    { id: 2, name: 'Sales Team', members: 32, manager: 'Sarah Johnson', assignedCourses: 8, avgProgress: 92, status: 'active' },
    { id: 3, name: 'HR Team', members: 12, manager: 'Mike Chen', assignedCourses: 6, avgProgress: 85, status: 'active' },
    { id: 4, name: 'Finance Team', members: 18, manager: 'Emily Davis', assignedCourses: 10, avgProgress: 88, status: 'active' },
    { id: 5, name: 'IT Department', members: 25, manager: 'James Wilson', assignedCourses: 15, avgProgress: 94, status: 'active' },
  ];

  return (
    <DashboardLayout userRole="client_admin" userName="Client Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Organize employees into teams and departments</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.length}</div>
              <p className="text-xs text-muted-foreground">Active departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.reduce((sum, t) => sum + t.members, 0)}</div>
              <p className="text-xs text-muted-foreground">Across all teams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Avg Team Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(teams.reduce((sum, t) => sum + t.avgProgress, 0) / teams.length)}%
              </div>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Company-wide
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <CardDescription>{team.manager}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                    {team.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Members</p>
                    <p className="text-2xl font-bold">{team.members}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Courses</p>
                    <p className="text-2xl font-bold">{team.assignedCourses}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Team Progress</span>
                    <span className="font-medium">{team.avgProgress}%</span>
                  </div>
                  <Progress value={team.avgProgress} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Members
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
