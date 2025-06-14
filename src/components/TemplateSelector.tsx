
import { Card } from "@/components/ui/card";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design',
      preview: (
        <div className="bg-white p-4 border rounded-lg h-48 overflow-hidden">
          <div className="border-b-2 border-blue-500 pb-2 mb-3">
            <div className="h-3 bg-gray-800 rounded mb-1"></div>
            <div className="h-2 bg-gray-400 rounded w-2/3"></div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-blue-500 rounded w-1/3"></div>
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      )
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional professional layout',
      preview: (
        <div className="bg-white p-4 border rounded-lg h-48 overflow-hidden">
          <div className="text-center pb-3 mb-3 border-b">
            <div className="h-3 bg-gray-800 rounded mb-1 mx-auto w-2/3"></div>
            <div className="h-2 bg-gray-400 rounded mx-auto w-1/2"></div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-600 rounded w-1/4"></div>
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant design',
      preview: (
        <div className="bg-white p-4 border rounded-lg h-48 overflow-hidden">
          <div className="pb-3 mb-3">
            <div className="h-4 bg-gray-800 rounded mb-2"></div>
            <div className="h-1 bg-gray-400 rounded w-1/2"></div>
          </div>
          <div className="space-y-3">
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
      name: 'Creative',
      description: 'Modern with color accents',
      preview: (
        <div className="bg-white p-4 border rounded-lg h-48 overflow-hidden">
          <div className="flex pb-3 mb-3 border-b-2 border-purple-500">
            <div className="flex-1">
              <div className="h-3 bg-gray-800 rounded mb-1"></div>
              <div className="h-2 bg-gray-400 rounded w-2/3"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-purple-500 rounded w-1/3"></div>
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      )
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Professional senior-level format',
      preview: (
        <div className="bg-white p-4 border rounded-lg h-48 overflow-hidden">
          <div className="bg-gray-800 text-white p-2 -m-4 mb-3">
            <div className="h-3 bg-white rounded mb-1 w-2/3"></div>
            <div className="h-1 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="h-2 bg-gray-700 rounded w-1/4"></div>
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded w-4/5"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Your Template</h3>
        <p className="text-sm text-gray-600">Select a professional template that fits your style</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {template.preview}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  {selectedTemplate === template.id && (
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                      Selected
                    </span>
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
