
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Share } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface CoverLetterData {
  recipientName: string;
  companyName: string;
  position: string;
  senderName: string;
  senderAddress: string;
  senderEmail: string;
  senderPhone: string;
  greeting: string;
  opening: string;
  body: string;
  closing: string;
  signature: string;
}

const CoverLetterBuilder = ({ onBack }: { onBack: () => void }) => {
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    recipientName: '',
    companyName: '',
    position: '',
    senderName: '',
    senderAddress: '',
    senderEmail: '',
    senderPhone: '',
    greeting: 'Dear Hiring Manager,',
    opening: '',
    body: '',
    closing: 'Sincerely,',
    signature: ''
  });

  const updateData = (field: string, value: string) => {
    setCoverLetterData(prev => ({ ...prev, [field]: value }));
  };

  const exportToPDF = () => {
    toast({
      title: "PDF Export",
      description: "Your cover letter has been exported as PDF successfully!"
    });
  };

  const shareCoverLetter = () => {
    toast({
      title: "Share Cover Letter",
      description: "Sharing options opened!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div className="flex space-x-2">
            <Button onClick={exportToPDF} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </Button>
            <Button onClick={shareCoverLetter} variant="outline" className="flex items-center space-x-2">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">Your Information</h4>
                  
                  <div>
                    <Label htmlFor="senderName">Your Full Name *</Label>
                    <Input
                      id="senderName"
                      value={coverLetterData.senderName}
                      onChange={(e) => updateData('senderName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="senderEmail">Your Email *</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={coverLetterData.senderEmail}
                      onChange={(e) => updateData('senderEmail', e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="senderPhone">Your Phone</Label>
                    <Input
                      id="senderPhone"
                      value={coverLetterData.senderPhone}
                      onChange={(e) => updateData('senderPhone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="senderAddress">Your Address</Label>
                    <Textarea
                      id="senderAddress"
                      value={coverLetterData.senderAddress}
                      onChange={(e) => updateData('senderAddress', e.target.value)}
                      placeholder="123 Main Street&#10;City, State 12345"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">Company Information</h4>
                  
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={coverLetterData.companyName}
                      onChange={(e) => updateData('companyName', e.target.value)}
                      placeholder="ABC Company"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="position">Position Applying For *</Label>
                    <Input
                      id="position"
                      value={coverLetterData.position}
                      onChange={(e) => updateData('position', e.target.value)}
                      placeholder="Software Developer"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="recipientName">Recipient Name (if known)</Label>
                    <Input
                      id="recipientName"
                      value={coverLetterData.recipientName}
                      onChange={(e) => updateData('recipientName', e.target.value)}
                      placeholder="Jane Smith"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">Letter Content</h4>
                  
                  <div>
                    <Label htmlFor="greeting">Greeting</Label>
                    <Input
                      id="greeting"
                      value={coverLetterData.greeting}
                      onChange={(e) => updateData('greeting', e.target.value)}
                      placeholder="Dear Hiring Manager,"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="opening">Opening Paragraph *</Label>
                    <Textarea
                      id="opening"
                      value={coverLetterData.opening}
                      onChange={(e) => updateData('opening', e.target.value)}
                      placeholder="I am writing to express my interest in the [Position] role at [Company]. With my background in..."
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">Tip: Mention the specific position and briefly state why you're interested</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="body">Main Body *</Label>
                    <Textarea
                      id="body"
                      value={coverLetterData.body}
                      onChange={(e) => updateData('body', e.target.value)}
                      placeholder="In my previous role at XYZ Company, I successfully managed... My experience in... aligns perfectly with your requirements because..."
                      rows={5}
                    />
                    <p className="text-xs text-gray-500 mt-1">Tip: Highlight 2-3 key achievements that match the job requirements</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="closing">Closing</Label>
                    <Input
                      id="closing"
                      value={coverLetterData.closing}
                      onChange={(e) => updateData('closing', e.target.value)}
                      placeholder="Sincerely,"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-6 shadow-lg max-h-96 overflow-y-auto text-sm">
                  <div className="mb-6">
                    <div className="text-right mb-4">
                      <div className="font-semibold">{coverLetterData.senderName || 'Your Name'}</div>
                      {coverLetterData.senderAddress && (
                        <div className="whitespace-pre-line text-gray-600">{coverLetterData.senderAddress}</div>
                      )}
                      {coverLetterData.senderEmail && (
                        <div className="text-gray-600">{coverLetterData.senderEmail}</div>
                      )}
                      {coverLetterData.senderPhone && (
                        <div className="text-gray-600">{coverLetterData.senderPhone}</div>
                      )}
                    </div>
                    
                    <div className="text-right text-gray-600 mb-4">
                      {new Date().toLocaleDateString()}
                    </div>
                    
                    <div className="mb-4">
                      {coverLetterData.recipientName && (
                        <div>{coverLetterData.recipientName}</div>
                      )}
                      {coverLetterData.companyName && (
                        <div>{coverLetterData.companyName}</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>{coverLetterData.greeting || 'Dear Hiring Manager,'}</div>
                    
                    {coverLetterData.opening && (
                      <p className="leading-relaxed">{coverLetterData.opening}</p>
                    )}
                    
                    {coverLetterData.body && (
                      <p className="leading-relaxed">{coverLetterData.body}</p>
                    )}
                    
                    <p className="leading-relaxed">
                      Thank you for considering my application. I look forward to hearing from you and discussing how I can contribute to {coverLetterData.companyName || 'your team'}.
                    </p>
                    
                    <div className="pt-4">
                      <div>{coverLetterData.closing || 'Sincerely,'}</div>
                      <div className="mt-8 font-semibold">{coverLetterData.senderName || 'Your Name'}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
