import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, User, Mail, Building2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function HelpDeskSearch() {
  const searchResults = [
    { id: 1, name: 'Emily Davis', email: 'emily.d@company.com', company: 'ABC Corp', department: 'Operations', enrollments: 5, completed: 3, lastActive: '2 hours ago', status: 'active' },
    { id: 2, name: 'James Wilson', email: 'james.w@company.com', company: 'XYZ Ltd', department: 'HR', enrollments: 8, completed: 6, lastActive: '1 day ago', status: 'active' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah.j@company.com', company: 'ABC Corp', department: 'Sales', enrollments: 4, completed: 4, lastActive: '3 hours ago', status: 'active' },
  ];

  return (
    <DashboardLayout userRole="helpdesk" userName="HelpDesk">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Search</h1>
          <p className="text-muted-foreground">Find users and view their details</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or company..."
                className="pl-12 h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {searchResults.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{user.name}</h3>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </div>
                        <div className="grid gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            {user.company} • {user.department}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 py-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Enrollments</p>
                        <p className="text-2xl font-bold">{user.enrollments}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Completed</p>
                        <p className="text-2xl font-bold">{user.completed}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Last Active</p>
                        <p className="text-lg font-semibold">{user.lastActive}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium">{Math.round((user.completed / user.enrollments) * 100)}%</span>
                      </div>
                      <Progress value={(user.completed / user.enrollments) * 100} className="h-2" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Button>View Full Details</Button>
                    <Button variant="outline">View Progress</Button>
                    <Button variant="outline">Reset Course</Button>
                    <Button variant="outline">Add Note</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
