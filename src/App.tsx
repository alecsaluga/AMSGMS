import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from './components/Header';
import { Step1GMSelection } from './components/Step1GMSelection';
import { Step2DepartmentSelection } from './components/Step2DepartmentSelection';
import { Step3AutomationDetails } from './components/Step3AutomationDetails';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { FormData, FormErrors, AutomationEntry, SubmitPayload } from './types';

const WEBHOOK_URL =
  'https://n8n.alecautomations.com/webhook/5445a620-a5ee-456c-9ff0-83850c775d78';

const generateId = () => Math.random().toString(36).substr(2, 9);

const createEmptyAutomation = (): AutomationEntry => ({
  id: generateId(),
  summary: '',
  currentProcess: '',
  painPoints: '',
  desiredOutcome: '',
  tools: '',
});

const initialFormData: FormData = {
  selectedGM: '',
  department: '',
  customDepartment: '',
  automations: [createEmptyAutomation()],
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<SubmitPayload | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearAutomationError = (id: string, field: string) => {
    setErrors((prev) => {
      if (!prev.automations || !prev.automations[id]) return prev;
      const newErrors = { ...prev };
      const automationErrors = { ...newErrors.automations![id] };
      delete automationErrors[field as keyof typeof automationErrors];
      if (Object.keys(automationErrors).length === 0) {
        delete newErrors.automations![id];
        if (Object.keys(newErrors.automations!).length === 0) {
          delete newErrors.automations;
        }
      } else {
        newErrors.automations![id] = automationErrors;
      }
      return newErrors;
    });
  };

  const validateStep1 = (): boolean => {
    if (!formData.selectedGM) {
      setErrors({ selectedGM: 'Please select a general manager' });
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.department) {
      newErrors.department = 'Please select a department';
    } else if (
      formData.department === 'Other' &&
      !formData.customDepartment.trim()
    ) {
      newErrors.customDepartment = 'Please enter a department name';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    const automationErrors: FormErrors['automations'] = {};
    let hasErrors = false;

    formData.automations.forEach((automation) => {
      const errors: { summary?: string; currentProcess?: string; desiredOutcome?: string } = {};

      if (!automation.summary.trim()) {
        errors.summary = 'Summary is required';
        hasErrors = true;
      }
      if (!automation.currentProcess.trim()) {
        errors.currentProcess = 'Current process description is required';
        hasErrors = true;
      }
      if (!automation.desiredOutcome.trim()) {
        errors.desiredOutcome = 'Desired outcome is required';
        hasErrors = true;
      }

      if (Object.keys(errors).length > 0) {
        automationErrors[automation.id] = errors;
      }
    });

    if (hasErrors) {
      setErrors({ automations: automationErrors });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
      if (isValid) {
        handleSubmit();
        return;
      }
    }

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const payload: SubmitPayload = {
      name: formData.selectedGM,
      department:
        formData.department === 'Other'
          ? formData.customDepartment
          : formData.department,
      automations: formData.automations.map((a) => ({
        summary: a.summary,
        currentProcess: a.currentProcess,
        painPoints: a.painPoints,
        desiredOutcome: a.desiredOutcome,
        tools: a.tools,
      })),
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show confirmation even if webhook fails
    }

    setSubmittedData(payload);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setErrors({});
    setSubmittedData(null);
  };

  const handleSelectGM = (gm: string) => {
    setFormData({ ...formData, selectedGM: gm });
    clearError('selectedGM');
  };

  const handleSelectDepartment = (dept: string) => {
    setFormData({ ...formData, department: dept });
    clearError('department');
  };

  const handleCustomDepartmentChange = (value: string) => {
    setFormData({ ...formData, customDepartment: value });
    clearError('customDepartment');
  };

  const handleUpdateAutomation = (
    id: string,
    field: keyof AutomationEntry,
    value: string
  ) => {
    setFormData({
      ...formData,
      automations: formData.automations.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    });
    if (field !== 'painPoints' && field !== 'tools' && field !== 'id') {
      clearAutomationError(id, field);
    }
  };

  const handleAddAutomation = () => {
    setFormData({
      ...formData,
      automations: [...formData.automations, createEmptyAutomation()],
    });
  };

  const handleRemoveAutomation = (id: string) => {
    setFormData({
      ...formData,
      automations: formData.automations.filter((a) => a.id !== id),
    });
    // Clear errors for removed automation
    if (errors.automations?.[id]) {
      const newErrors = { ...errors };
      delete newErrors.automations![id];
      if (Object.keys(newErrors.automations!).length === 0) {
        delete newErrors.automations;
      }
      setErrors(newErrors);
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !formData.selectedGM;
    }
    if (currentStep === 2) {
      return (
        !formData.department ||
        (formData.department === 'Other' && !formData.customDepartment.trim())
      );
    }
    if (currentStep === 3) {
      return formData.automations.some(
        (a) =>
          !a.summary.trim() ||
          !a.currentProcess.trim() ||
          !a.desiredOutcome.trim()
      );
    }
    return false;
  };

  if (submittedData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ConfirmationScreen
            submittedData={submittedData}
            onReset={handleReset}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground font-medium">
            Step {currentStep} of 3
          </p>
          <div className="flex gap-2 justify-center mt-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 w-16 rounded-full transition-all duration-300 ${
                  step <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl mb-8">
          {currentStep === 1 && (
            <Step1GMSelection
              selectedGM={formData.selectedGM}
              onSelectGM={handleSelectGM}
              error={errors.selectedGM}
            />
          )}
          {currentStep === 2 && (
            <Step2DepartmentSelection
              department={formData.department}
              customDepartment={formData.customDepartment}
              onSelectDepartment={handleSelectDepartment}
              onCustomDepartmentChange={handleCustomDepartmentChange}
              errors={{
                department: errors.department,
                customDepartment: errors.customDepartment,
              }}
            />
          )}
          {currentStep === 3 && (
            <Step3AutomationDetails
              automations={formData.automations}
              onUpdateAutomation={handleUpdateAutomation}
              onAddAutomation={handleAddAutomation}
              onRemoveAutomation={handleRemoveAutomation}
              errors={errors.automations}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-card border-2 border-border text-foreground hover:border-primary hover:shadow-md'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={isNextDisabled() || isSubmitting}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isNextDisabled() || isSubmitting
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : currentStep === 3 ? (
              'Submit'
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
