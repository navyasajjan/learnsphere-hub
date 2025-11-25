import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, FolderTree, Edit, Trash2, Upload, FileUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function SuperAdminSectors() {
  const { toast } = useToast();
  const [openAddSector, setOpenAddSector] = useState(false);
  const [openEditSector, setOpenEditSector] = useState(false);
  const [openAddSubcategory, setOpenAddSubcategory] = useState(false);
  const [openBulkUpload, setOpenBulkUpload] = useState(false);
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const [sectorName, setSectorName] = useState('');
  const [sectorDesc, setSectorDesc] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [bulkData, setBulkData] = useState('');
  const sectors = [
    { id: 1, name: 'Shipping', subcategories: 12, courses: 45, color: 'bg-blue-500' },
    { id: 2, name: 'Hospitality', subcategories: 8, courses: 32, color: 'bg-purple-500' },
    { id: 3, name: 'Catering', subcategories: 6, courses: 28, color: 'bg-green-500' },
    { id: 4, name: 'Driving', subcategories: 5, courses: 18, color: 'bg-orange-500' },
    { id: 5, name: 'Soft Skills', subcategories: 10, courses: 38, color: 'bg-pink-500' },
  ];

  return (
    <DashboardLayout userRole="super_admin" userName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sectors & Categories</h1>
            <p className="text-muted-foreground">Organize courses by sector and category</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenBulkUpload(true)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
            <Button onClick={() => setOpenAddSector(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Sector
            </Button>
          </div>
        </div>

        {/* Add Sector Dialog */}
        <Dialog open={openAddSector} onOpenChange={setOpenAddSector}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Sector</DialogTitle>
              <DialogDescription>Add a new course sector to the platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sector-name">Sector Name</Label>
                <Input 
                  id="sector-name" 
                  placeholder="e.g., Healthcare"
                  value={sectorName}
                  onChange={(e) => setSectorName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector-desc">Description</Label>
                <Input 
                  id="sector-desc" 
                  placeholder="Brief description"
                  value={sectorDesc}
                  onChange={(e) => setSectorDesc(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAddSector(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (sectorName.trim()) {
                    toast({
                      title: "Sector Created",
                      description: `${sectorName} has been created successfully`,
                    });
                    setSectorName('');
                    setSectorDesc('');
                    setOpenAddSector(false);
                  } else {
                    toast({
                      title: "Error",
                      description: "Please enter a sector name",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Create Sector
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Sector Dialog */}
        <Dialog open={openEditSector} onOpenChange={setOpenEditSector}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Sector</DialogTitle>
              <DialogDescription>Update sector information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-sector-name">Sector Name</Label>
                <Input 
                  id="edit-sector-name" 
                  placeholder="e.g., Healthcare"
                  value={selectedSector?.name || ''}
                  onChange={(e) => setSelectedSector({...selectedSector, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-sector-desc">Description</Label>
                <Input 
                  id="edit-sector-desc" 
                  placeholder="Brief description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenEditSector(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Sector Updated",
                    description: `${selectedSector?.name} has been updated successfully`,
                  });
                  setOpenEditSector(false);
                  setSelectedSector(null);
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Subcategory Dialog */}
        <Dialog open={openAddSubcategory} onOpenChange={setOpenAddSubcategory}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Subcategory</DialogTitle>
              <DialogDescription>
                Add a new subcategory to {selectedSector?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subcategory-name">Subcategory Name</Label>
                <Input 
                  id="subcategory-name" 
                  placeholder="e.g., Safety Training"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAddSubcategory(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (subcategoryName.trim()) {
                    toast({
                      title: "Subcategory Added",
                      description: `${subcategoryName} has been added to ${selectedSector?.name}`,
                    });
                    setSubcategoryName('');
                    setOpenAddSubcategory(false);
                    setSelectedSector(null);
                  } else {
                    toast({
                      title: "Error",
                      description: "Please enter a subcategory name",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Add Subcategory
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Bulk Upload Dialog */}
        <Dialog open={openBulkUpload} onOpenChange={setOpenBulkUpload}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Bulk Upload Sectors & Categories</DialogTitle>
              <DialogDescription>
                Upload multiple sectors and categories using CSV or JSON format
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload File</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileUp className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">
                    Drop your CSV or JSON file here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: CSV, JSON (Max 5MB)
                  </p>
                  <Input type="file" className="hidden" accept=".csv,.json" />
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or paste data</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bulk-data">Paste CSV or JSON Data</Label>
                <Textarea 
                  id="bulk-data"
                  placeholder="Sector Name, Description&#10;Healthcare, Medical training courses&#10;Manufacturing, Industrial safety and operations"
                  rows={8}
                  className="font-mono text-sm"
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenBulkUpload(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (bulkData.trim()) {
                    toast({
                      title: "Processing Upload",
                      description: "Bulk upload is being processed...",
                    });
                    setBulkData('');
                    setOpenBulkUpload(false);
                  } else {
                    toast({
                      title: "Error",
                      description: "Please upload a file or paste data",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Upload Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <Card key={sector.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-lg ${sector.color} flex items-center justify-center`}>
                      <FolderTree className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{sector.name}</CardTitle>
                      <CardDescription>{sector.subcategories} subcategories</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Courses</span>
                  <Badge>{sector.courses}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedSector(sector);
                      setOpenEditSector(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedSector(sector);
                      setOpenAddSubcategory(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Sub
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
