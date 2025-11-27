import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, User, Mail, Building2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function HelpDeskSearch() {
  const { toast } = useToast();
  const [openFullDetails, setOpenFullDetails] = useState(false);
  const [openViewProgress, setOpenViewProgress] = useState(false);
  const [openResetCourse, setOpenResetCourse] = useState(false);
  const [openAddNote, setOpenAddNote] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [noteText, setNoteText] = useState('');
  
  const searchResults = [
    { id: 1, name: 'Emily Davis', email: 'emily.d@company.com', company: 'ABC Corp', department: 'Operations', enrollments: 5, completed: 3, lastActive: '2 hours ago', status: 'active' },
    { id: 2, name: 'James Wilson', email: 'james.w@company.com', company: 'XYZ Ltd', department: 'HR', enrollments: 8, completed: 6, lastActive: '1 day ago', status: 'active' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah.j@company.com', company: 'ABC Corp', department: 'Sales', enrollments: 4, completed: 4, lastActive: '3 hours ago', status: 'active' },
  ];

  const handleAddNote = () => {
    if (!noteText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a note",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Note Added",
      description: `Support note has been added to ${selectedUser?.name}'s profile`,
    });
    setNoteText('');
    setOpenAddNote(false);
  };

  const handleResetCourse = () => {
    toast({
      title: "Course Reset",
      description: `Course progress has been reset for ${selectedUser?.name}`,
    });
    setOpenResetCourse(false);
  };

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
                    <Button onClick={() => {
                      setSelectedUser(user);
                      setOpenFullDetails(true);
                    }}>View Full Details</Button>
                    <Button variant="outline" onClick={() => {
                      setSelectedUser(user);
                      setOpenViewProgress(true);
                    }}>View Progress</Button>
                    <Button variant="outline" onClick={() => {
                      setSelectedUser(user);
                      setOpenResetCourse(true);
                    }}>Reset Course</Button>
                    <Button variant="outline" onClick={() => {
                      setSelectedUser(user);
                      setOpenAddNote(true);
                    }}>Add Note</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Full Details Dialog */}
      <Dialog open={openFullDetails} onOpenChange={setOpenFullDetails}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Full User Details</DialogTitle>
            <DialogDescription>
              Complete profile and learning information for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[500px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <p className="font-medium">{selectedUser?.name}</p>
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <p className="font-medium">{selectedUser?.email}</p>
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <p className="font-medium">{selectedUser?.company}</p>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <p className="font-medium">{selectedUser?.department}</p>
              </div>
              <div className="space-y-2">
                <Label>Account Status</Label>
                <Badge variant="default">{selectedUser?.status}</Badge>
              </div>
              <div className="space-y-2">
                <Label>Last Active</Label>
                <p className="font-medium">{selectedUser?.lastActive}</p>
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-4">
              <h4 className="font-semibold">Learning Statistics</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{selectedUser?.enrollments}</p>
                  <p className="text-sm text-muted-foreground">Total Enrollments</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{selectedUser?.completed}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">
                    {selectedUser && Math.round((selectedUser.completed / selectedUser.enrollments) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Label>Overall Progress</Label>
              <Progress 
                value={selectedUser && (selectedUser.completed / selectedUser.enrollments) * 100} 
                className="h-3" 
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Progress Dialog */}
      <Dialog open={openViewProgress} onOpenChange={setOpenViewProgress}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Course Progress Details</DialogTitle>
            <DialogDescription>
              Detailed progress for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {[
              { course: 'Maritime Safety Fundamentals', progress: 100, status: 'completed', score: 92 },
              { course: 'Guest Experience Excellence', progress: 65, status: 'in-progress', score: null },
              { course: 'Food Safety & Hygiene', progress: 100, status: 'completed', score: 88 },
              { course: 'Leadership Skills', progress: 30, status: 'in-progress', score: null },
              { course: 'Customer Service', progress: 100, status: 'completed', score: 95 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{item.course}</p>
                  <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                    {item.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
                {item.score && (
                  <p className="text-sm text-muted-foreground">Score: <span className="font-medium text-success">{item.score}%</span></p>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Course Dialog */}
      <Dialog open={openResetCourse} onOpenChange={setOpenResetCourse}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Course Progress</DialogTitle>
            <DialogDescription>
              Reset course progress for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <p className="text-sm font-medium text-destructive">⚠️ Warning</p>
              <p className="text-sm text-muted-foreground mt-2">
                This will permanently delete all progress, quiz attempts, and completion data for the selected course. This action cannot be undone.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Select Course to Reset</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Maritime Safety Fundamentals</option>
                <option>Guest Experience Excellence</option>
                <option>Food Safety & Hygiene</option>
                <option>Leadership Skills</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenResetCourse(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleResetCourse}>
              Confirm Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={openAddNote} onOpenChange={setOpenAddNote}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Support Note</DialogTitle>
            <DialogDescription>
              Add a support note to {selectedUser?.name}'s profile
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="note-text">Note</Label>
              <Textarea
                id="note-text"
                placeholder="Enter support note, issue resolution, or important information..."
                rows={6}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Note Type</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>General Support</option>
                <option>Technical Issue</option>
                <option>Account Issue</option>
                <option>Course Access</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddNote(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>Add Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
