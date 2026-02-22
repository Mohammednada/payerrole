export type ClaimStatus = 'submitted' | 'in-process' | 'paid' | 'denied' | 'adjusted' | 'pending-info' | 'appealed';
export type ClaimType = 'professional' | 'institutional' | 'dental' | 'pharmacy';

export interface Claim {
  id: string;
  claimNumber: string;
  memberId: string;
  memberName: string;
  providerName: string;
  providerNpi: string;
  status: ClaimStatus;
  type: ClaimType;
  serviceDate: string;
  submittedDate: string;
  processedDate?: string;
  paidDate?: string;
  billedAmount: number;
  allowedAmount: number;
  paidAmount: number;
  patientResponsibility: number;
  adjustmentAmount: number;
  diagnosisCodes: string[];
  lineItems: ClaimLineItem[];
  adjustments: ClaimAdjustment[];
  eobUrl?: string;
  remittanceId?: string;
}

export interface ClaimLineItem {
  lineNumber: number;
  cptCode: string;
  description: string;
  serviceDate: string;
  units: number;
  billedAmount: number;
  allowedAmount: number;
  paidAmount: number;
  adjustmentReason?: string;
}

export interface ClaimAdjustment {
  code: string;
  reason: string;
  amount: number;
  group: 'CO' | 'PR' | 'OA' | 'PI';
}
