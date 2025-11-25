import { Shield, FileText, Building, User, Headphones } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      role: 'super_admin' as UserRole,
      title: 'Super Admin',
      description: 'Full platform access and management',
      icon: Shield,
      gradient: 'from-blue-500 to-blue-600',
      path: '/super-admin/dashboard',
    },
    {
      role: 'content_admin' as UserRole,
      title: 'Content Admin',
      description: 'Upload and manage SCORM/xAPI content',
      icon: FileText,
      gradient: 'from-cyan-400 to-cyan-500',
      path: '/content-admin/dashboard',
    },
    {
      role: 'client_admin' as UserRole,
      title: 'Client Admin',
      description: 'Manage company employees and training',
      icon: Building,
      gradient: 'from-green-500 to-green-600',
      path: '/client-admin/dashboard',
    },
    {
      role: 'employee' as UserRole,
      title: 'Employee',
      description: 'Access and complete assigned courses',
      icon: User,
      gradient: 'from-sky-400 to-sky-500',
      path: '/employee/dashboard',
    },
    {
      role: 'helpdesk' as UserRole,
      title: 'HelpDesk',
      description: 'Support users and troubleshoot issues',
      icon: Headphones,
      gradient: 'from-orange-400 to-orange-500',
      path: '/helpdesk/dashboard',
    },
  ];

  const handleRoleSelect = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">SCORM 1.2</span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">SCORM 2004</span>
              <span className="px-3 py-1 bg-success/10 text-success rounded-full font-medium">xAPI / LRS</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Multi-Tenant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Select Your Role</h1>
          <p className="text-muted-foreground text-lg">Choose a role to explore the platform</p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {roles.map((role) => (
            <Card
              key={role.role}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`bg-gradient-to-br ${role.gradient} p-16 flex items-center justify-center`}>
                <role.icon className="h-20 w-20 text-white" strokeWidth={1.5} />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-base">{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handleRoleSelect(role.path)}
                  className="w-full"
                  variant="outline"
                >
                  Enter Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Platform Features</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">SCORM Compliant</h3>
              <p className="text-sm text-muted-foreground">Full support for SCORM 1.2 & 2004</p>
            </div>
            <div className="p-6">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">xAPI / LRS</h3>
              <p className="text-sm text-muted-foreground">Advanced learning analytics</p>
            </div>
            <div className="p-6">
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Building className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Multi-Tenant</h3>
              <p className="text-sm text-muted-foreground">Isolated client environments</p>
            </div>
            <div className="p-6">
              <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Role-Based Access</h3>
              <p className="text-sm text-muted-foreground">Granular permission control</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
