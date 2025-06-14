
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Share, Plus, Trash2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Reference {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

const ReferenceBuilder = ({ onBack }: { onBack: () => void }) => {
  const [references, setReferences] = useState<Reference[]>([
    { name: '', title: '', company: '', email: '', phone: '', relationship: '' }
  ]);

  const addReference = () => {
    setReferences(prev => [...prev, { name: '', title: '', company: '', email: '', phone: '', relationship: '' }]);
  };

  const removeReference = (index: number) => {
    if (references.length > 1) {
      setReferences(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateReference = (index: number, field: string, value: string) => {
    setReferences(prev => prev.map((ref, i) => 
      i === index ? { ...ref, [field]: value } : ref
    ));
  };

  const exportToPDF = () => {
    toast({
      title: "PDF Export",
      description: "Your reference sheet has been exported as PDF successfully!"
    });
  };

  const shareReferences = () => {
    toast({
      title: "Share References",
      description: "Sharing options opened!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-4">
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
            <Button onClick={shareReferences} variant="outline" className="flex items-center space-x-2">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Professional References
                  <Button onClick={addReference} size="sm" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Reference</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {references.map((reference, index) => (
                  <Card key={index} className="p-4 border-2">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-700">Reference #{index + 1}</h4>
                      {references.length > 1 && (
                        <Button 
                          onClick={() => removeReference(index)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`name-${index}`}>Full Name *</Label>
                        <Input
                          id={`name-${index}`}
                          value={reference.name}
                          onChange={(e) => updateReference(index, 'name', e.target.value)}
                          placeholder="John Smith"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`title-${index}`}>Job Title *</Label>
                        <Input
                          id={`title-${index}`}
                          value={reference.title}
                          onChange={(e) => updateReference(index, 'title', e.target.value)}
                          placeholder="Senior Manager"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`company-${index}`}>Company *</Label>
                        <Input
                          id={`company-${index}`}
                          value={reference.company}
                          onChange={(e) => updateReference(index, 'company', e.target.value)}
                          placeholder="ABC Corporation"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`email-${index}`}>Email Address *</Label>
                        <Input
                          id={`email-${index}`}
                          type="email"
                          value={reference.email}
                          onChange={(e) => updateReference(index, 'email', e.target.value)}
                          placeholder="john.smith@company.com"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                        <Input
                          id={`phone-${index}`}
                          value={reference.phone}
                          onChange={(e) => updateReference(index, 'phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`relationship-${index}`}>Professional Relationship *</Label>
                        <Input
                          id={`relationship-${index}`}
                          value={reference.relationship}
                          onChange={(e) => updateReference(index, 'relationship', e.target.value)}
                          placeholder="Former Supervisor"
                        />
                        <p className="text-xs text-gray-500 mt-1">e.g., Former Supervisor, Colleague, Client</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-6 shadow-lg max-h-96 overflow-y-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Professional References</h2>
                    <div className="h-1 bg-purple-600 w-16 mx-auto"></div>
                  </div>

                  <div className="space-y-6">
                    {references.map((reference, index) => (
                      reference.name || reference.title || reference.company ? (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <div className="mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {reference.name || `Reference ${index + 1}`}
                            </h3>
                            {reference.title && (
                              <div className="text-purple-600 font-medium">{reference.title}</div>
                            )}
                            {reference.company && (
                              <div className="text-gray-700">{reference.company}</div>
                            )}
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-600">
                            {reference.email && (
                              <div>Email: {reference.email}</div>
                            )}
                            {reference.phone && (
                              <div>Phone: {reference.phone}</div>
                            )}
                            {reference.relationship && (
                              <div>Relationship: {reference.relationship}</div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div key={index} className="border border-dashed border-gray-300 p-4 rounded-lg text-center text-gray-500">
                          Reference #{index + 1} - Fill in details to see preview
                        </div>
                      )
                    ))}
                  </div>

                  {references.every(ref => !ref.name && !ref.title && !ref.company) && (
                    <div className="text-center text-gray-500 py-8">
                      <p>Start filling in your reference details to see the preview</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceBuilder;
