export interface FortuneRequest {
  name: string;
  dateOfBirth: string;
  question: string;
  lang?: "th" | "en";
}

export interface FortuneOutlook {
  summary: string;
  careerOutlook: string;
  financialOutlook: string;
  relationshipOutlook: string;
  generalAdvice: string;
}

export interface FortuneRecord {
  id?: string;
  userId?: string;
  name: string;
  dateOfBirth: string;
  question: string;
  response: FortuneOutlook;
  timestamp: string;
  createdAt?: Date;
}

export interface ApiFortuneResponse {
  success: boolean;
  data?: FortuneRecord;
  error?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
