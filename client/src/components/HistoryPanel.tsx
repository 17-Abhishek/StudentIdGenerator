import { useState, useRef } from 'react';
import { StudentData } from '../types/student';
import CardTemplate from './CardTemplate';
import { Button } from '@/components/ui/button';
import * as htmlToImage from 'html-to-image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

interface HistoryPanelProps {
  storedCards: StudentData[];
  onCardSelect: (card: StudentData) => void;
  onClose: () => void;
  onDeleteCard?: (id: string) => void;
}

export default function HistoryPanel({ 
  storedCards, 
  onCardSelect, 
  onClose,
  onDeleteCard
}: HistoryPanelProps) {
  const [selectedCard, setSelectedCard] = useState<StudentData | null>(null);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCardSelect = (card: StudentData) => {
    onCardSelect(card);
  };

  const previewCard = (card: StudentData, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedCard(card);
    setShowPreview(true);
  };

  const confirmDeleteCard = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setCardToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteCard = () => {
    if (cardToDelete && onDeleteCard) {
      onDeleteCard(cardToDelete);
      setCardToDelete(null);
      setShowDeleteConfirm(false);
      
      toast({
        title: "Card Deleted",
        description: "The ID card has been removed from your history.",
        variant: "destructive",
      });
    }
  };

  const downloadCard = () => {
    if (!cardRef.current || !selectedCard) return;

    htmlToImage
      .toPng(cardRef.current, { quality: 1.0, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        const studentName = selectedCard.name.replace(/\s+/g, '_').toLowerCase() || 'student';
        link.download = `${studentName}_id_card.png`;
        link.href = dataUrl;
        link.click();
        
        toast({
          title: "Download Started",
          description: "Your ID card image is being downloaded.",
        });
      })
      .catch((error) => {
        console.error('Error generating image:', error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading the ID card image.",
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <Card className="mb-8 bg-white rounded-lg shadow animate-in fade-in">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Saved ID Cards ({storedCards.length})</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500">Select a card to load it in the editor, or preview to download it directly.</p>
        </CardHeader>
        
        <CardContent>
          {storedCards.length === 0 ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <h3 className="text-lg font-medium text-gray-500 mb-1">No saved cards</h3>
              <p className="text-gray-400 text-sm">Generated ID cards will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {storedCards.map((card, index) => (
                <Card 
                  key={`${card.id}-${index}`}
                  className="border hover:shadow-md transition cursor-pointer relative"
                >
                  <CardContent className="p-4" onClick={() => handleCardSelect(card)}>
                    <div className="mb-2 flex justify-between items-start">
                      <h3 className="font-medium text-base truncate">{card.name}</h3>
                      <Badge variant="outline" className="ml-2">
                        Template {card.template}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-2">
                      <div><span className="font-medium">Class:</span> {card.class}-{card.division}</div>
                      <div><span className="font-medium">Roll #:</span> {card.rollNumber}</div>
                      <div><span className="font-medium">ID:</span> {card.id}</div>
                      <div><span className="font-medium">Date:</span> {formatDate(card.createdAt)}</div>
                    </div>
                    
                    {card.allergies && card.allergies.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs font-medium">Allergies: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {card.allergies.map((allergy, i) => (
                            <Badge 
                              key={`${allergy}-${i}`} 
                              variant="secondary" 
                              className="text-xs"
                            >
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex justify-between p-3 pt-1 border-t">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleCardSelect(card)}
                      className="text-xs"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Load
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs h-8 px-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => previewCard(card, e as React.MouseEvent)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          Preview
                        </DropdownMenuItem>
                        {onDeleteCard && (
                          <DropdownMenuItem 
                            onClick={(e) => confirmDeleteCard(card.id, e as React.MouseEvent)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Card Preview</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-2">
            {selectedCard && (
              <CardTemplate 
                studentData={selectedCard} 
                templateVersion={selectedCard.template as '1' | '2'} 
                cardRef={cardRef}
              />
            )}
            
            <div className="mt-4 w-full flex justify-center">
              <Button 
                onClick={downloadCard} 
                className="flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download as PNG
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this card?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this ID card from your saved history.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCardToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCard} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
