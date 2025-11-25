import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderTree, Plus } from 'lucide-react';

export default function ContentAdminCategories() {
  const categories = [
    { id: 1, sector: 'Shipping', name: 'Safety Training', courses: 12, color: 'bg-blue-500' },
    { id: 2, sector: 'Shipping', name: 'Navigation', courses: 8, color: 'bg-blue-500' },
    { id: 3, sector: 'Hospitality', name: 'Guest Services', courses: 15, color: 'bg-purple-500' },
    { id: 4, sector: 'Catering', name: 'Food Safety', courses: 10, color: 'bg-green-500' },
  ];

  return (
    <DashboardLayout userRole="content_admin" userName="Content Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="text-muted-foreground">Browse and organize course categories</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Request Category
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-lg ${category.color} flex items-center justify-center`}>
                    <FolderTree className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.sector}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Courses</span>
                  <Badge>{category.courses}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
