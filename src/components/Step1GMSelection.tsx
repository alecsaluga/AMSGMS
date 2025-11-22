import React from 'react';
import { User } from 'lucide-react';

interface Step1Props {
  selectedGM: string;
  onSelectGM: (gm: string) => void;
  error?: string;
}

const GM_NAMES = [
  'Don Hill',
  'Mark Macy',
  'David Frank',
  'Paul Vaughn',
  'Dan Schrodel',
  'Dan Shanahan',
  'Brandon Cooley',
];

export const Step1GMSelection: React.FC<Step1Props> = ({
  selectedGM,
  onSelectGM,
  error,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Who is this for?</h2>
        <p className="text-muted-foreground">
          Select the general manager this automation is for
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {GM_NAMES.map((gm) => (
          <button
            key={gm}
            onClick={() => onSelectGM(gm)}
            className={`p-6 rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              selectedGM === gm
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className={`p-3 rounded-full ${
                  selectedGM === gm ? 'bg-primary/20' : 'bg-muted'
                }`}
              >
                <User
                  className={`w-6 h-6 ${
                    selectedGM === gm ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
              </div>
              <span
                className={`font-medium text-center ${
                  selectedGM === gm ? 'text-primary' : 'text-foreground'
                }`}
              >
                {gm}
              </span>
            </div>
          </button>
        ))}
      </div>

      {error && (
        <p className="text-destructive text-sm text-center mt-2">{error}</p>
      )}
    </div>
  );
};
