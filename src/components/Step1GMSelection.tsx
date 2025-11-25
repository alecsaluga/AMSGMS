import { User, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Step1Props {
  selectedGM: string;
  onSelectGM: (gm: string) => void;
  error?: string;
}

const PERSON_NAMES = [
  'Don Hill',
  'Mark Macy',
  'David Frank',
  'Paul Vaughn',
  'Dan Schrodel',
  'Dan Shanahan',
  'Brandon Cooley',
  'Greg Klott',
  'Jen Stanko',
  'Pam Deen-Hergen',
  'Dave Cook',
  'Matt Harms',
  'Bev Peabody',
  'Other',
];

export const Step1GMSelection = ({
  selectedGM,
  onSelectGM,
  error,
}: Step1Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOtherPopup, setShowOtherPopup] = useState(false);
  const [otherName, setOtherName] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (person: string) => {
    if (person === 'Other') {
      setShowOtherPopup(true);
      setIsOpen(false);
    } else {
      onSelectGM(person);
      setIsOpen(false);
    }
  };

  const handleOtherSubmit = () => {
    if (otherName.trim()) {
      onSelectGM(otherName.trim());
      setShowOtherPopup(false);
      setOtherName('');
    }
  };

  const displayValue = selectedGM || 'Select a person';

  return (
    <>
      <div className="space-y-6 animate-fade-in px-4 sm:px-0">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Who is submitting this request?</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Please choose your own name from the list below.
          </p>
        </div>

        <div className="max-w-md mx-auto relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border-2 border-border bg-card text-foreground hover:border-primary/50 transition-all duration-200 flex items-center justify-between group hover:shadow-lg active:scale-98"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="p-2 rounded-full bg-muted group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className={`font-medium text-sm sm:text-base truncate ${selectedGM ? 'text-foreground' : 'text-muted-foreground'}`}>
                {displayValue}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-2 py-2 rounded-lg border-2 border-border bg-card shadow-xl max-h-60 sm:max-h-80 overflow-y-auto animate-fade-in">
              {PERSON_NAMES.map((person) => (
                <button
                  key={person}
                  onClick={() => handleSelect(person)}
                  className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 text-left text-sm sm:text-base hover:bg-primary/10 transition-colors active:bg-primary/20 ${
                    selectedGM === person ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
                  } ${person === 'Other' ? 'border-t-2 border-border mt-1 pt-3' : ''}`}
                >
                  {person}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p className="text-destructive text-sm text-center mt-2">{error}</p>
          )}
        </div>
      </div>

      {showOtherPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-card border-2 border-border rounded-lg p-4 sm:p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Enter Name</h3>
            <input
              type="text"
              value={otherName}
              onChange={(e) => setOtherName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleOtherSubmit()}
              placeholder="Enter person's name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 mb-3 sm:mb-4"
              autoFocus
            />
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setShowOtherPopup(false);
                  setOtherName('');
                }}
                className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border-2 border-border bg-card text-foreground hover:bg-muted transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleOtherSubmit}
                disabled={!otherName.trim()}
                className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
