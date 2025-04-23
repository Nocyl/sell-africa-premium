
import React, { useState } from "react";
import { Upload, X, Image as ImageIcon, File, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface MediaUploaderProps {
  onUploadComplete: (urls: string[]) => void;
  existingMedia?: string[];
  maxFiles?: number;
  acceptedTypes?: string;
  title?: string;
  description?: string;
}

export default function MediaUploader({
  onUploadComplete,
  existingMedia = [],
  maxFiles = 10,
  acceptedTypes = "image/*",
  title = "Télécharger des médias",
  description = "Glissez-déposez vos fichiers ici ou cliquez pour parcourir",
}: MediaUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(existingMedia);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Mock file upload function
  const uploadFiles = async (files: FileList) => {
    if (uploadedFiles.length + files.length > maxFiles) {
      toast.error(`Vous ne pouvez télécharger que ${maxFiles} fichiers au maximum.`);
      return;
    }

    setUploading(true);
    const newFiles: string[] = [];

    // Simulate upload process
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const progress = ((i + 1) / files.length) * 100;
      setProgress(progress);

      // Check file type
      const fileType = file.type.split('/')[0];
      let seed = '';

      if (fileType === 'image') {
        seed = `product${Math.floor(Math.random() * 1000)}`;
      } else {
        seed = `file${Math.floor(Math.random() * 1000)}`;
      }

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use DiceBear for mock images
      const mockUrl = `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;
      newFiles.push(mockUrl);
    }

    setUploading(false);
    setProgress(0);
    
    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    onUploadComplete(updatedFiles);
    
    toast.success(`${files.length} fichier${files.length > 1 ? 's' : ''} téléchargé${files.length > 1 ? 's' : ''} avec succès`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    onUploadComplete(newFiles);
    toast.info("Fichier supprimé");
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => document.getElementById("file-upload")?.click()}
            disabled={uploading}
          >
            Parcourir les fichiers
          </Button>
          <input
            id="file-upload"
            type="file"
            multiple
            accept={acceptedTypes}
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        
        {uploading && (
          <div className="mt-4">
            <Progress value={progress} className="h-2 mb-1" />
            <p className="text-xs text-muted-foreground">
              Téléchargement en cours... {Math.round(progress)}%
            </p>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground mt-4">
          Formats acceptés: {acceptedTypes.replace('*', 'tous')} • Max {maxFiles} fichiers
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Fichiers téléchargés ({uploadedFiles.length}/{maxFiles})</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="overflow-hidden group relative">
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <CardContent className="p-0">
                  <div className="aspect-square relative bg-gray-100">
                    <img 
                      src={file} 
                      alt={`Uploaded file ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Check className="h-8 w-8 text-white bg-primary/80 p-1.5 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {uploadedFiles.length < maxFiles && (
              <Button
                variant="outline"
                className="h-full min-h-24 aspect-square flex flex-col items-center justify-center gap-2 border-dashed"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Ajouter</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
