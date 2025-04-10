import { useState } from 'react';
import { StudentData, StudentFormData, CardTemplateType } from '../types/student';
import { useLocalStorage } from '../hooks/useLocalStorage';
import StudentForm from '../components/StudentForm';
import CardPreview from '../components/CardPreview';
import HistoryPanel from '../components/HistoryPanel';

export default function Home() {
  const [storedCards, setStoredCards] = useLocalStorage('studentCards');
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplateType>('1');
  const [cardGenerated, setCardGenerated] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [currentStudentData, setCurrentStudentData] = useState<StudentData | null>(null);

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
  };

  const toggleHistoryPanel = () => {
    setShowHistoryPanel(!showHistoryPanel);
  };

  const loadStoredCard = (card: StudentData) => {
    setCurrentStudentData(card);
    setSelectedTemplate(card.template as CardTemplateType);
    setCardGenerated(true);
    setShowHistoryPanel(false);
  };

  return (
    <div className="min-h-screen text-gray-800 bg-[#F9FAFB]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Smart Student ID Generator</h1>
            {storedCards.length > 0 && (
              <button 
                className="text-sm text-gray-600 hover:text-primary flex items-center gap-1"
                onClick={toggleHistoryPanel}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                History
              </button>
            )}
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
    </div>
  );
}
