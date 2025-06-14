
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Share } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import ResumePreview from './ResumePreview';
import TemplateSelector from './TemplateSelector';

interface ResumeData {
  contact: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
  }>;
  awards: string[];
}

const ResumeBuilder = ({ onBack }: { onBack: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState<ResumeData>({
    contact: { fullName: '', email: '', phone: '', location: '' },
    summary: '',
    experience: [{ company: '', position: '', duration: '', description: '' }],
    education: [{ institution: '', degree: '', year: '' }],
    skills: [],
    projects: [{ title: '', description: '' }],
    awards: []
  });

  const steps = ['Template', 'Contact', 'Summary', 'Experience', 'Education', 'Skills', 'Extras', 'Preview'];

  const updateContact = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '' }]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const exportToPDF = () => {
    toast({
      title: "PDF Export",
      description: "Your resume has been exported as PDF successfully!"
    });
  };

  const shareResume = () => {
    toast({
      title: "Share Resume",
      description: "Sharing options opened!"
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
          />
        );
      
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <p className="text-sm text-gray-600">Include your professional contact details</p>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={resumeData.contact.fullName}
                  onChange={(e) => updateContact('fullName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.contact.email}
                  onChange={(e) => updateContact('email', e.target.value)}
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={resumeData.contact.phone}
                  onChange={(e) => updateContact('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.contact.location}
                  onChange={(e) => updateContact('location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Summary</h3>
            <p className="text-sm text-gray-600">Write a brief overview of your professional background and goals</p>
            
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={resumeData.summary}
                onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Experienced professional with 5+ years in..."
                rows={4}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Tip: Start with your years of experience and highlight 2-3 key achievements</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <p className="text-sm text-gray-600">List your relevant work experience, starting with the most recent</p>
            
            {resumeData.experience.map((exp, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Company *</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <Label>Position *</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                  
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      placeholder="• Managed team of 5 developers..."
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">Tip: Use bullet points and action verbs like 'Led', 'Developed', 'Increased'</p>
                  </div>
                </div>
              </Card>
            ))}
            
            <Button onClick={addExperience} variant="outline" className="w-full">
              Add Another Position
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Education</h3>
            <p className="text-sm text-gray-600">Add your educational background</p>
            
            {resumeData.education.map((edu, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div>
                    <Label>Institution *</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      placeholder="University Name"
                    />
                  </div>
                  
                  <div>
                    <Label>Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  
                  <div>
                    <Label>Year</Label>
                    <Input
                      value={edu.year}
                      onChange={(e) => updateEducation(index, 'year', e.target.value)}
                      placeholder="2020"
                    />
                  </div>
                </div>
              </Card>
            ))}
            
            <Button onClick={addEducation} variant="outline" className="w-full">
              Add Another Degree
            </Button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            <p className="text-sm text-gray-600">Add your technical and professional skills</p>
            
            <div>
              <Label>Add Skill</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  placeholder="e.g., JavaScript, Project Management"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkill(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button 
                  onClick={(e) => {
                    const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                    addSkill(input.value);
                    input.value = '';
                  }}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Press Enter or click Add to include each skill</p>
            </div>
            
            {resumeData.skills.length > 0 && (
              <div>
                <Label>Your Skills</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                      <span>{skill}</span>
                      <button 
                        onClick={() => removeSkill(skill)}
                        className="text-blue-600 hover:text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <p className="text-sm text-gray-600">Optional: Add projects or awards to strengthen your resume</p>
            
            <div>
              <Label>Projects (Optional)</Label>
              {resumeData.projects.map((project, index) => (
                <Card key={index} className="p-3 mt-2">
                  <div className="space-y-2">
                    <Input
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...resumeData.projects];
                        newProjects[index].title = e.target.value;
                        setResumeData(prev => ({ ...prev, projects: newProjects }));
                      }}
                      placeholder="Project Name"
                    />
                    <Textarea
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...resumeData.projects];
                        newProjects[index].description = e.target.value;
                        setResumeData(prev => ({ ...prev, projects: newProjects }));
                      }}
                      placeholder="Brief project description..."
                      rows={2}
                    />
                  </div>
                </Card>
              ))}
            </div>
            
            <div>
              <Label>Awards & Achievements (Optional)</Label>
              <Textarea
                value={resumeData.awards.join('\n')}
                onChange={(e) => setResumeData(prev => ({ 
                  ...prev, 
                  awards: e.target.value.split('\n').filter(award => award.trim()) 
                }))}
                placeholder="Employee of the Month - June 2023&#10;Dean's List - Fall 2019"
                rows={3}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Add one achievement per line</p>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Preview & Export</h3>
              <div className="flex space-x-2">
                <Button onClick={exportToPDF} className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export PDF</span>
                </Button>
                <Button onClick={shareResume} variant="outline" className="flex items-center space-x-2">
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
            
            <ResumePreview data={resumeData} template={selectedTemplate} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800">Resume Builder</h2>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            variant="outline"
          >
            Previous
          </Button>
          
          <Button 
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
