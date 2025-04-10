import { useState } from 'react';
import { StudentData } from '../types/student';
import { Card, CardContent } from '@/components/ui/card';

interface HistoryPanelProps {
  storedCards: StudentData[];
  onCardSelect: (card: StudentData) => void;
  onClose: () => void;
}

export default function HistoryPanel({ 
  storedCards, 
  onCardSelect, 
  onClose 
}: HistoryPanelProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const downloadStoredCard = (card: StudentData, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real implementation, we would render the card and download it
    // Since we can't directly access the card ref here, we'll just select and show the card
    onCardSelect(card);
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Previously Generated Cards</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {storedCards.map((card, index) => (
          <div 
            key={`${card.id}-${index}`}
            className="border border-gray-200 rounded-md p-3 hover:shadow-md transition cursor-pointer"
            onClick={() => onCardSelect(card)}
          >
            <div className="mb-2 flex justify-between">
              <h3 className="font-medium text-sm">{card.name}</h3>
              <span className="text-xs text-gray-500">{formatDate(card.createdAt)}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">
              <span>{card.class}</span> • 
              <span>{` Roll #${card.rollNumber}`}</span>
            </div>
            <div className="flex justify-end mt-2">
              <button 
                className="text-xs text-primary hover:text-indigo-700"
                onClick={(e) => downloadStoredCard(card, e)}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
