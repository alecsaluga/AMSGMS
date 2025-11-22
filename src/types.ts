export interface AutomationEntry {
  id: string;
  summary: string;
  currentProcess: string;
  painPoints: string;
  desiredOutcome: string;
  tools: string;
}

export interface FormData {
  selectedGM: string;
  department: string;
  customDepartment: string;
  automations: AutomationEntry[];
}

export interface FormErrors {
  selectedGM?: string;
  department?: string;
  customDepartment?: string;
  automations?: {
    [key: string]: {
      summary?: string;
      currentProcess?: string;
      desiredOutcome?: string;
    };
  };
}

export interface SubmitPayload {
  name: string;
  department: string;
  automations: {
    summary: string;
    currentProcess: string;
    painPoints: string;
    desiredOutcome: string;
    tools: string;
  }[];
  submittedAt: string;
}
