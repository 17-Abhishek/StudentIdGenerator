import { useState } from 'react';
import { StudentData, StudentFormData, CardTemplateType } from '../types/student';
import { useLocalStorage } from '../hooks/useLocalStorage';
import StudentForm from '../components/StudentForm';
import CardPreview from '../components/CardPreview';
import HistoryPanel from '../components/HistoryPanel';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [storedCards, setStoredCards] = useLocalStorage('studentCards');
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplateType>('1');
  const [cardGenerated, setCardGenerated] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [currentStudentData, setCurrentStudentData] = useState<StudentData | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const { toast } = useToast();

  const generateCard = (formData: StudentFormData) => {
    const newCard: StudentData = {
      ...formData,
      id: 'UNI-' + Math.floor(100000 + Math.random() * 900000),
      template: selectedTemplate,
      createdAt: new Date().toISOString()
    };

    setCurrentStudentData(newCard);
    setCardGenerated(true);

    // Save to localStorage
    setStoredCards([...storedCards, newCard]);
    
    toast({
      title: "ID Card Generated",
      description: "The ID card has been successfully generated and saved.",
    });
  };

  const toggleHistoryPanel = () => {
    setShowHistoryPanel(!showHistoryPanel);
  };

  const loadStoredCard = (card: StudentData) => {
    setCurrentStudentData(card);
    setSelectedTemplate(card.template as CardTemplateType);
    setCardGenerated(true);
    setShowHistoryPanel(false);
    
    toast({
      title: "Card Loaded",
      description: "The saved card has been loaded in the editor.",
    });
  };
  
  const deleteCard = (id: string) => {
    const updatedCards = storedCards.filter(card => card.id !== id);
    setStoredCards(updatedCards);
    
    toast({
      title: "Card Deleted",
      description: "The ID card has been deleted from your history.",
      variant: "destructive",
    });
  };
  
  const clearAllCards = () => {
    setStoredCards([]);
    setShowClearConfirm(false);
    
    toast({
      title: "History Cleared",
      description: "All saved ID cards have been cleared from your history.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen text-gray-800 bg-[#F9FAFB]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Smart Student ID Generator</h1>
            <div className="flex items-center gap-4">
              {storedCards.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-sm flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      </svg>
                      History ({storedCards.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={toggleHistoryPanel}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      View Saved Cards
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => setShowClearConfirm(true)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Clear All History
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* History Panel */}
        {showHistoryPanel && (
          <HistoryPanel 
            storedCards={storedCards}
            onCardSelect={loadStoredCard}
            onClose={toggleHistoryPanel}
            onDeleteCard={deleteCard}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <StudentForm 
            onSubmit={generateCard} 
            selectedTemplate={selectedTemplate} 
            onTemplateChange={setSelectedTemplate}
          />
          
          {/* Preview Section */}
          <CardPreview 
            studentData={currentStudentData}
            cardGenerated={cardGenerated}
            selectedTemplate={selectedTemplate}
          />
        </div>
      </main>
      
      {/* Confirmation Dialog for Clearing History */}
      <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All History?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your saved ID cards from local storage.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearAllCards} className="bg-red-600 hover:bg-red-700">
              Yes, Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
