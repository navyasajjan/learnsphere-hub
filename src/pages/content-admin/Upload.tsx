import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload, Play, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ContentAdminUpload() {
  const { toast } = useToast();
  const [openPreview, setOpenPreview] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);

  const handleUpload = () => {
    toast({
      title: "Uploading Course",
      description: "Validating SCORM package...",
    });
    setTimeout(() => {
      setValidationComplete(true);
      toast({
        title: "Validation Complete",
        description: "Course package validated successfully",
      });
    }, 2000);
  };

  const handleTestPreview = () => {
    setOpenPreview(true);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Course has been saved as draft",
    });
  };

  return (
    <DashboardLayout userRole="content_admin" userName="Content Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Upload New Course</h1>
          <p className="text-muted-foreground">Upload and validate SCORM/xAPI packages</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Package</CardTitle>
                <CardDescription>Upload your SCORM or xAPI package file</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">
                    Drop your SCORM/xAPI package here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported: ZIP files (SCORM 1.2, SCORM 2004, xAPI) • Max 500MB
                  </p>
                  <Input type="file" className="hidden" accept=".zip" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>Provide details about the course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title *</Label>
                    <Input id="title" placeholder="Enter course title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code</Label>
                    <Input id="code" placeholder="e.g., MRT-101" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector *</Label>
                    <Select>
                      <SelectTrigger id="sector">
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shipping">Shipping</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="catering">Catering</SelectItem>
                        <SelectItem value="driving">Driving</SelectItem>
                        <SelectItem value="soft-skills">Soft Skills</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="type">SCORM Type *</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scorm12">SCORM 1.2</SelectItem>
                        <SelectItem value="scorm2004">SCORM 2004</SelectItem>
                        <SelectItem value="xapi">xAPI / Tin Can</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Input id="duration" type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the course content"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="safety, maritime, compliance (comma-separated)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectives">Learning Objectives</Label>
                  <Textarea
                    id="objectives"
                    placeholder="List the key learning objectives"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Validation Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${validationComplete ? 'text-success' : 'text-muted-foreground'} mt-0.5`} />
                  <div>
                    <p className="text-sm font-medium">Package Structure</p>
                    <p className="text-xs text-muted-foreground">
                      {validationComplete ? 'Valid ZIP format' : 'Waiting for upload'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${validationComplete ? 'text-success' : 'text-muted-foreground'} mt-0.5`} />
                  <div>
                    <p className="text-sm font-medium">Manifest File</p>
                    <p className="text-xs text-muted-foreground">
                      {validationComplete ? 'imsmanifest.xml found' : 'Not checked'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`h-5 w-5 ${validationComplete ? 'text-warning' : 'text-muted-foreground'} mt-0.5`} />
                  <div>
                    <p className="text-sm font-medium">Metadata</p>
                    <p className="text-xs text-muted-foreground">
                      {validationComplete ? 'Some fields missing' : 'Not checked'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${validationComplete ? 'text-success' : 'text-muted-foreground'} mt-0.5`} />
                  <div>
                    <p className="text-sm font-medium">File References</p>
                    <p className="text-xs text-muted-foreground">
                      {validationComplete ? 'All files present' : 'Not checked'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Upload Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" onClick={handleUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload & Validate
                </Button>
                <Button variant="outline" className="w-full" onClick={handleTestPreview}>
                  <Play className="h-4 w-4 mr-2" />
                  Test Preview
                </Button>
                <Button variant="outline" className="w-full" onClick={handleSaveDraft}>
                  Save as Draft
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Version Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Version</span>
                    <Badge variant="outline">1.0</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="text-xs">Never</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* SCORM Preview Dialog */}
      <Dialog open={openPreview} onOpenChange={setOpenPreview}>
        <DialogContent className="sm:max-w-[800px] h-[600px]">
          <DialogHeader>
            <DialogTitle>SCORM Player Preview</DialogTitle>
            <DialogDescription>
              Test your course before publishing
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <Play className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <p className="font-medium">SCORM Player</p>
                <p className="text-sm text-muted-foreground">
                  Upload a package to preview the course content
                </p>
              </div>
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Course Loaded",
                  description: "SCORM player initialized successfully",
                });
              }}>
                Load Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
