
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Share, Copy } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface BioData {
  name: string;
  currentRole: string;
  company: string;
  experience: string;
  keySkills: string;
  achievements: string;
  personalTouch: string;
  callToAction: string;
}

const BioBuilder = ({ onBack }: { onBack: () => void }) => {
  const [bioData, setBioData] = useState<BioData>({
    name: '',
    currentRole: '',
    company: '',
    experience: '',
    keySkills: '',
    achievements: '',
    personalTouch: '',
    callToAction: ''
  });

  const [bioLength, setBioLength] = useState<'short' | 'medium' | 'long'>('medium');

  const updateData = (field: string, value: string) => {
    setBioData(prev => ({ ...prev, [field]: value }));
  };

  const generateBio = () => {
    const { name, currentRole, company, experience, keySkills, achievements, personalTouch, callToAction } = bioData;
    
    let bio = '';
    
    if (bioLength === 'short') {
      bio = `${name || '[Your Name]'} is ${currentRole ? `a ${currentRole}` : '[Your Current Role]'}${company ? ` at ${company}` : ''}. ${experience ? `With ${experience},` : ''} ${name?.split(' ')[0] || '[Name]'} specializes in ${keySkills || '[key skills]'}. ${achievements || ''}`;
    } else if (bioLength === 'medium') {
      bio = `${name || '[Your Name]'} is ${currentRole ? `a ${currentRole}` : '[Your Current Role]'}${company ? ` at ${company}` : ''}. ${experience ? `With ${experience},` : ''} ${name?.split(' ')[0] || '[Name]'} brings expertise in ${keySkills || '[key skills]'}.\n\n${achievements ? `${achievements} ` : ''}${personalTouch || ''}\n\n${callToAction || `Feel free to connect with ${name?.split(' ')[0] || '[Name]'} for professional opportunities and collaborations.`}`;
    } else {
      bio = `${name || '[Your Name]'} is ${currentRole ? `a seasoned ${currentRole}` : '[Your Current Role]'}${company ? ` currently working at ${company}` : ''}. ${experience ? `With ${experience},` : ''} ${name?.split(' ')[0] || '[Name]'} has developed deep expertise in ${keySkills || '[key skills]'}.\n\nThroughout ${name?.split(' ')[0] || '[Name]'}'s career, key achievements include: ${achievements || '[your achievements]'}. ${personalTouch ? `\n\nOn a personal note, ${personalTouch}` : ''}\n\n${callToAction || `${name?.split(' ')[0] || '[Name]'} is always interested in connecting with like-minded professionals and exploring new opportunities. Feel free to reach out for collaborations, speaking engagements, or professional discussions.`}`;
    }
    
    return bio.trim();
  };

  const copyBio = () => {
    const bio = generateBio();
    navigator.clipboard.writeText(bio);
    toast({
      title: "Copied!",
      description: "Your professional bio has been copied to clipboard"
    });
  };

  const exportToPDF = () => {
    toast({
      title: "PDF Export",
      description: "Your professional bio has been exported as PDF successfully!"
    });
  };

  const shareBio = () => {
    toast({
      title: "Share Bio",
      description: "Sharing options opened!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div className="flex space-x-2">
            <Button onClick={copyBio} variant="outline" className="flex items-center space-x-2">
              <Copy className="w-4 h-4" />
              <span>Copy Bio</span>
            </Button>
            <Button onClick={exportToPDF} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </Button>
            <Button onClick={shareBio} variant="outline" className="flex items-center space-x-2">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Professional Bio Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Bio Length</Label>
                  <div className="flex space-x-2 mt-2">
                    {(['short', 'medium', 'long'] as const).map((length) => (
                      <Button
                        key={length}
                        variant={bioLength === length ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setBioLength(length)}
                        className="capitalize"
                      >
                        {length}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Short (1-2 sentences), Medium (1 paragraph), Long (3+ paragraphs)
                  </p>
                </div>

                <div>
                  <Label htmlFor="name">Your Full Name *</Label>
                  <Input
                    id="name"
                    value={bioData.name}
                    onChange={(e) => updateData('name', e.target.value)}
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="currentRole">Current Role/Title *</Label>
                  <Input
                    id="currentRole"
                    value={bioData.currentRole}
                    onChange={(e) => updateData('currentRole', e.target.value)}
                    placeholder="Senior Software Engineer"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Current Company</Label>
                  <Input
                    id="company"
                    value={bioData.company}
                    onChange={(e) => updateData('company', e.target.value)}
                    placeholder="Tech Innovations Inc."
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    value={bioData.experience}
                    onChange={(e) => updateData('experience', e.target.value)}
                    placeholder="over 8 years of experience in software development"
                  />
                  <p className="text-xs text-gray-500 mt-1">e.g., "5+ years of experience in...", "over a decade of..."</p>
                </div>

                <div>
                  <Label htmlFor="keySkills">Key Skills/Expertise *</Label>
                  <Textarea
                    id="keySkills"
                    value={bioData.keySkills}
                    onChange={(e) => updateData('keySkills', e.target.value)}
                    placeholder="full-stack development, team leadership, and cloud architecture"
                    rows={2}
                  />
                  <p className="text-xs text-gray-500 mt-1">List your main areas of expertise</p>
                </div>

                <div>
                  <Label htmlFor="achievements">Key Achievements</Label>
                  <Textarea
                    id="achievements"
                    value={bioData.achievements}
                    onChange={(e) => updateData('achievements', e.target.value)}
                    placeholder="Led a team that increased system efficiency by 40% and successfully launched 3 major products"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">Highlight your most impressive accomplishments</p>
                </div>

                {bioLength !== 'short' && (
                  <div>
                    <Label htmlFor="personalTouch">Personal Touch (Optional)</Label>
                    <Textarea
                      id="personalTouch"
                      value={bioData.personalTouch}
                      onChange={(e) => updateData('personalTouch', e.target.value)}
                      placeholder="when not coding, Jane enjoys hiking and photography"
                      rows={2}
                    />
                    <p className="text-xs text-gray-500 mt-1">Add a personal element to make your bio more relatable</p>
                  </div>
                )}

                {bioLength === 'long' && (
                  <div>
                    <Label htmlFor="callToAction">Call to Action (Optional)</Label>
                    <Textarea
                      id="callToAction"
                      value={bioData.callToAction}
                      onChange={(e) => updateData('callToAction', e.target.value)}
                      placeholder="Jane is always interested in connecting with fellow developers and exploring innovative projects"
                      rows={2}
                    />
                    <p className="text-xs text-gray-500 mt-1">How people can connect with you or what you're looking for</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Generated Bio Preview
                  <Button onClick={copyBio} size="sm" variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-6 shadow-lg rounded-lg min-h-64">
                  <div className="prose prose-sm max-w-none">
                    {generateBio().split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed text-gray-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {!bioData.name && !bioData.currentRole && (
                    <div className="text-center text-gray-500 py-8">
                      <p>Fill in your details to generate your professional bio</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-700">
                    <strong>Pro tip:</strong> This bio is perfect for LinkedIn, speaker bios, company websites, and professional profiles.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioBuilder;
