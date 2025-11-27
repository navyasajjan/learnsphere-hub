import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Search, Shield, FileText, Building2, User, Headphones } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SuperAdminUsers() {
  const { toast } = useToast();
  const [openAddUser, setOpenAddUser] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('employee');
  const [userCompany, setUserCompany] = useState('');

  const users = [
    { id: 1, name: 'John Administrator', email: 'john.admin@platform.com', role: 'super_admin', company: 'Platform', status: 'active', lastActive: '2 min ago' },
    { id: 2, name: 'Sarah Content', email: 'sarah.c@platform.com', role: 'content_admin', company: 'Platform', status: 'active', lastActive: '1 hour ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike.j@ocean.com', role: 'client_admin', company: 'Ocean Logistics', status: 'active', lastActive: '3 hours ago' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@ocean.com', role: 'employee', company: 'Ocean Logistics', status: 'active', lastActive: '5 hours ago' },
    { id: 5, name: 'Tom Support', email: 'tom.s@platform.com', role: 'helpdesk', company: 'Platform', status: 'active', lastActive: '10 min ago' },
  ];

  const handleAddUser = () => {
    if (!userName || !userEmail || !userCompany) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "User Added",
      description: `${userName} has been added as ${userRole.replace('_', ' ')}`,
    });
    setOpenAddUser(false);
    setUserName('');
    setUserEmail('');
    setUserRole('employee');
    setUserCompany('');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return Shield;
      case 'content_admin': return FileText;
      case 'client_admin': return Building2;
      case 'employee': return User;
      case 'helpdesk': return Headphones;
      default: return User;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-blue-500';
      case 'content_admin': return 'bg-cyan-500';
      case 'client_admin': return 'bg-green-500';
      case 'employee': return 'bg-sky-500';
      case 'helpdesk': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout userRole="super_admin" userName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage platform users and roles</p>
          </div>
          <Button onClick={() => setOpenAddUser(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {['super_admin', 'content_admin', 'client_admin', 'employee', 'helpdesk'].map((role) => {
            const Icon = getRoleIcon(role);
            const count = users.filter(u => u.role === role).length;
            return (
              <Card key={role}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded ${getRoleBadgeColor(role)} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                  <p className="text-xs text-muted-foreground capitalize">
                    {role.replace('_', ' ')}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Users</CardTitle>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="content_admin">Content Admin</SelectItem>
                    <SelectItem value="client_admin">Client Admin</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="helpdesk">HelpDesk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const Icon = getRoleIcon(user.role);
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-6 w-6 rounded ${getRoleBadgeColor(user.role)} flex items-center justify-center`}>
                            <Icon className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm capitalize">{user.role.replace('_', ' ')}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.company}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={openAddUser} onOpenChange={setOpenAddUser}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account and assign their role.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user-name">Full Name *</Label>
              <Input
                id="user-name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="user-email">Email Address *</Label>
              <Input
                id="user-email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="john@company.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="user-company">Company *</Label>
              <Input
                id="user-company"
                value={userCompany}
                onChange={(e) => setUserCompany(e.target.value)}
                placeholder="e.g. Ocean Logistics"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="user-role">Role *</Label>
              <Select value={userRole} onValueChange={setUserRole}>
                <SelectTrigger id="user-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="content_admin">Content Admin</SelectItem>
                  <SelectItem value="client_admin">Client Admin</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="helpdesk">HelpDesk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddUser(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
