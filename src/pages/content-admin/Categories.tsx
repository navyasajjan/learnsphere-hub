import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderTree, Plus } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ContentAdminCategories() {
  const { toast } = useToast();
  const [openRequestCategory, setOpenRequestCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categorySector, setCategorySector] = useState('');
  const [categoryReason, setCategoryReason] = useState('');

  const categories = [
    { id: 1, sector: 'Shipping', name: 'Safety Training', courses: 12, color: 'bg-blue-500' },
    { id: 2, sector: 'Shipping', name: 'Navigation', courses: 8, color: 'bg-blue-500' },
    { id: 3, sector: 'Hospitality', name: 'Guest Services', courses: 15, color: 'bg-purple-500' },
    { id: 4, sector: 'Catering', name: 'Food Safety', courses: 10, color: 'bg-green-500' },
  ];

  const handleRequestCategory = () => {
    if (!categoryName || !categorySector || !categoryReason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Category Request Submitted",
      description: `Request for "${categoryName}" has been sent to Super Admin`,
    });
    setOpenRequestCategory(false);
    setCategoryName('');
    setCategorySector('');
    setCategoryReason('');
  };

  return (
    <DashboardLayout userRole="content_admin" userName="Content Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="text-muted-foreground">Browse and organize course categories</p>
          </div>
          <Button onClick={() => setOpenRequestCategory(true)}>
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

      <Dialog open={openRequestCategory} onOpenChange={setOpenRequestCategory}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request New Category</DialogTitle>
            <DialogDescription>
              Submit a request to create a new course category. Super Admin will review your request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name">Category Name *</Label>
              <Input
                id="category-name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="e.g. Advanced Safety"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-sector">Sector *</Label>
              <Select value={categorySector} onValueChange={setCategorySector}>
                <SelectTrigger id="category-sector">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shipping">Shipping</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="soft-skills">Soft Skills</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category-reason">Reason for Request *</Label>
              <Textarea
                id="category-reason"
                value={categoryReason}
                onChange={(e) => setCategoryReason(e.target.value)}
                placeholder="Explain why this category is needed..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenRequestCategory(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestCategory}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
