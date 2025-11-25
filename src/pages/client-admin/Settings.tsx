import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ClientAdminSettings() {
  return (
    <DashboardLayout userRole="client_admin" userName="Client Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Company Settings</h1>
          <p className="text-muted-foreground">Manage your company's LMS configuration</p>
        </div>

        <Tabs defaultValue="company" className="space-y-4">
          <TabsList>
            <TabsTrigger value="company">Company Info</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Ocean Logistics Corp" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" defaultValue="Shipping & Logistics" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Company Size</Label>
                    <Input id="size" defaultValue="200-500 employees" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Harbor Street, Port City" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Branding</CardTitle>
                <CardDescription>Customize your LMS appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Upload your company logo</p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input id="primary-color" type="color" defaultValue="#3b82f6" className="w-20" />
                    <Input defaultValue="#3b82f6" />
                  </div>
                </div>
                <Button>Save Branding</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure email notifications for your team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Course Assignment Notifications</p>
                    <p className="text-sm text-muted-foreground">Notify employees when courses are assigned</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Completion Reminders</p>
                    <p className="text-sm text-muted-foreground">Send reminders for upcoming deadlines</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Achievement Notifications</p>
                    <p className="text-sm text-muted-foreground">Celebrate course completions</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Progress Reports</p>
                    <p className="text-sm text-muted-foreground">Receive weekly team progress summaries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>View and manage your subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Plan</p>
                    <p className="text-2xl font-bold">Enterprise</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Renewal Date</p>
                    <p className="text-2xl font-bold">Dec 31, 2024</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-xl font-semibold">247 / 500</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Storage Used</p>
                    <p className="text-xl font-semibold">125 GB / 500 GB</p>
                  </div>
                </div>
                <div className="pt-4 space-x-2">
                  <Button>Upgrade Plan</Button>
                  <Button variant="outline">View Billing</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
