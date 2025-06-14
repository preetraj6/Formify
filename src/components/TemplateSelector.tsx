
import { Card } from "@/components/ui/card";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design',
      preview: (
        <div className="bg-white p-3 border rounded-lg h-32 overflow-hidden shadow-sm">
          <div className="border-b-2 border-indigo-500 pb-2 mb-2">
            <div className="h-2 bg-gray-800 rounded mb-1"></div>
            <div className="h-1 bg-gray-400 rounded w-2/3"></div>
          </div>
          <div className="space-y-1">
            <div className="h-1 bg-indigo-500 rounded w-1/3"></div>
            <div className="h-1 bg-gray-300 rounded"></div>
            <div className="h-1 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      )
    },
    {
      id: 'classic',
      name: 'Classic Business',
      description: 'Traditional professional layout',
      preview: (
        <div className="bg-white p-3 border rounded-lg h-32 overflow-hidden shadow-sm">
          <div className="text-center pb-2 mb-2 border-b">
            <div className="h-2 bg-gray-800 rounded mb-1 mx-auto w-2/3"></div>
            <div className="h-1 bg-gray-400 rounded mx-auto w-1/2"></div>
          </div>
          <div className="space-y-1">
            <div className="h-1 bg-gray-600 rounded w-1/4"></div>
            <div className="h-1 bg-gray-300 rounded"></div>
            <div className="h-1 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal',
      name: 'Minimal Elegance',
      description: 'Simple and sophisticated',
      preview: (
        <div className="bg-white p-3 border rounded-lg h-32 overflow-hidden shadow-sm">
          <div className="pb-2 mb-2">
            <div className="h-3 bg-gray-800 rounded mb-1"></div>
            <div className="h-1 bg-gray-400 rounded w-1/2"></div>
          </div>
          <div className="space-y-2">
            <div className="h-1 bg-gray-500 rounded w-1/3"></div>
            <div className="space-y-1">
              <div className="h-1 bg-gray-300 rounded"></div>
              <div className="h-1 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'creative',
      name: 'Creative Edge',
      description: 'Modern with vibrant accents',
      preview: (
        <div className="bg-white p-3 border rounded-lg h-32 overflow-hidden shadow-sm">
          <div className="flex pb-2 mb-2 border-b-2 border-purple-500">
            <div className="flex-1">
              <div className="h-2 bg-gray-800 rounded mb-1"></div>
              <div className="h-1 bg-gray-400 rounded w-2/3"></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="h-1 bg-purple-500 rounded w-1/3"></div>
            <div className="h-1 bg-gray-300 rounded"></div>
            <div className="h-1 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      )
    },
    {
      id: 'executive',
      name: 'Executive Premium',
      description: 'Senior-level professional format',
      preview: (
        <div className="bg-white p-3 border rounded-lg h-32 overflow-hidden shadow-sm">
          <div className="bg-gray-800 text-white p-2 -m-3 mb-2">
            <div className="h-2 bg-white rounded mb-1 w-2/3"></div>
            <div className="h-1 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="space-y-1 mt-3">
            <div className="h-1 bg-gray-700 rounded w-1/4"></div>
            <div className="h-1 bg-gray-300 rounded"></div>
            <div className="h-1 bg-gray-300 rounded w-4/5"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">Choose Your Template</h3>
        <p className="text-sm text-gray-600">Select a professional template that matches your style</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-0 active:scale-95 ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg' 
                : 'bg-white shadow-md'
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {template.preview}
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-gray-900 text-base">{template.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  {selectedTemplate === template.id && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-1 bg-indigo-500 text-white text-xs font-medium rounded-full">
                        ✓ Selected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
