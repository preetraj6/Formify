
import { useState } from 'react';
import { FileText, User, Mail, Image, Camera, Award } from 'lucide-react';
import Header from '@/components/Header';
import PremiumCard from '@/components/PremiumCard';
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
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
            <Header 
              title="Formify" 
              subtitle="Professional Document Creator"
              showBack={false}
            />
            
            <div className="p-4 space-y-6">
              {/* Stats Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-0">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-display font-bold text-gray-900">1.2k+</div>
                    <div className="text-xs text-gray-600">Documents Created</div>
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold text-gray-900">500+</div>
                    <div className="text-xs text-gray-600">Happy Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold text-gray-900">4.8★</div>
                    <div className="text-xs text-gray-600">User Rating</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h2 className="font-display font-semibold text-gray-900 text-lg px-1">
                  Create Professional Documents
                </h2>
                
                <div className="space-y-3">
                  <PremiumCard
                    title="Resume/CV Maker"
                    description="Build professional resumes with expert templates"
                    icon={User}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-100"
                    onClick={() => setActiveView('resume')}
                    gradient="from-blue-50 to-indigo-50"
                  />
                  
                  <PremiumCard
                    title="Cover Letter Generator"
                    description="Create compelling cover letters that get noticed"
                    icon={Mail}
                    iconColor="text-green-600"
                    iconBg="bg-green-100"
                    onClick={() => setActiveView('cover-letter')}
                    gradient="from-green-50 to-emerald-50"
                  />
                  
                  <PremiumCard
                    title="Reference Sheet"
                    description="Organize your professional references perfectly"
                    icon={Award}
                    iconColor="text-purple-600"
                    iconBg="bg-purple-100"
                    onClick={() => setActiveView('references')}
                    gradient="from-purple-50 to-violet-50"
                  />
                  
                  <PremiumCard
                    title="Professional Bio"
                    description="Craft engaging summaries for any platform"
                    icon={FileText}
                    iconColor="text-orange-600"
                    iconBg="bg-orange-100"
                    onClick={() => setActiveView('bio')}
                    gradient="from-orange-50 to-amber-50"
                  />
                </div>
              </div>

              {/* Utility Tools */}
              <div className="space-y-3">
                <h2 className="font-display font-semibold text-gray-900 text-lg px-1">
                  Document Utilities
                </h2>
                
                <div className="space-y-3">
                  <PremiumCard
                    title="Image to PDF"
                    description="Convert images to professional PDF documents"
                    icon={Image}
                    iconColor="text-red-600"
                    iconBg="bg-red-100"
                    onClick={() => setActiveView('image-pdf')}
                    gradient="from-red-50 to-rose-50"
                  />
                  
                  <PremiumCard
                    title="Document Scanner"
                    description="Scan documents with your camera instantly"
                    icon={Camera}
                    iconColor="text-teal-600"
                    iconBg="bg-teal-100"
                    onClick={() => setActiveView('scanner')}
                    gradient="from-teal-50 to-cyan-50"
                  />
                </div>
              </div>

              {/* Bottom Spacing for Mobile */}
              <div className="h-6"></div>
            </div>
          </div>
        );
    }
  };

  return renderActiveView();
};

export default Index;
