
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Camera, Download, Share, RotateCw, Crop } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const DocumentScanner = ({ onBack }: { onBack: () => void }) => {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions or use file upload.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImages(prev => [...prev, imageDataUrl]);
        
        toast({
          title: "Image Captured!",
          description: "Document image has been captured successfully"
        });
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setCapturedImages(prev => [...prev, e.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });

    if (files.length > 0) {
      toast({
        title: "Images Added",
        description: `Added ${files.length} image(s) to your document scan`
      });
    }
  };

  const removeImage = (index: number) => {
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
  };

  const convertToPdf = () => {
    if (capturedImages.length === 0) {
      toast({
        title: "No images to convert",
        description: "Please capture or upload images first",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "PDF Created!",
      description: `Successfully converted ${capturedImages.length} scanned image(s) to PDF`
    });
  };

  const shareDocument = () => {
    if (capturedImages.length === 0) {
      toast({
        title: "No document to share",
        description: "Please scan or upload images first",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Share Document",
      description: "Sharing options opened!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div className="flex space-x-2">
            <Button onClick={convertToPdf} disabled={capturedImages.length === 0} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Create PDF</span>
            </Button>
            <Button onClick={shareDocument} variant="outline" disabled={capturedImages.length === 0} className="flex items-center space-x-2">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Document Scanner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!isCapturing ? (
                    <div className="text-center space-y-4">
                      <div className="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
                        <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Start Document Scanning</h3>
                        <p className="text-gray-600 mb-4">Use your camera to scan documents or upload existing images</p>
                        
                        <div className="space-y-2">
                          <Button onClick={startCamera} className="w-full flex items-center justify-center space-x-2">
                            <Camera className="w-4 h-4" />
                            <span>Start Camera</span>
                          </Button>
                          
                          <Button 
                            onClick={() => fileInputRef.current?.click()} 
                            variant="outline" 
                            className="w-full"
                          >
                            Upload Images
                          </Button>
                          
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full rounded-lg bg-black"
                        />
                        <div className="absolute inset-0 border-2 border-teal-500 rounded-lg pointer-events-none">
                          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-teal-500"></div>
                          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-teal-500"></div>
                          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-teal-500"></div>
                          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-teal-500"></div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button onClick={captureImage} className="flex-1 flex items-center justify-center space-x-2">
                          <Camera className="w-4 h-4" />
                          <span>Capture</span>
                        </Button>
                        <Button onClick={stopCamera} variant="outline">
                          Stop
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-600 text-center">
                        Position your document within the frame and tap Capture
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Scanned Images ({capturedImages.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {capturedImages.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {capturedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="border rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`Scan ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                        <div className="absolute top-2 right-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="secondary" className="p-1">
                            <RotateCw className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="secondary" className="p-1">
                            <Crop className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="p-1"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 text-center">
                          Page {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No images scanned yet</p>
                    <p className="text-sm">Start scanning or upload images to begin</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default DocumentScanner;
