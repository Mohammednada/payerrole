export type PaStatus = 'pending' | 'in-review' | 'approved' | 'denied' | 'cancelled' | 'expired' | 'info-requested';
export type PaUrgency = 'standard' | 'urgent' | 'emergent';
export type PaType = 'inpatient' | 'outpatient' | 'pharmacy' | 'imaging' | 'DME' | 'home-health';

export interface PriorAuth {
  id: string;
  authNumber: string;
  memberId: string;
  memberName: string;
  providerName: string;
  providerNpi: string;
  status: PaStatus;
  urgency: PaUrgency;
  type: PaType;
  serviceCode: string;
  serviceDescription: string;
  diagnosisCode: string;
  diagnosisDescription: string;
  requestDate: string;
  reviewDate?: string;
  decisionDate?: string;
  expirationDate?: string;
  estimatedCost: number;
  notes: string[];
  documents: PaDocument[];
  timeline: PaTimelineEvent[];
  typeDetails?: PaTypeDetails;
}

export interface PaDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

export interface PaTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  user?: string;
}

/* ------------------------------------------------------------------ */
/*  Type-specific detail interfaces                                    */
/* ------------------------------------------------------------------ */

export interface InpatientDetails {
  type: 'inpatient';
  admissionDate: string;
  estimatedLOS: number;
  bedType: 'medical-surgical' | 'icu' | 'step-down' | 'rehab';
  attendingPhysician: string;
  facilityName: string;
}

export interface OutpatientDetails {
  type: 'outpatient';
  procedureCode: string;
  facilityType: 'ambulatory' | 'hospital-outpatient' | 'office';
  anesthesiaRequired: boolean;
  followUpPlan: string;
}

export interface PharmacyDetails {
  type: 'pharmacy';
  ndcCode: string;
  drugName: string;
  dosage: string;
  quantityRequested: number;
  daysSupply: number;
  pharmacyNpi: string;
}

export interface ImagingDetails {
  type: 'imaging';
  modality: 'MRI' | 'CT' | 'PET' | 'Ultrasound' | 'X-Ray' | 'Nuclear';
  bodyPart: string;
  contrastRequired: boolean;
  clinicalIndication: string;
  orderingProvider: string;
}

export interface DmeDetails {
  type: 'DME';
  hcpcsCode: string;
  itemDescription: string;
  rentalOrPurchase: 'rental' | 'purchase';
  durationMonths: number;
  cmnRequired: boolean;
}

export interface HomeHealthDetails {
  type: 'home-health';
  visitFrequency: string;
  discipline: ('skilled-nursing' | 'pt' | 'ot' | 'speech' | 'msw' | 'aide')[];
  homeboundStatus: boolean;
  certificationPeriodStart: string;
  certificationPeriodEnd: string;
}

export type PaTypeDetails =
  | InpatientDetails
  | OutpatientDetails
  | PharmacyDetails
  | ImagingDetails
  | DmeDetails
  | HomeHealthDetails;

/* ------------------------------------------------------------------ */
/*  Document requirements                                              */
/* ------------------------------------------------------------------ */

export interface PaDocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  templateAvailable?: boolean;
  templateName?: string;
  fileFormat?: string;
}

export interface DocumentChecklistItem {
  requirementId: string;
  uploaded: boolean;
  fileName?: string;
}

/* ------------------------------------------------------------------ */
/*  Eligibility check                                                  */
/* ------------------------------------------------------------------ */

export interface PaEligibilityCheck {
  checked: boolean;
  eligible: boolean;
  coverageStatus: 'active' | 'inactive' | 'terminated' | 'pending';
  planName: string;
  authRequired: boolean;
  benefitNote?: string;
  deductibleMet: number;
  deductibleMax: number;
}

/* ------------------------------------------------------------------ */
/*  PA Guidelines / Criteria                                           */
/* ------------------------------------------------------------------ */

export interface PaCriterion {
  id: string;
  description: string;
  required: boolean;
}

export interface PaTypeGuideline {
  type: PaType;
  label: string;
  description: string;
  turnaroundStandard: string;
  turnaroundUrgent: string;
  turnaroundEmergent: string;
  clinicalCriteria: PaCriterion[];
  requiredFields: string[];
  tips: string[];
  /** Pharmacy sub-categories (only present when type === 'pharmacy') */
  drugCategories?: PharmacyDrugGuideline[];
  /** Criteria broken into categories */
  criteriaCategories?: CriteriaCategory[];
  /** Clinical pathway decision flow */
  clinicalPathway?: PathwayStep[];
  /** Coverage rules and limitations */
  coverageRules?: CoverageRules;
  /** UHC policy references */
  policyReferences?: PolicyReference[];
  /** Qualifying ICD-10/CPT/HCPCS codes */
  qualifyingCodes?: QualifyingCodes;
  /** Appeal process levels */
  appealProcess?: AppealLevel[];
}

/* ------------------------------------------------------------------ */
/*  Criteria categories                                                */
/* ------------------------------------------------------------------ */

export interface CriteriaCategory {
  name: string;
  icon: 'medical' | 'document' | 'network' | 'utilization' | 'coding';
  criteria: PaCriterion[];
}

/* ------------------------------------------------------------------ */
/*  Clinical pathway / decision tree                                   */
/* ------------------------------------------------------------------ */

export interface PathwayStep {
  id: string;
  label: string;
  description: string;
  type: 'start' | 'decision' | 'action' | 'outcome';
  yesNext?: string;
  noNext?: string;
  nextStep?: string;
  outcome?: 'approved' | 'denied' | 'peer-review' | 'info-requested';
}

/* ------------------------------------------------------------------ */
/*  Coverage rules & limitations                                       */
/* ------------------------------------------------------------------ */

export interface CoverageRules {
  maxUnits?: string;
  maxDollar?: string;
  renewalPeriod?: string;
  authValidityPeriod?: string;
  ageRestrictions?: string[];
  genderRestrictions?: string[];
  exclusions: string[];
  inNetworkRules: string;
  outOfNetworkRules: string;
  preExistingConditions?: string;
  concurrentReview?: string;
  retrospectiveReview?: string;
}

/* ------------------------------------------------------------------ */
/*  Policy references                                                  */
/* ------------------------------------------------------------------ */

export interface PolicyReference {
  policyNumber: string;
  title: string;
  effectiveDate: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Qualifying codes                                                   */
/* ------------------------------------------------------------------ */

export interface QualifyingCodes {
  icd10: { code: string; description: string }[];
  cpt?: { code: string; description: string }[];
  hcpcs?: { code: string; description: string }[];
}

/* ------------------------------------------------------------------ */
/*  Appeal process                                                     */
/* ------------------------------------------------------------------ */

export interface AppealLevel {
  level: number;
  name: string;
  timeline: string;
  description: string;
  requirements: string[];
}

/* ------------------------------------------------------------------ */
/*  Pharmacy drug sub-categories                                       */
/* ------------------------------------------------------------------ */

export type PharmacyDrugCategory =
  | 'specialty'
  | 'non-formulary'
  | 'controlled-substance'
  | 'oncology'
  | 'step-therapy-exception'
  | 'quantity-limit-override';

export interface PharmacyDrugGuideline {
  category: PharmacyDrugCategory;
  label: string;
  description: string;
  examples: string[];
  turnaround: string;
  clinicalCriteria: PaCriterion[];
  requiredDocuments: PaDocumentRequirement[];
  requiredFields: string[];
  tips: string[];
}

/* ------------------------------------------------------------------ */
/*  Wizard data                                                        */
/* ------------------------------------------------------------------ */

export interface PaWizardData {
  memberInfo: {
    memberId: string;
    memberName: string;
    dob: string;
    subscriberId: string;
  };
  serviceInfo: {
    type: PaType;
    urgency: PaUrgency;
    serviceCode: string;
    serviceDescription: string;
    diagnosisCode: string;
    diagnosisDescription: string;
    startDate: string;
    endDate: string;
    quantity: number;
  };
  eligibilityCheck?: PaEligibilityCheck;
  typeDetails?: PaTypeDetails;
  providerInfo: {
    providerName: string;
    providerNpi: string;
    facilityName: string;
    facilityAddress: string;
  };
  documentChecklist: DocumentChecklistItem[];
  documents: File[];
  notes: string;
}
