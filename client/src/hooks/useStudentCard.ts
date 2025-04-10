import { useState, useEffect } from "react";
import { Student, SavedCard } from "../types";
import { nanoid } from "nanoid";

export function useStudentCard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load saved cards from localStorage on initial render
  useEffect(() => {
    const storedCards = localStorage.getItem("savedCards");
    if (storedCards) {
      setSavedCards(JSON.parse(storedCards));
    }
  }, []);

  // Save student data and create a card
  const saveStudentCard = (data: Student) => {
    setStudent(data);
  };

  // Toggle between template 1 and template 2
  const toggleTemplate = () => {
    setCurrentTemplate(currentTemplate === 1 ? 2 : 1);
  };

  // Save card to localStorage
  const saveCardToLocalStorage = (studentData: Student) => {
    const newCard: SavedCard = {
      ...studentData,
      template: currentTemplate,
      timestamp: new Date().toISOString(),
      id: nanoid()
    };

    const updatedCards = [...savedCards, newCard];
    setSavedCards(updatedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));
    
    return newCard;
  };

  // Delete a saved card
  const deleteCard = (id: string) => {
    const updatedCards = savedCards.filter(card => card.id !== id);
    setSavedCards(updatedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));
  };

  // Clear all saved cards
  const clearAllCards = () => {
    setSavedCards([]);
    localStorage.removeItem("savedCards");
  };

  // Open and close the saved cards modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    student,
    savedCards,
    currentTemplate,
    isModalOpen,
    saveStudentCard,
    toggleTemplate,
    saveCardToLocalStorage,
    deleteCard,
    clearAllCards,
    openModal,
    closeModal
  };
}
