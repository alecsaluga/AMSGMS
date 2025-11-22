import React, { useRef, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AutomationEntry } from '../types';

interface Step3Props {
  automations: AutomationEntry[];
  onUpdateAutomation: (id: string, field: keyof AutomationEntry, value: string) => void;
  onAddAutomation: () => void;
  onRemoveAutomation: (id: string) => void;
  errors?: {
    [key: string]: {
      summary?: string;
      currentProcess?: string;
      desiredOutcome?: string;
    };
  };
}

export const Step3AutomationDetails: React.FC<Step3Props> = ({
  automations,
  onUpdateAutomation,
  onAddAutomation,
  onRemoveAutomation,
  errors,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAutomationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastAutomationRef.current && containerRef.current) {
      lastAutomationRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [automations.length]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          What are you trying to automate?
        </h2>
        <p className="text-muted-foreground">
          Tell us about the process(es) you'd like to automate
        </p>
      </div>

      <div
        ref={containerRef}
        className="space-y-6 max-h-[500px] overflow-y-auto px-2 py-1"
      >
        {automations.map((automation, index) => (
          <div
            key={automation.id}
            ref={index === automations.length - 1 ? lastAutomationRef : null}
            className="bg-gradient-to-br from-card to-card/50 border-2 border-primary/20 rounded-2xl p-6 shadow-lg space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  #{index + 1}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Automation Request
                </h3>
              </div>
              {automations.length > 1 && (
                <button
                  onClick={() => onRemoveAutomation(automation.id)}
                  className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                  title="Remove this automation"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Summary */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Short Summary <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Example: Automate daily revenue report emails"
                  value={automation.summary}
                  onChange={(e) =>
                    onUpdateAutomation(automation.id, 'summary', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {errors?.[automation.id]?.summary && (
                  <p className="text-destructive text-sm mt-1">
                    {errors[automation.id].summary}
                  </p>
                )}
              </div>

              {/* Current Process */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  How is this done today? <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Who does it, what tools are used, and how often?"
                  value={automation.currentProcess}
                  onChange={(e) =>
                    onUpdateAutomation(
                      automation.id,
                      'currentProcess',
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
                {errors?.[automation.id]?.currentProcess && (
                  <p className="text-destructive text-sm mt-1">
                    {errors[automation.id].currentProcess}
                  </p>
                )}
              </div>

              {/* Pain Points */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  What's painful about the current process?
                </label>
                <textarea
                  rows={3}
                  placeholder="Time-consuming, error-prone, manually copying data, etc."
                  value={automation.painPoints}
                  onChange={(e) =>
                    onUpdateAutomation(automation.id, 'painPoints', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              {/* Desired Outcome */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  What would a successful automation look like?{' '}
                  <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="What you'd love to happen automatically"
                  value={automation.desiredOutcome}
                  onChange={(e) =>
                    onUpdateAutomation(
                      automation.id,
                      'desiredOutcome',
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
                {errors?.[automation.id]?.desiredOutcome && (
                  <p className="text-destructive text-sm mt-1">
                    {errors[automation.id].desiredOutcome}
                  </p>
                )}
              </div>

              {/* Tools */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tools / Systems Involved
                </label>
                <input
                  type="text"
                  placeholder="Example: HubSpot, MoversSuite, Yembo, Outlook"
                  value={automation.tools}
                  onChange={(e) =>
                    onUpdateAutomation(automation.id, 'tools', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Another Button */}
      <div className="flex justify-center">
        <button
          onClick={onAddAutomation}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Another Automation Request
        </button>
      </div>
    </div>
  );
};
