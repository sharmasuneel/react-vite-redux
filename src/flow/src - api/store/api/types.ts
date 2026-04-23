// Shared API types for all form submissions

export interface PaymentPayload {
  payee: string;
  amount: number;
  currency: string;
  paymentType: string;
  account: string;
  routing: string;
  department: string;
  reference: string;
  notes: string;
}

export interface RequestPayload {
  title: string;
  instructionType: string;
  priority: string;
  sun: string;
  department: string;
  team: string;
  description: string;
}

export interface SSIPayload {
  counterparty: string;
  settlementType: string;
  currency: string;
  effectiveDate: string;
  beneficiary: string;
  bic: string;
  accountNo: string;
  intermediary: string;
  notes: string;
}

export interface DocumentPayload {
  docTitle: string;
  category: string;
  reference: string;
  department: string;
  file: File | null;
  notes: string;
}

export interface CustomerPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  customerType: string;
  sun: string;
  department: string;
  address: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  id?: string;
}
