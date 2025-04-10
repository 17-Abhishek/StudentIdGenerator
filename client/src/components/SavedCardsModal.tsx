import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SavedCard } from "../types";
import { toPng } from "html-to-image";
import { useToast } from "@/hooks/use-toast";

interface SavedCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCards: SavedCard[];
  onDeleteCard: (id: string) => void;
  onClearAllCards: () => void;
}

const SavedCardsModal: React.FC<SavedCardsModalProps> = ({
  isOpen,
  onClose,
  savedCards,
  onDeleteCard,
  onClearAllCards
}) => {
  const toast = useToast();
  const cardRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());

  const handleDownload = async (card: SavedCard) => {
    try {
      const cardElement = cardRefs.current.get(card.id);
      if (cardElement) {
        const dataUrl = await toPng(cardElement, { quality: 0.95 });
        
        // Create link and trigger download
        const link = document.createElement('a');
        link.download = `${card.name.replace(/\s+/g, '_')}_ID_Card.png`;
        link.href = dataUrl;
        link.click();
        
        toast.toast({
          title: "Success!",
          description: "ID Card downloaded successfully",
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

  const setCardRef = (id: string, el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Saved ID Cards</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-auto py-4 flex-grow">
          {savedCards.length === 0 ? (
            <div className="text-center py-8">
              <i className="fas fa-id-card text-gray-300 text-5xl mb-4"></i>
              <p className="text-gray-500">No saved ID cards found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCards.map((card) => (
                <div key={card.id} className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-primary py-2 px-4 text-white">
                    <h4 className="font-semibold">{card.name}</h4>
                    <p className="text-xs">Class {card.class} {card.division} | {card.rollNumber}</p>
                  </div>
                  
                  <div className="p-3">
                    <p className="text-xs text-gray-500 mb-2">
                      Created: {formatDate(card.timestamp)}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      Template: {card.template}
                    </p>
                    
                    <div className="hidden">
                      {card.template === 1 ? (
                        <div 
                          ref={(el) => setCardRef(card.id, el)} 
                          className="w-full max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200"
                        >
                          <div className="bg-primary py-4 px-6 text-white text-center">
                            <h3 className="text-lg font-bold">UNITY SCHOOL</h3>
                            <p className="text-xs uppercase tracking-wider">Student Identification Card</p>
                          </div>
                          
                          <div className="p-6 flex flex-col items-center">
                            <div className="w-32 h-40 bg-gray-100 border border-gray-200 rounded-md overflow-hidden mb-4">
                              {card.photo ? (
                                <img 
                                  src={card.photo} 
                                  alt="Student Photo" 
                                  className="w-full h-full object-cover" 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <i className="fas fa-user text-gray-400 text-3xl"></i>
                                </div>
                              )}
                            </div>
                            
                            <div className="text-center w-full mb-4">
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{card.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {card.rollNumber} | Class {card.class} {card.division}
                              </p>
                              
                              <div className="flex flex-wrap justify-center mt-2 gap-1">
                                {card.allergies.map((allergy, index) => (
                                  <span 
                                    key={index} 
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                  >
                                    <i className="fas fa-exclamation-circle mr-1"></i> {allergy}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 w-full text-sm">
                              <div className="bg-gray-50 p-2 rounded">
                                <p className="text-gray-500 text-xs mb-1">Rack Number</p>
                                <p className="font-medium">{card.rackNumber}</p>
                              </div>
                              <div className="bg-gray-50 p-2 rounded">
                                <p className="text-gray-500 text-xs mb-1">Bus Route</p>
                                <p className="font-medium">{card.busRoute}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-100 py-3 px-6 text-center text-xs text-gray-600">
                            <p>&copy; {new Date().getFullYear()} Unity School. This ID is property of the school.</p>
                            <p>If found, please return to Unity School Administration.</p>
                          </div>
                        </div>
                      ) : (
                        <div 
                          ref={(el) => setCardRef(card.id, el)} 
                          className="w-full max-w-sm mx-auto bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg overflow-hidden shadow-lg"
                        >
                          <div className="flex p-4">
                            <div className="bg-white rounded-lg p-2 shadow-md">
                              <h3 className="text-lg font-bold text-indigo-700">UNITY</h3>
                              <p className="text-xs text-indigo-500 font-semibold">SCHOOL</p>
                            </div>
                            <div className="ml-auto text-right">
                              <h3 className="text-lg font-bold text-white">STUDENT ID</h3>
                              <p className="text-xs text-white/80 font-medium">#{card.rollNumber.replace('R-', '')}</p>
                            </div>
                          </div>
                          
                          <div className="p-6 pt-2 flex">
                            <div className="w-28 h-36 bg-white rounded-lg overflow-hidden shadow-md mr-4">
                              {card.photo ? (
                                <img 
                                  src={card.photo} 
                                  alt="Student Photo" 
                                  className="w-full h-full object-cover" 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <i className="fas fa-user text-gray-400 text-3xl"></i>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3">
                                <h3 className="text-xl font-bold text-white">{card.name}</h3>
                                <div className="flex items-center mt-1">
                                  <div className="bg-white/20 rounded-md px-2 py-0.5">
                                    <p className="text-xs text-white">{card.rollNumber}</p>
                                  </div>
                                  <div className="mx-2 text-white/60">|</div>
                                  <div className="bg-white/20 rounded-md px-2 py-0.5">
                                    <p className="text-xs text-white">Class {card.class} {card.division}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col space-y-2">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center">
                                  <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
                                    <i className="fas fa-bookmark text-indigo-600 text-xs"></i>
                                  </div>
                                  <div>
                                    <p className="text-white/80 text-xs">Rack Number</p>
                                    <p className="text-white text-sm font-medium">{card.rackNumber}</p>
                                  </div>
                                </div>
                                
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center">
                                  <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
                                    <i className="fas fa-bus text-indigo-600 text-xs"></i>
                                  </div>
                                  <div>
                                    <p className="text-white/80 text-xs">Bus Route</p>
                                    <p className="text-white text-sm font-medium">{card.busRoute}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="px-6 mb-4">
                            {card.allergies.map((allergy, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center mr-2 mb-2 px-2 py-0.5 rounded-full text-xs font-medium bg-white/90 text-red-600"
                              >
                                <i className="fas fa-exclamation-circle mr-1"></i> {allergy}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm">
                            <div className="bg-white p-2 rounded-md">
                              {/* QR code would go here but not needed for the screenshot */}
                              <div className="w-20 h-20 bg-white"></div>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-xs text-white/80">Unity School</p>
                              <p className="text-xs text-white/60">123 Education St., Knowledge City</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-3">
                      <Button 
                        onClick={() => handleDownload(card)}
                        variant="outline" 
                        size="sm" 
                        className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        <i className="fas fa-download text-xs mr-1"></i> Download
                      </Button>
                      <Button 
                        onClick={() => onDeleteCard(card.id)}
                        variant="outline" 
                        size="sm" 
                        className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        <i className="fas fa-trash text-xs mr-1"></i> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between items-center border-t bg-gray-50 p-4">
          <Button 
            onClick={onClearAllCards}
            variant="outline"
            className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
            disabled={savedCards.length === 0}
          >
            <i className="fas fa-trash-alt mr-2"></i> Clear All Saved Cards
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SavedCardsModal;
