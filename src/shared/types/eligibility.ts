export type CoverageStatus = 'active' | 'inactive' | 'terminated' | 'pending';
export type PlanType = 'HMO' | 'PPO' | 'EPO' | 'POS' | 'HDHP' | 'Medicare Advantage';

export interface EligibilityResult {
  memberId: string;
  memberName: string;
  dob: string;
  subscriberId: string;
  groupNumber: string;
  groupName: string;
  coverageStatus: CoverageStatus;
  planType: PlanType;
  planName: string;
  effectiveDate: string;
  terminationDate?: string;
  pcpName: string;
  pcpNpi: string;
  copay: {
    primaryCare: number;
    specialist: number;
    urgentCare: number;
    er: number;
  };
  deductible: {
    individual: number;
    individualMet: number;
    family: number;
    familyMet: number;
  };
  outOfPocketMax: {
    individual: number;
    individualMet: number;
    family: number;
    familyMet: number;
  };
  benefits: BenefitRow[];
}

export interface BenefitRow {
  category: string;
  inNetwork: string;
  outOfNetwork: string;
  authRequired: boolean;
  notes?: string;
}
