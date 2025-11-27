import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ClientAdminTeams() {
  const { toast } = useToast();
  const [openCreateTeam, setOpenCreateTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamManager, setTeamManager] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const teams = [
    { id: 1, name: 'Operations Team', members: 45, manager: 'John Smith', assignedCourses: 12, avgProgress: 78, status: 'active' },
    { id: 2, name: 'Sales Team', members: 32, manager: 'Sarah Johnson', assignedCourses: 8, avgProgress: 92, status: 'active' },
    { id: 3, name: 'HR Team', members: 12, manager: 'Mike Chen', assignedCourses: 6, avgProgress: 85, status: 'active' },
    { id: 4, name: 'Finance Team', members: 18, manager: 'Emily Davis', assignedCourses: 10, avgProgress: 88, status: 'active' },
    { id: 5, name: 'IT Department', members: 25, manager: 'James Wilson', assignedCourses: 15, avgProgress: 94, status: 'active' },
  ];

  const handleCreateTeam = () => {
    if (!teamName || !teamManager) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Team Created",
      description: `${teamName} has been created successfully`,
    });
    setOpenCreateTeam(false);
    setTeamName('');
    setTeamManager('');
    setTeamDescription('');
  };

  return (
    <DashboardLayout userRole="client_admin" userName="Client Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Organize employees into teams and departments</p>
          </div>
          <Button onClick={() => setOpenCreateTeam(true)}>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        View Members
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{team.name} Members</DialogTitle>
                        <DialogDescription>
                          {team.members} team members • Managed by {team.manager}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          {['Sarah Johnson', 'Michael Chen', 'Emily Davis', 'James Wilson', 'Lisa Anderson'].slice(0, Math.min(5, team.members)).map((name, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{name}</p>
                                  <p className="text-sm text-muted-foreground">{name.toLowerCase().replace(' ', '.')}@company.com</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">Manage</Button>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          Showing 5 of {team.members} members
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Team Courses",
                        description: `Loading ${team.assignedCourses} courses for ${team.name}`,
                      });
                    }}
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={openCreateTeam} onOpenChange={setOpenCreateTeam}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>
              Create a new team or department to organize your employees.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="team-name">Team Name *</Label>
              <Input
                id="team-name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Marketing Team"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="team-manager">Team Manager *</Label>
              <Input
                id="team-manager"
                value={teamManager}
                onChange={(e) => setTeamManager(e.target.value)}
                placeholder="Manager's name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="team-description">Description</Label>
              <Textarea
                id="team-description"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                placeholder="Team description and responsibilities..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenCreateTeam(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTeam}>Create Team</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
