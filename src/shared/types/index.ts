export type ViewId =
  | 'dashboard'
  | 'prior-auth'
  | 'claims'
  | 'eligibility'
  | 'members'
  | 'reports'
  | 'messages'
  | 'settings'
  | 'referrals';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  read: boolean;
}

export interface Breadcrumb {
  label: string;
  viewId?: ViewId;
}

export type { AuthStep, User, TinNpi } from './auth';
export type {
  PriorAuth, PaStatus, PaUrgency, PaType, PaDocument, PaTimelineEvent, PaWizardData,
  PaTypeDetails, InpatientDetails, OutpatientDetails, PharmacyDetails, ImagingDetails, DmeDetails, HomeHealthDetails,
  PaDocumentRequirement, DocumentChecklistItem, PaEligibilityCheck,
  PaCriterion, PaTypeGuideline,
  PharmacyDrugCategory, PharmacyDrugGuideline,
  CriteriaCategory, PathwayStep, CoverageRules, PolicyReference, QualifyingCodes, AppealLevel,
} from './prior-auth';
export type { Claim, ClaimStatus, ClaimType, ClaimLineItem, ClaimAdjustment } from './claims';
export type { EligibilityResult, CoverageStatus, PlanType, BenefitRow } from './eligibility';
export type { Member, CoverageHistoryItem, MemberClaim, MemberPA } from './members';
export type { Message, MessageCategory, MessageStatus, MessageAttachment } from './messages';
export type { Referral, ReferralStatus } from './referrals';
export type { Report, ReportType, ChartDataPoint } from './reports';
