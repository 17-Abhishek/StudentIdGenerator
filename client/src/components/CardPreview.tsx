import { useRef } from 'react';
import { StudentData } from '../types/student';
import CardTemplate from './CardTemplate';
import { Button } from '@/components/ui/button';
import * as htmlToImage from 'html-to-image';

interface CardPreviewProps {
  studentData: StudentData | null;
  cardGenerated: boolean;
  selectedTemplate: '1' | '2';
}

export default function CardPreview({ 
  studentData, 
  cardGenerated,
  selectedTemplate 
}: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = () => {
    if (!cardRef.current) return;

    htmlToImage
      .toPng(cardRef.current, { quality: 1.0, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        const studentName = studentData?.name.replace(/\s+/g, '_').toLowerCase() || 'student';
        link.download = `${studentName}_id_card.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  };

  return (
    <section>
      <div className="sticky top-8">
        <h2 className="text-xl font-semibold mb-6">ID Card Preview</h2>
        
        {!cardGenerated && (
          <div className="rounded-lg bg-white border-2 border-dashed border-gray-300 flex items-center justify-center shadow-sm mx-auto"
               style={{ width: '350px', height: '540px' }}>
            <div className="text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No Preview Available</h3>
              <p className="text-gray-500 text-sm mb-3">Fill out the form and submit to generate your ID card</p>
            </div>
          </div>
        )}
        
        {cardGenerated && studentData && (
          <CardTemplate 
            studentData={studentData} 
            templateVersion={selectedTemplate} 
            cardRef={cardRef}
          />
        )}
        
        {cardGenerated && studentData && (
          <div className="mt-6 text-center">
            <Button 
              onClick={downloadCard} 
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download as PNG
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
