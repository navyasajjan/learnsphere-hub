import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Building2, TrendingUp, Activity, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function SuperAdminDashboard() {
  const sectorData = [
    { name: 'Shipping', value: 145, color: 'hsl(var(--primary))' },
    { name: 'Hospitality', value: 123, color: 'hsl(var(--accent))' },
    { name: 'Soft Skills', value: 98, color: 'hsl(var(--success))' },
    { name: 'Catering', value: 76, color: 'hsl(var(--warning))' },
    { name: 'Driving', value: 54, color: 'hsl(var(--primary-light))' },
  ];

  const enrollmentData = [
    { month: 'Jan', enrollments: 420 },
    { month: 'Feb', enrollments: 580 },
    { month: 'Mar', enrollments: 720 },
    { month: 'Apr', enrollments: 850 },
    { month: 'May', enrollments: 920 },
    { month: 'Jun', enrollments: 1100 },
  ];

  const completionData = [
    { month: 'Jan', rate: 78 },
    { month: 'Feb', rate: 82 },
    { month: 'Mar', rate: 85 },
    { month: 'Apr', rate: 88 },
    { month: 'May', rate: 87 },
    { month: 'Jun', rate: 91 },
  ];

  return (
    <DashboardLayout userRole="super_admin" userName="Super Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value="2,847"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Courses"
            value="156"
            icon={BookOpen}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Client Companies"
            value="42"
            icon={Building2}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Completion Rate"
            value="91%"
            icon={Award}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sector Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Course Distribution by Sector</CardTitle>
              <CardDescription>Active courses across different sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enrollment Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Trend</CardTitle>
              <CardDescription>Monthly course enrollments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrollments" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Completion Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Course Completion Rate Trend</CardTitle>
            <CardDescription>Average completion rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--accent))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New client added', client: 'Ocean Logistics Corp', time: '2 hours ago' },
                { action: 'Course published', course: 'Advanced Safety Procedures', time: '4 hours ago' },
                { action: 'Bulk user import', count: '45 users', time: '6 hours ago' },
                { action: 'Analytics report generated', report: 'Q2 Performance', time: '1 day ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.client || activity.course || activity.count || activity.report}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
