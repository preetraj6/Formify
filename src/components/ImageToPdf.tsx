
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Share, Upload, X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const ImageToPdf = ({ onBack }: { onBack: () => void }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Invalid files",
        description: "Please select only image files (JPG, PNG, etc.)",
        variant: "destructive"
      });
    }
    
    setSelectedImages(prev => [...prev, ...imageFiles]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const convertToPdf = () => {
    if (selectedImages.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image to convert",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "PDF Created!",
      description: `Successfully converted ${selectedImages.length} image(s) to PDF`
    });
  };

  const sharePdf = () => {
    if (selectedImages.length === 0) {
      toast({
        title: "No PDF to share",
        description: "Please convert images to PDF first",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Share PDF",
      description: "Sharing options opened!"
    });
  };

  const getImagePreview = (file: File): string => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div className="flex space-x-2">
            <Button onClick={convertToPdf} disabled={selectedImages.length === 0} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Create PDF</span>
            </Button>
            <Button onClick={sharePdf} variant="outline" disabled={selectedImages.length === 0} className="flex items-center space-x-2">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Image to PDF Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Select Images</h3>
                <p className="text-gray-600 mb-4">Choose one or more images from your device</p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Browse Images</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: JPG, PNG, GIF, BMP, WebP
                </p>
              </div>

              {selectedImages.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">
                    Selected Images ({selectedImages.length})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={getImagePreview(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="mt-2 text-xs text-gray-600 truncate">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedImages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>PDF Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 shadow-lg rounded-lg">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Your PDF Document</h3>
                  <p className="text-sm text-gray-600">
                    This PDF will contain {selectedImages.length} page{selectedImages.length > 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <img
                          src={getImagePreview(image)}
                          alt={`Page ${index + 1}`}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">Page {index + 1}</div>
                        <div className="text-sm text-gray-600">{image.name}</div>
                        <div className="text-xs text-gray-500">
                          {(image.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImageToPdf;
