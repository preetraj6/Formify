
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Camera, User, Mail } from 'lucide-react';
import ResumeBuilder from '@/components/ResumeBuilder';
import CoverLetterBuilder from '@/components/CoverLetterBuilder';
import ReferenceBuilder from '@/components/ReferenceBuilder';
import BioBuilder from '@/components/BioBuilder';
import ImageToPdf from '@/components/ImageToPdf';
import DocumentScanner from '@/components/DocumentScanner';

const Index = () => {
  const [activeView, setActiveView] = useState('home');

  const renderActiveView = () => {
    switch (activeView) {
      case 'resume':
        return <ResumeBuilder onBack={() => setActiveView('home')} />;
      case 'cover-letter':
        return <CoverLetterBuilder onBack={() => setActiveView('home')} />;
      case 'references':
        return <ReferenceBuilder onBack={() => setActiveView('home')} />;
      case 'bio':
        return <BioBuilder onBack={() => setActiveView('home')} />;
      case 'image-pdf':
        return <ImageToPdf onBack={() => setActiveView('home')} />;
      case 'scanner':
        return <DocumentScanner onBack={() => setActiveView('home')} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8 pt-8">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">DocuTools</h1>
                <p className="text-gray-600">Professional Document Utilities</p>
              </div>

              <div className="space-y-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveView('resume')}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Resume/CV Maker</CardTitle>
                        <CardDescription>Create professional resumes with guided prompts</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveView('cover-letter')}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Mail className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Cover Letter Generator</CardTitle>
                        <CardDescription>Build compelling cover letters quickly</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveView('references')}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Reference Sheet</CardTitle>
                        <CardDescription>Organize professional references</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveView('bio')}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <User className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Professional Bio</CardTitle>
                        <CardDescription>Craft engaging professional summaries</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveView('image-pdf')}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <Image className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Image to PDF</CardTitle>
                        <CardDescription>Convert images to PDF documents</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveView('scanner')}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <Camera className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Document Scanner</CardTitle>
                        <CardDescription>Scan documents with your camera</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderActiveView();
};

export default Index;
