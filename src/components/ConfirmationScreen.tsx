import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SubmitPayload } from '../types';

interface ConfirmationScreenProps {
  submittedData: SubmitPayload;
  onReset: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  submittedData,
  onReset,
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
      </div>

      {/* Title and Message */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Request Submitted!</h2>
        <p className="text-muted-foreground">
          Thanks! Your automation request
          {submittedData.automations.length > 1 ? 's have' : ' has'} been
          submitted to Bev.
        </p>
      </div>

      {/* Summary */}
      <div className="max-h-[500px] overflow-y-auto px-2">
        <div className="bg-card border-2 border-border rounded-lg p-6 space-y-6">
          {/* Metadata */}
          <div className="space-y-2 pb-4 border-b border-border">
            <div className="flex gap-2">
              <span className="font-semibold text-foreground">Submitted by:</span>
              <span className="text-muted-foreground">{submittedData.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground">Department:</span>
              <span className="text-muted-foreground">
                {submittedData.department}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground">Submitted at:</span>
              <span className="text-muted-foreground">
                {new Date(submittedData.submittedAt).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Automation Requests */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-foreground">
              Automation Request{submittedData.automations.length > 1 ? 's' : ''}:
            </h3>
            {submittedData.automations.map((automation, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg p-5 space-y-3 border border-border"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    #{index + 1}
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {automation.summary}
                  </h4>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Current Process:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {automation.currentProcess}
                    </p>
                  </div>

                  {automation.painPoints && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Pain Points:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {automation.painPoints}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Desired Outcome:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {automation.desiredOutcome}
                    </p>
                  </div>

                  {automation.tools && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Tools/Systems:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {automation.tools}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
        >
          Submit Another Request
        </button>
      </div>
    </div>
  );
};
