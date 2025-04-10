import React from "react";

interface HeaderProps {
  onOpenSavedCards: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSavedCards }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Smart Student ID Generator</h1>
          <div className="flex space-x-2">
            <button 
              onClick={onOpenSavedCards}
              className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200 transition-colors"
            >
              <i className="fas fa-id-card mr-1"></i> Saved Cards
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
