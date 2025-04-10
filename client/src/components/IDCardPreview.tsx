import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Student } from "../types";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import CardTemplate1 from "./CardTemplate1";
import CardTemplate2 from "./CardTemplate2";
import { useToast } from "@/hooks/use-toast";

interface IDCardPreviewProps {
  student: Student | null;
  currentTemplate: number;
  onToggleTemplate: () => void;
  onSaveCard: (student: Student) => void;
}

const IDCardPreview: React.FC<IDCardPreviewProps> = ({
  student,
  currentTemplate,
  onToggleTemplate,
  onSaveCard
}) => {
  const toast = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleDownload = async () => {
    if (!student) return;
    
    try {
      if (cardRef.current) {
        const dataUrl = await toPng(cardRef.current, { quality: 0.95 });
        
        // Create link and trigger download
        const link = document.createElement('a');
        link.download = `${student.name.replace(/\s+/g, '_')}_ID_Card.png`;
        link.href = dataUrl;
        link.click();
        
        // Save to localStorage
        onSaveCard(student);
        
        toast.toast({
          title: "Success!",
          description: "ID Card downloaded and saved successfully",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">ID Card Preview</h2>
        
        {/* Template Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Template:</span>
          <Switch 
            checked={currentTemplate === 2}
            onCheckedChange={onToggleTemplate}
            id="template-switch"
          />
          <span className="text-sm font-medium text-gray-700">
            Template {currentTemplate}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        {student ? (
          <>
            {/* Template 1 */}
            {currentTemplate === 1 && (
              <CardTemplate1 student={student} cardRef={cardRef} />
            )}
            
            {/* Template 2 */}
            {currentTemplate === 2 && (
              <CardTemplate2 student={student} cardRef={cardRef} />
            )}
            
            <div className="mt-6 flex justify-center w-full">
              <Button 
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-secondary text-white rounded-md font-medium hover:bg-emerald-600 transition-colors"
              >
                <i className="fas fa-download mr-2"></i> Download as PNG
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 w-full max-w-sm bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <i className="fas fa-id-card text-gray-300 text-5xl mb-4"></i>
            <p className="text-gray-500">Fill the form and submit to generate ID card</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IDCardPreview;
