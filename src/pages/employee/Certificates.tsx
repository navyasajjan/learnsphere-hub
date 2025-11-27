import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award, Download, Share2, Calendar, Copy, Mail, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function EmployeeCertificates() {
  const { toast } = useToast();
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  
  const certificates = [
    { id: 1, course: 'Maritime Safety Fundamentals', issueDate: '2024-08-20', score: 92, validUntil: '2025-08-20', sector: 'Shipping' },
    { id: 2, course: 'Professional Housekeeping Standards', issueDate: '2024-08-15', score: 88, validUntil: '2025-08-15', sector: 'Hospitality' },
    { id: 3, course: 'Customer Service Excellence', issueDate: '2024-08-10', score: 95, validUntil: '2026-08-10', sector: 'Soft Skills' },
    { id: 4, course: 'Food Safety & Hygiene', issueDate: '2024-07-25', score: 89, validUntil: '2025-07-25', sector: 'Catering' },
    { id: 5, course: 'Leadership Essentials', issueDate: '2024-07-15', score: 91, validUntil: '2026-07-15', sector: 'Soft Skills' },
  ];

  const handleDownload = (cert: any) => {
    toast({
      title: "Downloading Certificate",
      description: `Downloading ${cert.course} certificate as PDF...`,
    });
  };

  const handleShare = (cert: any) => {
    setSelectedCertificate(cert);
    setOpenShareDialog(true);
  };

  const shareVia = (platform: string) => {
    toast({
      title: "Sharing Certificate",
      description: `Sharing via ${platform}...`,
    });
    setOpenShareDialog(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://certificates.lms.com/${selectedCertificate?.id}`);
    toast({
      title: "Link Copied",
      description: "Certificate link copied to clipboard",
    });
  };

  return (
    <DashboardLayout userRole="employee" userName="John Doe">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="text-muted-foreground">View and download your course completion certificates</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{certificates.length}</div>
              <p className="text-xs text-muted-foreground">Earned certificates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(certificates.reduce((sum, c) => sum + c.score, 0) / certificates.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Recent Achievement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 days</div>
              <p className="text-xs text-muted-foreground">Since last certificate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((cert) => (
            <Card key={cert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{cert.course}</CardTitle>
                      <CardDescription>{cert.sector}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success">
                    {cert.score}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Issue Date</p>
                    <div className="flex items-center gap-1 font-medium">
                      <Calendar className="h-3 w-3" />
                      {cert.issueDate}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Valid Until</p>
                    <div className="flex items-center gap-1 font-medium">
                      <Calendar className="h-3 w-3" />
                      {cert.validUntil}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" onClick={() => handleDownload(cert)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleShare(cert)}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={openShareDialog} onOpenChange={setOpenShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Certificate</DialogTitle>
            <DialogDescription>
              Share your {selectedCertificate?.course} certificate
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Certificate Link</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={`https://certificates.lms.com/${selectedCertificate?.id}`}
                />
                <Button size="icon" variant="outline" onClick={copyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Share via</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" onClick={() => shareVia('Email')}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" onClick={() => shareVia('LinkedIn')}>
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" onClick={() => shareVia('Twitter')}>
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
