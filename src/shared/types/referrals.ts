export type ReferralStatus = 'pending' | 'approved' | 'denied' | 'completed' | 'expired' | 'in-review';

export interface Referral {
  id: string;
  referralNumber: string;
  memberId: string;
  memberName: string;
  referringProvider: string;
  referringNpi: string;
  referredToProvider: string;
  referredToNpi: string;
  specialty: string;
  status: ReferralStatus;
  requestDate: string;
  approvalDate?: string;
  expirationDate?: string;
  authorizedVisits: number;
  usedVisits: number;
  diagnosisCode: string;
  diagnosisDescription: string;
  notes?: string;
  urgency: 'routine' | 'urgent';
}
