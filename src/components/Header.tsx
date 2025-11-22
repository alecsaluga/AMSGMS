import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-primary/20 via-primary/10 to-transparent pb-8 pt-6 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4">
        {/* Logos */}
        <div className="flex items-center justify-center gap-6">
          <img
            src="/amslogo.png"
            alt="Alexander's Logo"
            className="h-16 object-contain"
          />
          <div className="h-16 w-px bg-primary/40"></div>
          <img
            src="/aerologo.png"
            alt="A-E-R-O Logo"
            className="h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
};
