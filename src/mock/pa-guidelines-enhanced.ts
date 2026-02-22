import type {
  CriteriaCategory,
  PathwayStep,
  CoverageRules,
  PolicyReference,
  QualifyingCodes,
  AppealLevel,
  PaType,
} from '../shared/types';

/* ------------------------------------------------------------------ */
/*  Shared appeal process (same 4 levels for all PA types)             */
/* ------------------------------------------------------------------ */

const SHARED_APPEAL_PROCESS: AppealLevel[] = [
  {
    level: 1,
    name: 'Internal Reconsideration',
    timeline: '30 calendar days from denial notification',
    description:
      'Provider or member submits a written request for reconsideration with additional clinical documentation supporting medical necessity. Reviewed by a UHC clinical reviewer who was not involved in the original determination.',
    requirements: [
      'Written appeal letter referencing the original authorization number and denial reason',
      'Additional clinical documentation not previously submitted (e.g., updated progress notes, test results)',
      'Signed attestation from the treating provider confirming medical necessity',
      'Copy of the original denial letter',
    ],
  },
  {
    level: 2,
    name: 'Peer-to-Peer Review',
    timeline: '15 business days from Level 1 upheld denial',
    description:
      'A telephone-based clinical consultation between the requesting provider and a UHC Medical Director of the same or similar specialty. Allows real-time discussion of the clinical rationale and any alternative treatment options.',
    requirements: [
      'Completed Peer-to-Peer Request Form (UHC-P2P-001) submitted via the provider portal',
      'Treating physician must be available for the scheduled call and have the patient chart accessible',
      'Summary of clinical rationale prepared in advance, including relevant guidelines or literature citations',
    ],
  },
  {
    level: 3,
    name: 'External Independent Review',
    timeline: '45 calendar days from Level 2 upheld denial',
    description:
      'Case is referred to a state-certified Independent Review Organization (IRO) for de novo clinical review. The IRO reviewer is a board-certified physician in the relevant specialty with no affiliation to UHC.',
    requirements: [
      'Completed External Review Request Form submitted to the state insurance department or delegated entity',
      'Full copy of the medical record and all prior authorization documentation',
      'All prior appeal correspondence including Level 1 and Level 2 determination letters',
      'Any additional peer-reviewed literature or clinical guidelines supporting the requested service',
    ],
  },
  {
    level: 4,
    name: 'State/Federal Appeal',
    timeline: '60 calendar days from IRO determination (may vary by state)',
    description:
      'Final administrative appeal filed with the state Department of Insurance (commercial plans) or CMS/HHS (Medicare Advantage or marketplace plans). May include a formal hearing before an administrative law judge.',
    requirements: [
      'Written appeal filed with the appropriate state or federal regulatory body',
      'Complete record of all prior authorization requests and appeal determinations',
      'Statement of grounds for appeal citing specific plan provisions, state statutes, or federal regulations',
      'Authorized representative designation form if filed by an attorney or advocate on behalf of the member',
    ],
  },
];

/* ================================================================== */
/*  INPATIENT                                                          */
/* ================================================================== */

const inpatientCriteriaCategories: CriteriaCategory[] = [
  {
    name: 'Medical Necessity',
    icon: 'medical',
    criteria: [
      { id: 'inp-mn-1', description: 'Patient condition requires 24-hour nursing supervision that cannot be provided in a lower-acuity setting', required: true },
      { id: 'inp-mn-2', description: 'Documented failure of outpatient management or step-down level of care', required: true },
      { id: 'inp-mn-3', description: 'Acute clinical findings (vitals, labs, imaging) consistent with inpatient-level severity', required: true },
      { id: 'inp-mn-4', description: 'Physician attestation that admission is not primarily for social, custodial, or convenience reasons', required: true },
      { id: 'inp-mn-5', description: 'Co-morbid conditions that increase risk if managed in an outpatient setting', required: false },
    ],
  },
  {
    name: 'Documentation Requirements',
    icon: 'document',
    criteria: [
      { id: 'inp-doc-1', description: 'Signed admission order from the attending or admitting physician', required: true },
      { id: 'inp-doc-2', description: 'History & Physical (H&P) completed within 24 hours of admission', required: true },
      { id: 'inp-doc-3', description: 'Current medication list and allergy documentation', required: true },
      { id: 'inp-doc-4', description: 'Discharge planning documentation initiated at time of admission', required: false },
    ],
  },
  {
    name: 'Network Requirements',
    icon: 'network',
    criteria: [
      { id: 'inp-net-1', description: 'Facility must be a participating in-network hospital or approved out-of-network exception', required: true },
      { id: 'inp-net-2', description: 'Attending physician must hold active privileges at the admitting facility', required: true },
      { id: 'inp-net-3', description: 'Transfer from non-participating facility requires pre-authorization unless emergent', required: true },
    ],
  },
  {
    name: 'Utilization Management',
    icon: 'utilization',
    criteria: [
      { id: 'inp-um-1', description: 'Initial authorization covers the first 3 days; concurrent review required for extended stay', required: true },
      { id: 'inp-um-2', description: 'Level-of-care reassessment must occur within 48 hours if observation status is being considered', required: true },
      { id: 'inp-um-3', description: 'Length of stay must align with InterQual or Milliman Care Guidelines for the admitting diagnosis', required: true },
      { id: 'inp-um-4', description: 'Readmission within 30 days of discharge for the same or related condition requires additional justification', required: false },
    ],
  },
  {
    name: 'Coding Requirements',
    icon: 'coding',
    criteria: [
      { id: 'inp-cod-1', description: 'Primary ICD-10-CM diagnosis must support inpatient admission and match clinical documentation', required: true },
      { id: 'inp-cod-2', description: 'Procedure codes (ICD-10-PCS or CPT) must be submitted for all planned surgical interventions', required: true },
      { id: 'inp-cod-3', description: 'MS-DRG or APR-DRG assignment must be consistent with the documented diagnoses and procedures', required: true },
    ],
  },
];

const inpatientPathway: PathwayStep[] = [
  { id: 'inp-s1', label: 'Request Received', description: 'Inpatient admission authorization request submitted via portal, fax, or phone', type: 'start', nextStep: 'inp-s2' },
  { id: 'inp-s2', label: 'Administrative Review', description: 'Verify member eligibility, benefit coverage, and network status of the admitting facility', type: 'action', nextStep: 'inp-s3' },
  { id: 'inp-s3', label: 'Documentation Complete?', description: 'Assess whether required clinical documentation (H&P, admission order, clinical notes) has been submitted', type: 'decision', yesNext: 'inp-s4', noNext: 'inp-s3a' },
  { id: 'inp-s3a', label: 'Request Additional Information', description: 'Notify requesting provider of missing documentation; 5 business day response window', type: 'outcome', outcome: 'info-requested' },
  { id: 'inp-s4', label: 'Admission Status Review', description: 'Determine whether clinical presentation supports inpatient vs. observation status using InterQual criteria', type: 'action', nextStep: 'inp-s5' },
  { id: 'inp-s5', label: 'Level-of-Care Determination', description: 'Assess appropriate bed type (medical-surgical, step-down, ICU) based on acuity and required interventions', type: 'action', nextStep: 'inp-s6' },
  { id: 'inp-s6', label: 'Meets Medical Necessity?', description: 'Clinical reviewer evaluates whether the admission meets medical necessity criteria per UHC policy', type: 'decision', yesNext: 'inp-s7', noNext: 'inp-s8' },
  { id: 'inp-s7', label: 'Approved', description: 'Authorization granted for the requested admission with approved length of stay. Concurrent review scheduled.', type: 'outcome', outcome: 'approved' },
  { id: 'inp-s8', label: 'Peer-to-Peer Review', description: 'Case referred to UHC Medical Director for peer-to-peer consultation with the attending physician', type: 'outcome', outcome: 'peer-review' },
];

const inpatientCoverageRules: CoverageRules = {
  maxUnits: '30 days per admission; 120 days per benefit year',
  maxDollar: '$500,000 annual facility maximum (combined in-network)',
  renewalPeriod: 'Per admission; new authorization required for readmission',
  authValidityPeriod: '30 days from date of authorization; must be admitted within this window',
  ageRestrictions: [
    'Pediatric admissions (age < 18) follow separate Pediatric Inpatient Review criteria',
    'Neonatal ICU admissions (age < 28 days) require neonatology attestation',
    'Geriatric patients (age >= 65) require fall risk and delirium screening documentation',
  ],
  exclusions: [
    'Admissions primarily for diagnostic workup that can be performed on an outpatient basis',
    'Cosmetic surgery unless medically necessary (e.g., post-mastectomy reconstruction)',
    'Experimental or investigational treatments not approved by the FDA',
    'Custodial care or admissions for social/environmental reasons',
    'Admissions to non-licensed or non-accredited facilities',
  ],
  inNetworkRules: 'Covered at 80% after deductible for in-network participating facilities; no balance billing',
  outOfNetworkRules: 'Covered at 60% of allowed amount after out-of-network deductible; member responsible for balance billing',
  preExistingConditions: 'No pre-existing condition exclusion period for plans effective after January 1, 2014 (ACA compliant)',
  concurrentReview: 'Required every 3 days beginning on day 3 of admission; daily review for ICU stays',
  retrospectiveReview: 'Must be requested within 48 hours of emergent admission; 30-day filing deadline for retrospective authorization',
};

const inpatientPolicyReferences: PolicyReference[] = [
  { policyNumber: 'UHC-INP-2024-001', title: 'Inpatient Admission Medical Necessity Criteria', effectiveDate: '2024-01-01', description: 'Defines clinical criteria for approving inpatient admissions including acuity thresholds, severity of illness indicators, and intensity of service requirements.' },
  { policyNumber: 'UHC-INP-2024-002', title: 'Level of Care Determination Guidelines', effectiveDate: '2024-03-15', description: 'Establishes criteria for determining appropriate level of care (observation, medical-surgical, step-down, ICU) based on clinical presentation.' },
  { policyNumber: 'UHC-INP-2024-003', title: 'Concurrent Review and Continued Stay Criteria', effectiveDate: '2024-01-01', description: 'Outlines concurrent review intervals, continued stay justification requirements, and discharge planning expectations.' },
  { policyNumber: 'UHC-INP-2024-004', title: 'Readmission Review Policy', effectiveDate: '2024-06-01', description: 'Addresses authorization requirements for readmissions within 30 days including related-condition evaluation and avoidable readmission review.' },
];

const inpatientQualifyingCodes: QualifyingCodes = {
  icd10: [
    { code: 'M17.11', description: 'Primary osteoarthritis, right knee' },
    { code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery without angina pectoris' },
    { code: 'K80.00', description: 'Calculus of gallbladder with acute cholecystitis without obstruction' },
    { code: 'J18.9', description: 'Pneumonia, unspecified organism' },
    { code: 'I63.9', description: 'Cerebral infarction, unspecified' },
    { code: 'K35.80', description: 'Unspecified acute appendicitis' },
    { code: 'S72.001A', description: 'Fracture of unspecified part of neck of right femur, initial encounter' },
    { code: 'N20.0', description: 'Calculus of kidney' },
    { code: 'I50.9', description: 'Heart failure, unspecified' },
    { code: 'E11.65', description: 'Type 2 diabetes mellitus with hyperglycemia' },
  ],
  cpt: [
    { code: '27447', description: 'Total knee arthroplasty' },
    { code: '33533', description: 'Coronary artery bypass, single arterial graft' },
    { code: '47562', description: 'Laparoscopic cholecystectomy' },
    { code: '27130', description: 'Total hip arthroplasty' },
    { code: '44970', description: 'Laparoscopic appendectomy' },
    { code: '33361', description: 'Transcatheter aortic valve replacement (TAVR), percutaneous femoral artery approach' },
    { code: '22630', description: 'Posterior lumbar interbody fusion (PLIF), single interspace' },
    { code: '43239', description: 'Esophagogastroduodenoscopy with biopsy' },
  ],
};

/* ================================================================== */
/*  OUTPATIENT                                                         */
/* ================================================================== */

const outpatientCriteriaCategories: CriteriaCategory[] = [
  {
    name: 'Medical Necessity',
    icon: 'medical',
    criteria: [
      { id: 'out-mn-1', description: 'Procedure is clinically appropriate for the documented diagnosis and consistent with accepted standards of care', required: true },
      { id: 'out-mn-2', description: 'Conservative treatment has been attempted and documented for a minimum of 6 weeks (unless clinically contraindicated)', required: true },
      { id: 'out-mn-3', description: 'Expected clinical benefit outweighs procedural risk as documented by the ordering physician', required: true },
      { id: 'out-mn-4', description: 'Procedure cannot be safely or effectively performed in a less intensive setting (e.g., office-based)', required: false },
    ],
  },
  {
    name: 'Documentation Requirements',
    icon: 'document',
    criteria: [
      { id: 'out-doc-1', description: 'Signed procedure order from the ordering physician including CPT code and diagnosis', required: true },
      { id: 'out-doc-2', description: 'Medical necessity letter or clinical notes supporting the procedure', required: true },
      { id: 'out-doc-3', description: 'Results of diagnostic studies (labs, imaging) that informed the procedure decision', required: true },
      { id: 'out-doc-4', description: 'Documentation of conservative treatment history with dates and outcomes', required: false },
      { id: 'out-doc-5', description: 'Anesthesia evaluation if general or regional anesthesia is planned', required: false },
    ],
  },
  {
    name: 'Network Requirements',
    icon: 'network',
    criteria: [
      { id: 'out-net-1', description: 'Performing provider must be in-network or have an approved out-of-network exception', required: true },
      { id: 'out-net-2', description: 'Facility must be licensed and accredited (e.g., AAAHC, AAAASF, or state-licensed ASC)', required: true },
      { id: 'out-net-3', description: 'Site-of-service must be the most cost-effective appropriate setting for the procedure', required: true },
    ],
  },
  {
    name: 'Utilization Management',
    icon: 'utilization',
    criteria: [
      { id: 'out-um-1', description: 'Procedure frequency must not exceed plan benefit limits (e.g., colonoscopy every 10 years for average risk)', required: true },
      { id: 'out-um-2', description: 'Duplicate or overlapping procedures require separate clinical justification', required: true },
      { id: 'out-um-3', description: 'Site-of-service review required for procedures that may be performed in office, ASC, or HOPD settings', required: true },
      { id: 'out-um-4', description: 'Authorization must be obtained before the date of service; retrospective requests require emergent justification', required: true },
    ],
  },
  {
    name: 'Coding Requirements',
    icon: 'coding',
    criteria: [
      { id: 'out-cod-1', description: 'CPT code must accurately reflect the planned procedure and match the clinical documentation', required: true },
      { id: 'out-cod-2', description: 'ICD-10-CM code must support the medical necessity for the requested CPT code', required: true },
      { id: 'out-cod-3', description: 'Modifier usage must comply with UHC coding guidelines (e.g., -59 for distinct procedural service)', required: true },
      { id: 'out-cod-4', description: 'Bundled procedures must not be unbundled; NCCI edits apply', required: true },
    ],
  },
];

const outpatientPathway: PathwayStep[] = [
  { id: 'out-s1', label: 'Request Received', description: 'Outpatient procedure authorization request submitted by ordering provider', type: 'start', nextStep: 'out-s2' },
  { id: 'out-s2', label: 'Administrative Screening', description: 'Verify member eligibility, benefit coverage, and confirm authorization is required for this procedure/facility combination', type: 'action', nextStep: 'out-s3' },
  { id: 'out-s3', label: 'Documentation Complete?', description: 'Review submitted documentation for completeness including procedure order, clinical notes, and diagnostic results', type: 'decision', yesNext: 'out-s4', noNext: 'out-s3a' },
  { id: 'out-s3a', label: 'Request Additional Information', description: 'Provider notified of missing documentation; 10 business days to submit', type: 'outcome', outcome: 'info-requested' },
  { id: 'out-s4', label: 'Site-of-Service Review', description: 'Evaluate whether the procedure is being performed in the most appropriate and cost-effective setting', type: 'action', nextStep: 'out-s5' },
  { id: 'out-s5', label: 'Procedure-Specific Clinical Review', description: 'Apply procedure-specific clinical criteria (e.g., AIM guidelines for musculoskeletal, eviCore for cardiology)', type: 'action', nextStep: 'out-s6' },
  { id: 'out-s6', label: 'Meets Medical Necessity?', description: 'Determine if the procedure meets UHC medical necessity criteria based on clinical evidence and guidelines', type: 'decision', yesNext: 'out-s7', noNext: 'out-s8' },
  { id: 'out-s7', label: 'Approved', description: 'Authorization issued for the requested procedure, facility, and provider. Valid for 90 days.', type: 'outcome', outcome: 'approved' },
  { id: 'out-s8', label: 'Peer-to-Peer Review', description: 'Case forwarded for peer-to-peer discussion between the ordering physician and UHC Medical Director', type: 'outcome', outcome: 'peer-review' },
];

const outpatientCoverageRules: CoverageRules = {
  maxUnits: 'Varies by procedure; subject to benefit-specific frequency limits',
  maxDollar: '$250,000 per procedure; subject to annual out-of-pocket maximum',
  renewalPeriod: '90 days; new authorization required if procedure not completed within validity window',
  authValidityPeriod: '90 days from date of authorization',
  ageRestrictions: [
    'Pediatric patients (age < 18) may require additional consent documentation',
    'Bariatric surgery requires age >= 18 (age >= 16 with adolescent program referral)',
  ],
  exclusions: [
    'Cosmetic procedures unless medically necessary with documented functional impairment',
    'Weight loss surgery without meeting BMI and co-morbidity criteria per UHC bariatric surgery policy',
    'Fertility treatments without the Infertility Services Rider on the plan',
    'Experimental or investigational procedures not listed in the UHC medical policy compendium',
    'Services primarily for educational or vocational testing purposes',
  ],
  inNetworkRules: 'Covered at 80% after deductible for in-network ASC; 70% for in-network HOPD for applicable procedures',
  outOfNetworkRules: 'Covered at 60% of allowed amount after out-of-network deductible; member responsible for balance',
  preExistingConditions: 'No pre-existing condition exclusion for ACA-compliant plans',
  concurrentReview: 'Not applicable for most outpatient procedures; required for multi-stage procedures spanning multiple dates of service',
  retrospectiveReview: 'Retrospective authorization requests must be filed within 30 days of the date of service with documentation of urgency',
};

const outpatientPolicyReferences: PolicyReference[] = [
  { policyNumber: 'UHC-OPT-2024-001', title: 'Outpatient Procedure Medical Necessity Criteria', effectiveDate: '2024-01-01', description: 'General medical necessity criteria applied to all outpatient surgical and non-surgical procedures requiring prior authorization.' },
  { policyNumber: 'UHC-OPT-2024-002', title: 'Site-of-Service Appropriateness Review', effectiveDate: '2024-04-01', description: 'Policy governing the evaluation of procedure site (office, ASC, HOPD) to ensure cost-effective and safe delivery of care.' },
  { policyNumber: 'UHC-OPT-2024-003', title: 'Outpatient Surgery Conservative Treatment Requirements', effectiveDate: '2024-01-01', description: 'Defines minimum conservative treatment duration and documentation for procedures commonly requiring prior conservative management.' },
  { policyNumber: 'UHC-OPT-2024-004', title: 'Advanced Outpatient Procedure Guidelines', effectiveDate: '2024-07-01', description: 'Procedure-specific clinical criteria for complex outpatient services including robotic surgery, spinal procedures, and joint replacements.' },
];

const outpatientQualifyingCodes: QualifyingCodes = {
  icd10: [
    { code: 'M23.211', description: 'Derangement of posterior horn of medial meniscus, right knee' },
    { code: 'K21.0', description: 'Gastro-esophageal reflux disease with esophagitis' },
    { code: 'M75.110', description: 'Incomplete rotator cuff tear of right shoulder, not specified as traumatic' },
    { code: 'K40.90', description: 'Unilateral inguinal hernia, without obstruction or gangrene, not specified as recurrent' },
    { code: 'H25.11', description: 'Age-related nuclear cataract, right eye' },
    { code: 'J34.2', description: 'Deviated nasal septum' },
    { code: 'M79.3', description: 'Panniculitis, unspecified' },
    { code: 'N81.2', description: 'Incomplete uterovaginal prolapse' },
  ],
  cpt: [
    { code: '29881', description: 'Arthroscopy, knee, surgical; with meniscectomy' },
    { code: '43239', description: 'Esophagogastroduodenoscopy (EGD), with biopsy, single or multiple' },
    { code: '29827', description: 'Arthroscopy, shoulder, surgical; with rotator cuff repair' },
    { code: '49505', description: 'Repair initial inguinal hernia, age 5 years or older; reducible' },
    { code: '66984', description: 'Extracapsular cataract removal with insertion of intraocular lens prosthesis' },
    { code: '30520', description: 'Septoplasty with or without cartilage scoring' },
    { code: '45380', description: 'Colonoscopy with biopsy, single or multiple' },
    { code: '27446', description: 'Arthroplasty, knee, condyle and plateau; medial AND lateral compartments' },
    { code: '23412', description: 'Repair of ruptured musculotendinous cuff, open; chronic' },
    { code: '58571', description: 'Laparoscopy, surgical, with total hysterectomy' },
  ],
};

/* ================================================================== */
/*  PHARMACY                                                           */
/* ================================================================== */

const pharmacyCriteriaCategories: CriteriaCategory[] = [
  {
    name: 'Medical Necessity',
    icon: 'medical',
    criteria: [
      { id: 'rx-mn-1', description: 'Diagnosis is FDA-approved indication or supported by compendia evidence for off-label use', required: true },
      { id: 'rx-mn-2', description: 'Patient has tried and failed (or has contraindication to) required step-therapy medications', required: true },
      { id: 'rx-mn-3', description: 'Prescriber has documented clinical rationale for the specific drug, dose, and duration', required: true },
      { id: 'rx-mn-4', description: 'Baseline lab values or clinical assessments are documented prior to therapy initiation', required: false },
      { id: 'rx-mn-5', description: 'For specialty drugs: patient meets disease severity criteria as defined by clinical guidelines', required: false },
    ],
  },
  {
    name: 'Documentation Requirements',
    icon: 'document',
    criteria: [
      { id: 'rx-doc-1', description: 'Valid prescription from a licensed prescriber within scope of practice', required: true },
      { id: 'rx-doc-2', description: 'Letter of medical necessity from the prescriber detailing clinical justification', required: true },
      { id: 'rx-doc-3', description: 'Step therapy exception documentation including dates, drugs tried, and clinical response', required: true },
      { id: 'rx-doc-4', description: 'Supporting lab results (e.g., inflammatory markers, HbA1c, lipid panels) within 90 days', required: false },
      { id: 'rx-doc-5', description: 'Specialist referral or consultation notes for specialty medications', required: false },
    ],
  },
  {
    name: 'Network Requirements',
    icon: 'network',
    criteria: [
      { id: 'rx-net-1', description: 'Medication must be dispensed through a participating pharmacy or specialty pharmacy', required: true },
      { id: 'rx-net-2', description: 'Specialty medications may require use of UHC designated specialty pharmacy network (Optum Specialty Pharmacy)', required: true },
      { id: 'rx-net-3', description: 'Out-of-network pharmacy dispensing requires prior approval and may result in higher member cost-sharing', required: false },
    ],
  },
  {
    name: 'Utilization Management',
    icon: 'utilization',
    criteria: [
      { id: 'rx-um-1', description: 'Quantity limits per dispensing: 30-day supply retail, 90-day supply mail order or specialty', required: true },
      { id: 'rx-um-2', description: 'Refill frequency must comply with days-supply calculations; early refill exceptions require clinical justification', required: true },
      { id: 'rx-um-3', description: 'Ongoing therapy requires periodic clinical reassessment (every 6 or 12 months depending on drug class)', required: true },
      { id: 'rx-um-4', description: 'Dose escalation beyond recommended range requires additional clinical documentation', required: false },
    ],
  },
  {
    name: 'Coding Requirements',
    icon: 'coding',
    criteria: [
      { id: 'rx-cod-1', description: 'NDC code must match the approved drug, strength, and formulation on the authorization', required: true },
      { id: 'rx-cod-2', description: 'ICD-10-CM diagnosis code must be listed as a qualifying condition for the requested medication', required: true },
      { id: 'rx-cod-3', description: 'HCPCS J-code required for provider-administered (medical benefit) specialty drugs', required: false },
    ],
  },
];

const pharmacyPathway: PathwayStep[] = [
  { id: 'rx-s1', label: 'Request Received', description: 'Prior authorization request submitted by prescriber or pharmacy via CoverMyMeds, fax, or portal', type: 'start', nextStep: 'rx-s2' },
  { id: 'rx-s2', label: 'Formulary & Benefit Check', description: 'Verify drug formulary status, tier placement, and whether PA is required under the member\'s benefit plan', type: 'action', nextStep: 'rx-s3' },
  { id: 'rx-s3', label: 'Step Therapy Met?', description: 'Determine if required step-therapy prerequisites have been satisfied or if an exception applies', type: 'decision', yesNext: 'rx-s4', noNext: 'rx-s3a' },
  { id: 'rx-s3a', label: 'Step Therapy Required', description: 'Prescriber notified that required step-therapy medications must be tried before authorization. Request denied pending step completion.', type: 'outcome', outcome: 'denied' },
  { id: 'rx-s4', label: 'Clinical Review', description: 'Pharmacist or physician reviewer assesses diagnosis, clinical documentation, and guideline compliance', type: 'action', nextStep: 'rx-s5' },
  { id: 'rx-s5', label: 'Quantity & Duration Appropriate?', description: 'Evaluate requested quantity, days supply, and treatment duration against quantity limit and clinical guidelines', type: 'decision', yesNext: 'rx-s6', noNext: 'rx-s5a' },
  { id: 'rx-s5a', label: 'Request Modification', description: 'Provider contacted to discuss quantity adjustment or alternative dosing regimen', type: 'outcome', outcome: 'info-requested' },
  { id: 'rx-s6', label: 'Meets Coverage Criteria?', description: 'Final determination: does the request meet all clinical and plan coverage criteria?', type: 'decision', yesNext: 'rx-s7', noNext: 'rx-s8' },
  { id: 'rx-s7', label: 'Approved', description: 'Authorization granted for the specified drug, quantity, and duration. Transmitted to dispensing pharmacy.', type: 'outcome', outcome: 'approved' },
  { id: 'rx-s8', label: 'Denied', description: 'Request does not meet coverage criteria. Denial letter issued with appeal rights and alternative drug recommendations.', type: 'outcome', outcome: 'denied' },
];

const pharmacyCoverageRules: CoverageRules = {
  maxUnits: '30-day supply retail; 90-day supply mail order or maintenance; quantity limits vary by drug class',
  maxDollar: 'Subject to pharmacy benefit annual out-of-pocket maximum; specialty tier may have separate cost-sharing',
  renewalPeriod: '6 months for non-specialty drugs; 12 months for specialty/biologic agents (clinical reassessment required)',
  authValidityPeriod: '12 months for most drugs; 6 months for controlled substances (Schedule II-III)',
  ageRestrictions: [
    'Growth hormone therapy requires age < 18 unless adult-onset GH deficiency is documented',
    'ADHD stimulant medications for patients > 65 require specialist attestation',
    'Isotretinoin requires age >= 12 and iPLEDGE program enrollment',
  ],
  genderRestrictions: [
    'Testosterone replacement requires documented hypogonadism with two morning serum testosterone levels below 300 ng/dL',
    'Fertility medications limited to members with Infertility Services Rider',
  ],
  exclusions: [
    'Cosmetic-use medications (e.g., hair growth, skin lightening) unless medically necessary',
    'Over-the-counter equivalent medications when an OTC product is therapeutically equivalent',
    'Compounded medications that are not FDA-approved unless a commercial product is unavailable or contraindicated',
    'Weight loss medications without a BMI >= 30 (or >= 27 with co-morbidities) and documented lifestyle modification program',
    'Medications used for sexual dysfunction unless covered under a supplemental rider',
  ],
  inNetworkRules: 'Tier 1 (generic): $10 copay; Tier 2 (preferred brand): $35 copay; Tier 3 (non-preferred): $60 copay; Specialty: 20% coinsurance up to $250/fill',
  outOfNetworkRules: 'Non-participating pharmacy: member pays full cost and submits for reimbursement at in-network rate minus $20 surcharge per fill',
  preExistingConditions: 'No pre-existing condition limitations for ACA-compliant pharmacy benefits',
  concurrentReview: 'Required every 6 months for opioid therapy > 90 MME/day; every 12 months for biologic/specialty medications',
  retrospectiveReview: 'Emergency medication dispensing without PA may be approved retrospectively within 72 hours with clinical documentation',
};

const pharmacyPolicyReferences: PolicyReference[] = [
  { policyNumber: 'UHC-RX-2024-001', title: 'Pharmacy Prior Authorization General Criteria', effectiveDate: '2024-01-01', description: 'Establishes the general clinical criteria framework for evaluating pharmacy prior authorization requests including step therapy, quantity limits, and formulary exceptions.' },
  { policyNumber: 'UHC-RX-2024-002', title: 'Specialty Pharmacy Program Requirements', effectiveDate: '2024-02-01', description: 'Defines the specialty pharmacy network, clinical management programs, and authorization requirements for high-cost specialty and biologic medications.' },
  { policyNumber: 'UHC-RX-2024-003', title: 'Step Therapy Protocol and Exception Criteria', effectiveDate: '2024-01-01', description: 'Lists required step therapy sequences by drug class and establishes clinical criteria for step therapy exceptions.' },
  { policyNumber: 'UHC-RX-2024-004', title: 'Opioid Management and Safety Policy', effectiveDate: '2024-03-01', description: 'Comprehensive policy covering opioid quantity limits, morphine milligram equivalent thresholds, naloxone co-prescribing, and concurrent review requirements.' },
];

const pharmacyQualifyingCodes: QualifyingCodes = {
  icd10: [
    { code: 'K50.10', description: 'Crohn\'s disease of large intestine without complications' },
    { code: 'L40.50', description: 'Arthropathic psoriasis, unspecified' },
    { code: 'M05.79', description: 'Rheumatoid arthritis with rheumatoid factor, multiple sites' },
    { code: 'G35', description: 'Multiple sclerosis' },
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
    { code: 'C50.911', description: 'Malignant neoplasm of unspecified site of right female breast' },
    { code: 'J45.50', description: 'Severe persistent asthma, uncomplicated' },
    { code: 'E78.01', description: 'Familial hypercholesterolemia' },
    { code: 'B18.2', description: 'Chronic viral hepatitis C' },
    { code: 'M06.09', description: 'Rheumatoid arthritis without rheumatoid factor, multiple sites' },
  ],
  hcpcs: [
    { code: 'J0135', description: 'Injection, adalimumab (Humira), 20 mg' },
    { code: 'J1745', description: 'Injection, infliximab (Remicade), 10 mg' },
    { code: 'J2350', description: 'Injection, ocrelizumab (Ocrevus), 1 mg' },
    { code: 'J9035', description: 'Injection, bevacizumab (Avastin), 10 mg' },
    { code: 'J0717', description: 'Injection, certolizumab pegol (Cimzia), 1 mg' },
    { code: 'J3590', description: 'Unclassified biologic (used for new-to-market specialty drugs)' },
  ],
};

/* ================================================================== */
/*  IMAGING                                                            */
/* ================================================================== */

const imagingCriteriaCategories: CriteriaCategory[] = [
  {
    name: 'Medical Necessity',
    icon: 'medical',
    criteria: [
      { id: 'img-mn-1', description: 'Clinical indication is consistent with ACR Appropriateness Criteria for the requested study', required: true },
      { id: 'img-mn-2', description: 'Less invasive or lower-cost imaging has been performed first when clinically appropriate (e.g., X-ray before MRI)', required: true },
      { id: 'img-mn-3', description: 'Clinical history includes specific symptoms, duration, and physical examination findings supporting the study', required: true },
      { id: 'img-mn-4', description: 'For follow-up studies: documentation of interval change or new symptoms since prior imaging', required: false },
      { id: 'img-mn-5', description: 'Red-flag symptoms (e.g., neurological deficit, unexplained weight loss, trauma) documented when applicable', required: false },
    ],
  },
  {
    name: 'Documentation Requirements',
    icon: 'document',
    criteria: [
      { id: 'img-doc-1', description: 'Signed imaging order from the referring physician with clinical indication', required: true },
      { id: 'img-doc-2', description: 'Clinical notes documenting the symptoms, findings, and clinical question to be answered by imaging', required: true },
      { id: 'img-doc-3', description: 'Results of prior related imaging studies if the current request is a follow-up', required: false },
      { id: 'img-doc-4', description: 'Documentation of conservative treatment if imaging is for a musculoskeletal complaint (minimum 4-6 weeks)', required: false },
    ],
  },
  {
    name: 'Network Requirements',
    icon: 'network',
    criteria: [
      { id: 'img-net-1', description: 'Imaging facility must be in-network and accredited by ACR, IAC, or equivalent body', required: true },
      { id: 'img-net-2', description: 'Interpreting radiologist must be board-certified and credentialed with UHC', required: true },
      { id: 'img-net-3', description: 'High-tech imaging (MRI, CT, PET) at hospital outpatient departments may require site-of-service review', required: true },
    ],
  },
  {
    name: 'Utilization Management',
    icon: 'utilization',
    criteria: [
      { id: 'img-um-1', description: 'Advanced imaging (MRI, CT, PET/CT) limited to 1 study per body region per 12-month period unless clinically justified', required: true },
      { id: 'img-um-2', description: 'Duplicate or repeat studies within 6 months require documentation of clinical change or new indication', required: true },
      { id: 'img-um-3', description: 'Imaging performed for screening purposes (asymptomatic patients) must meet USPSTF or guideline-specific criteria', required: true },
    ],
  },
  {
    name: 'Coding Requirements',
    icon: 'coding',
    criteria: [
      { id: 'img-cod-1', description: 'CPT code must specify the correct modality, body part, and contrast usage (with/without/with and without)', required: true },
      { id: 'img-cod-2', description: 'ICD-10-CM diagnosis code must support the clinical indication and be specific to the body region being imaged', required: true },
      { id: 'img-cod-3', description: 'Technical and professional components must be billed correctly (TC/26 modifiers or global code)', required: true },
      { id: 'img-cod-4', description: 'Multiple body part imaging on the same date requires distinct diagnosis codes for each region', required: false },
    ],
  },
];

const imagingPathway: PathwayStep[] = [
  { id: 'img-s1', label: 'Request Received', description: 'Imaging prior authorization request submitted by the ordering provider', type: 'start', nextStep: 'img-s2' },
  { id: 'img-s2', label: 'Administrative Verification', description: 'Confirm member eligibility, imaging benefit, and whether PA is required for the specific modality and body part', type: 'action', nextStep: 'img-s3' },
  { id: 'img-s3', label: 'Duplicate Study Check', description: 'Query claims history for prior imaging of the same body region within the past 12 months', type: 'action', nextStep: 'img-s4' },
  { id: 'img-s4', label: 'Documentation Complete?', description: 'Verify that clinical indication, referring physician notes, and prior study results (if applicable) are submitted', type: 'decision', yesNext: 'img-s5', noNext: 'img-s4a' },
  { id: 'img-s4a', label: 'Request Additional Information', description: 'Provider contacted for missing clinical documentation; 10 business day response deadline', type: 'outcome', outcome: 'info-requested' },
  { id: 'img-s5', label: 'Appropriateness Criteria Review', description: 'Apply ACR Appropriateness Criteria or eviCore clinical guidelines to determine if the study is appropriate for the indication', type: 'action', nextStep: 'img-s6' },
  { id: 'img-s6', label: 'Meets Appropriateness Criteria?', description: 'Does the requested imaging study meet clinical appropriateness criteria for the documented indication?', type: 'decision', yesNext: 'img-s7', noNext: 'img-s8' },
  { id: 'img-s7', label: 'Approved', description: 'Imaging authorization granted. Notification sent to ordering provider and imaging facility.', type: 'outcome', outcome: 'approved' },
  { id: 'img-s8', label: 'Peer-to-Peer Review', description: 'Ordering provider may request a peer-to-peer discussion with a UHC radiologist reviewer', type: 'outcome', outcome: 'peer-review' },
];

const imagingCoverageRules: CoverageRules = {
  maxUnits: '1 advanced imaging study (MRI/CT/PET) per body region per 12-month period; X-ray and ultrasound subject to clinical review only',
  maxDollar: 'Subject to plan annual out-of-pocket maximum; no separate imaging dollar cap',
  renewalPeriod: 'Not applicable; each imaging study requires separate authorization',
  authValidityPeriod: '60 days from date of authorization; study must be completed within this window',
  ageRestrictions: [
    'CT scans for pediatric patients (age < 18) require documentation that radiation dose optimization protocol (ALARA) is followed',
    'PET/CT for patients > 80 requires documentation that results will change management plan',
  ],
  exclusions: [
    'Screening imaging without documented risk factors or guideline-supported indication',
    'Duplicate imaging of the same body part within 6 months without documented clinical change',
    'Whole-body screening MRI or CT for asymptomatic patients',
    'Self-referred advanced imaging (ordering and rendering provider must be different for MRI/CT/PET)',
    'Imaging for legal, employment, or insurance evaluation purposes not related to treatment',
  ],
  inNetworkRules: 'Covered at 80% after deductible at freestanding imaging centers; 70% at hospital outpatient departments for applicable plans',
  outOfNetworkRules: 'Covered at 50% of allowed amount after out-of-network deductible; prior authorization still required',
  preExistingConditions: 'No pre-existing condition limitations for diagnostic imaging under ACA-compliant plans',
  concurrentReview: 'Not typically applicable; required for serial imaging protocols (e.g., tumor surveillance every 3 months)',
  retrospectiveReview: 'Emergency imaging (stroke, trauma, acute abdomen) may be authorized retrospectively within 72 hours of the study',
};

const imagingPolicyReferences: PolicyReference[] = [
  { policyNumber: 'UHC-IMG-2024-001', title: 'Advanced Imaging Prior Authorization Policy', effectiveDate: '2024-01-01', description: 'Defines which advanced imaging modalities (MRI, CT, PET/CT, nuclear medicine) require prior authorization and the clinical criteria for approval.' },
  { policyNumber: 'UHC-IMG-2024-002', title: 'ACR Appropriateness Criteria Application Guidelines', effectiveDate: '2024-02-15', description: 'Describes how ACR Appropriateness Criteria ratings are applied in the imaging authorization review process.' },
  { policyNumber: 'UHC-IMG-2024-003', title: 'Site-of-Service Review for High-Tech Imaging', effectiveDate: '2024-05-01', description: 'Policy governing site-of-service evaluations to direct advanced imaging to freestanding centers when clinically equivalent to hospital outpatient settings.' },
];

const imagingQualifyingCodes: QualifyingCodes = {
  icd10: [
    { code: 'M54.5', description: 'Low back pain' },
    { code: 'G43.909', description: 'Migraine, unspecified, not intractable, without status migrainosus' },
    { code: 'M75.100', description: 'Unspecified rotator cuff tear or rupture of unspecified shoulder, not specified as traumatic' },
    { code: 'R10.9', description: 'Unspecified abdominal pain' },
    { code: 'R91.1', description: 'Solitary pulmonary nodule' },
    { code: 'M79.3', description: 'Panniculitis, unspecified' },
    { code: 'S83.511A', description: 'Sprain of anterior cruciate ligament of right knee, initial encounter' },
    { code: 'G89.29', description: 'Other chronic pain' },
  ],
  cpt: [
    { code: '70553', description: 'MRI brain without contrast, then with contrast and further sequences' },
    { code: '74177', description: 'CT abdomen and pelvis with contrast' },
    { code: '73721', description: 'MRI any joint of lower extremity without contrast' },
    { code: '72148', description: 'MRI lumbar spine without contrast' },
    { code: '78816', description: 'PET/CT for tumor; whole body' },
    { code: '74176', description: 'CT abdomen and pelvis without contrast' },
    { code: '70551', description: 'MRI brain without contrast' },
    { code: '73221', description: 'MRI any joint of upper extremity without contrast' },
    { code: '71260', description: 'CT chest with contrast (CT pulmonary angiography)' },
    { code: '77067', description: 'Screening mammography, bilateral, including computer-aided detection' },
    { code: '72141', description: 'MRI cervical spine without contrast' },
  ],
};

/* ================================================================== */
/*  DME (Durable Medical Equipment)                                    */
/* ================================================================== */

const dmeCriteriaCategories: CriteriaCategory[] = [
  {
    name: 'Medical Necessity',
    icon: 'medical',
    criteria: [
      { id: 'dme-mn-1', description: 'Equipment serves a specific therapeutic purpose and is required to treat or manage the patient\'s diagnosed condition', required: true },
      { id: 'dme-mn-2', description: 'Patient\'s functional limitations are documented and the equipment directly addresses these limitations', required: true },
      { id: 'dme-mn-3', description: 'Less costly alternatives have been considered and documented as insufficient or inappropriate', required: true },
      { id: 'dme-mn-4', description: 'Equipment is for use in the patient\'s home (not primarily for use in a facility or automobile)', required: true },
      { id: 'dme-mn-5', description: 'Physician has documented that the patient can safely and effectively use the equipment in the home setting', required: false },
    ],
  },
  {
    name: 'Documentation Requirements',
    icon: 'document',
    criteria: [
      { id: 'dme-doc-1', description: 'Signed detailed written order (DWO) from the treating physician specifying item, quantity, and diagnosis', required: true },
      { id: 'dme-doc-2', description: 'Certificate of Medical Necessity (CMN) on the appropriate CMS form for the item category', required: true },
      { id: 'dme-doc-3', description: 'Face-to-face encounter documentation within 6 months prior to the order date', required: true },
      { id: 'dme-doc-4', description: 'Functional assessment documenting the patient\'s mobility and ADL limitations', required: false },
      { id: 'dme-doc-5', description: 'Home safety assessment for equipment requiring installation or modification of the home environment', required: false },
    ],
  },
  {
    name: 'Network Requirements',
    icon: 'network',
    criteria: [
      { id: 'dme-net-1', description: 'DME supplier must be enrolled in UHC\'s DME network and accredited by an approved accreditation organization', required: true },
      { id: 'dme-net-2', description: 'Supplier must hold a valid state license and meet surety bond requirements', required: true },
      { id: 'dme-net-3', description: 'Complex rehab technology items require a CRT-designated supplier', required: false },
    ],
  },
  {
    name: 'Utilization Management',
    icon: 'utilization',
    criteria: [
      { id: 'dme-um-1', description: 'Rental items transition to purchase after 13 consecutive months of rental; rent-to-purchase analysis required', required: true },
      { id: 'dme-um-2', description: 'Replacement equipment requires documentation of wear, damage, or clinical change; minimum 5-year useful life for most items', required: true },
      { id: 'dme-um-3', description: 'Supply quantities must align with reasonable utilization patterns (e.g., CPAP supplies per CMS schedule)', required: true },
      { id: 'dme-um-4', description: 'Upgrade requests require documentation that the current equipment is clinically insufficient, not merely preference-based', required: false },
    ],
  },
  {
    name: 'Coding Requirements',
    icon: 'coding',
    criteria: [
      { id: 'dme-cod-1', description: 'HCPCS Level II code must accurately describe the specific item, including any accessories or modifications', required: true },
      { id: 'dme-cod-2', description: 'ICD-10-CM code must establish the medical necessity for the DME item and be specific to the condition', required: true },
      { id: 'dme-cod-3', description: 'Modifiers must be applied correctly (e.g., RR for rental, NU for new purchase, UE for used equipment)', required: true },
      { id: 'dme-cod-4', description: 'For power mobility devices, appropriate K-code must reflect the seating evaluation and mobility assessment findings', required: false },
    ],
  },
];

const dmePathway: PathwayStep[] = [
  { id: 'dme-s1', label: 'Request Received', description: 'DME prior authorization request submitted by the prescribing provider or DME supplier', type: 'start', nextStep: 'dme-s2' },
  { id: 'dme-s2', label: 'Administrative Review', description: 'Verify member eligibility, DME benefit status, and network status of the DME supplier', type: 'action', nextStep: 'dme-s3' },
  { id: 'dme-s3', label: 'CMN Verification', description: 'Confirm that a valid Certificate of Medical Necessity (CMN) has been submitted on the correct CMS form for the item category', type: 'action', nextStep: 'dme-s4' },
  { id: 'dme-s4', label: 'Documentation Complete?', description: 'Verify detailed written order, face-to-face encounter notes, and functional assessment are present', type: 'decision', yesNext: 'dme-s5', noNext: 'dme-s4a' },
  { id: 'dme-s4a', label: 'Request Additional Information', description: 'Supplier or provider notified of missing documentation; 15 business day response window', type: 'outcome', outcome: 'info-requested' },
  { id: 'dme-s5', label: 'Rental vs. Purchase Analysis', description: 'Evaluate whether the item should be rented or purchased based on expected duration of need and cost-effectiveness', type: 'action', nextStep: 'dme-s6' },
  { id: 'dme-s6', label: 'Clinical Review', description: 'Clinical reviewer assesses medical necessity, functional need, and appropriateness of the specific item requested', type: 'action', nextStep: 'dme-s7' },
  { id: 'dme-s7', label: 'Meets Coverage Criteria?', description: 'Does the request meet all UHC DME coverage criteria including medical necessity, documentation, and benefit limits?', type: 'decision', yesNext: 'dme-s8', noNext: 'dme-s9' },
  { id: 'dme-s8', label: 'Approved', description: 'DME authorization issued specifying the item, HCPCS code, rental/purchase status, and validity period', type: 'outcome', outcome: 'approved' },
  { id: 'dme-s9', label: 'Denied', description: 'Request does not meet coverage criteria. Denial issued with specific rationale and alternative recommendations.', type: 'outcome', outcome: 'denied' },
];

const dmeCoverageRules: CoverageRules = {
  maxUnits: 'Rental: 13 months maximum then rent-to-purchase conversion; supplies per CMS reasonable useful lifetime guidelines',
  maxDollar: '$10,000 per item category per benefit year; complex rehab technology subject to individual review',
  renewalPeriod: '12 months for rental reauthorization; 5-year replacement cycle for purchased equipment',
  authValidityPeriod: '12 months from date of authorization; delivery must occur within 60 days of approval',
  ageRestrictions: [
    'Pediatric DME (age < 21) may qualify for expanded coverage under EPSDT benefit for Medicaid-eligible members',
    'Growth-related equipment replacement for pediatric patients may be approved more frequently than the 5-year standard',
  ],
  exclusions: [
    'Comfort or convenience items that do not serve a primary medical purpose (e.g., seat lift mechanisms, bathtub lifts for non-qualifying diagnoses)',
    'Duplicate equipment when a functioning equivalent is already in the member\'s possession',
    'Exercise equipment, air purifiers, or environmental control devices unless meeting specific coverage criteria',
    'Modifications to the home structure (ramps, widened doorways) — covered under separate home modification benefit if available',
    'DME for use primarily outside the home (e.g., vehicle modifications, portable oxygen for air travel only)',
  ],
  inNetworkRules: 'Covered at 80% after deductible through participating DME suppliers; includes delivery, setup, and basic maintenance',
  outOfNetworkRules: 'Covered at 50% of allowed amount after out-of-network deductible; member responsible for any amount above UHC allowable',
  preExistingConditions: 'No pre-existing condition exclusions for ACA-compliant DME benefits',
  concurrentReview: 'Rental equipment reviewed every 3 months; CPAP compliance review at 90 days per CMS guidelines',
  retrospectiveReview: 'Emergency DME (e.g., hospital bed for unexpected discharge) may be authorized retrospectively within 14 days',
};

const dmePolicyReferences: PolicyReference[] = [
  { policyNumber: 'UHC-DME-2024-001', title: 'Durable Medical Equipment Coverage Determination Policy', effectiveDate: '2024-01-01', description: 'Master policy defining DME coverage criteria including medical necessity requirements, documentation standards, and benefit limitations for all equipment categories.' },
  { policyNumber: 'UHC-DME-2024-002', title: 'Power Mobility Device Authorization Policy', effectiveDate: '2024-04-01', description: 'Specific criteria for power wheelchairs and scooters including mobility examination, home assessment requirements, and ATP (Assistive Technology Professional) evaluation standards.' },
  { policyNumber: 'UHC-DME-2024-003', title: 'CPAP/BiPAP and Respiratory DME Policy', effectiveDate: '2024-01-15', description: 'Coverage criteria for positive airway pressure devices including sleep study requirements, compliance monitoring at 90 days, and supply replacement schedules.' },
  { policyNumber: 'UHC-DME-2024-004', title: 'Rent-to-Purchase Conversion and Equipment Replacement Policy', effectiveDate: '2024-06-01', description: 'Guidelines for the 13-month rental-to-purchase transition, equipment replacement timelines, and cost-effectiveness analysis requirements.' },
];

const dmeQualifyingCodes: QualifyingCodes = {
  icd10: [
    { code: 'G47.33', description: 'Obstructive sleep apnea' },
    { code: 'J96.11', description: 'Chronic respiratory failure with hypoxia' },
    { code: 'G82.20', description: 'Paraplegia, unspecified' },
    { code: 'M62.81', description: 'Muscle weakness (generalized)' },
    { code: 'R26.2', description: 'Difficulty in walking, not elsewhere classified' },
    { code: 'G12.21', description: 'Amyotrophic lateral sclerosis' },
    { code: 'E11.621', description: 'Type 2 diabetes mellitus with foot ulcer' },
    { code: 'I69.354', description: 'Hemiplegia and hemiparesis following cerebral infarction affecting left non-dominant side' },
  ],
  hcpcs: [
    { code: 'E0260', description: 'Hospital bed, semi-electric (head and foot adjustment), with mattress' },
    { code: 'K0823', description: 'Power wheelchair, Group 2 standard, captain\'s chair, patient weight up to 300 lbs' },
    { code: 'E0601', description: 'Continuous positive airway pressure (CPAP) device' },
    { code: 'E0431', description: 'Portable gaseous oxygen system, rental' },
    { code: 'E0143', description: 'Walker, folding, wheeled, adjustable or fixed height' },
    { code: 'E0105', description: 'Cane, quad or three-prong, adjustable or fixed' },
    { code: 'E0607', description: 'Home blood glucose monitor' },
    { code: 'K0861', description: 'Power wheelchair, Group 3 standard, single power option, sling/solid seat/back, patient weight up to 300 lbs' },
    { code: 'E1390', description: 'Oxygen concentrator, single delivery port, capable of delivering 85% or greater oxygen concentration' },
    { code: 'E2402', description: 'Negative pressure wound therapy electrical pump, stationary or portable' },
  ],
};

/* ================================================================== */
/*  HOME HEALTH                                                        */
/* ================================================================== */

const homeHealthCriteriaCategories: CriteriaCategory[] = [
  {
    name: 'Medical Necessity',
    icon: 'medical',
    criteria: [
      { id: 'hh-mn-1', description: 'Patient is homebound: leaving home requires considerable and taxing effort and absences from home are infrequent and of short duration', required: true },
      { id: 'hh-mn-2', description: 'Patient requires skilled services (nursing, PT, OT, SLP) that are reasonable and necessary for the treatment of the illness or injury', required: true },
      { id: 'hh-mn-3', description: 'Services are provided under a plan of care established, reviewed, and signed by a physician', required: true },
      { id: 'hh-mn-4', description: 'Patient\'s condition is expected to improve with skilled intervention or skilled care is needed to maintain function or prevent decline', required: true },
      { id: 'hh-mn-5', description: 'Services cannot be safely or effectively provided in an outpatient setting given the patient\'s homebound status', required: false },
    ],
  },
  {
    name: 'Documentation Requirements',
    icon: 'document',
    criteria: [
      { id: 'hh-doc-1', description: 'Physician-signed Plan of Care (CMS-485) specifying disciplines, visit frequency, and treatment goals', required: true },
      { id: 'hh-doc-2', description: 'Face-to-face encounter documentation within 90 days before or 30 days after the start of care', required: true },
      { id: 'hh-doc-3', description: 'Homebound certification with specific clinical rationale documenting why leaving home is a taxing effort', required: true },
      { id: 'hh-doc-4', description: 'OASIS (Outcome and Assessment Information Set) assessment completed at start of care', required: true },
      { id: 'hh-doc-5', description: 'Hospital or facility discharge summary if the home health episode follows an inpatient stay', required: false },
    ],
  },
  {
    name: 'Network Requirements',
    icon: 'network',
    criteria: [
      { id: 'hh-net-1', description: 'Home health agency must be Medicare-certified, state-licensed, and participating in the UHC provider network', required: true },
      { id: 'hh-net-2', description: 'Skilled clinicians must hold valid state licenses in the discipline being provided', required: true },
      { id: 'hh-net-3', description: 'Out-of-network home health agencies require pre-approval and are reimbursed at reduced benefit levels', required: true },
    ],
  },
  {
    name: 'Utilization Management',
    icon: 'utilization',
    criteria: [
      { id: 'hh-um-1', description: 'Authorization covers one 60-day certification period; recertification required for each subsequent period', required: true },
      { id: 'hh-um-2', description: 'Visit frequency must align with the documented plan of care and not exceed reasonable levels for the condition', required: true },
      { id: 'hh-um-3', description: 'Concurrent review conducted every 30 days to assess progress toward goals and ongoing need for services', required: true },
      { id: 'hh-um-4', description: 'Annual visit maximum of 60 skilled visits across all disciplines combined; exceptions require medical director review', required: true },
      { id: 'hh-um-5', description: 'Home health aide services require concurrent skilled nursing or therapy to qualify for coverage', required: false },
    ],
  },
  {
    name: 'Coding Requirements',
    icon: 'coding',
    criteria: [
      { id: 'hh-cod-1', description: 'HCPCS G-codes must accurately reflect the discipline and visit type being provided', required: true },
      { id: 'hh-cod-2', description: 'ICD-10-CM codes must support the homebound status and need for skilled services', required: true },
      { id: 'hh-cod-3', description: 'OASIS data elements must be accurately coded and consistent with clinical documentation', required: true },
      { id: 'hh-cod-4', description: 'Revenue codes (042x for PT, 043x for OT, 044x for SLP, 055x for SN) must be correctly applied', required: false },
    ],
  },
];

const homeHealthPathway: PathwayStep[] = [
  { id: 'hh-s1', label: 'Request Received', description: 'Home health authorization request submitted by the ordering physician or home health agency', type: 'start', nextStep: 'hh-s2' },
  { id: 'hh-s2', label: 'Administrative Review', description: 'Verify member eligibility, home health benefit status, and agency network participation', type: 'action', nextStep: 'hh-s3' },
  { id: 'hh-s3', label: 'Homebound Status Verification', description: 'Review documentation to confirm patient meets homebound criteria: leaving home requires considerable and taxing effort', type: 'action', nextStep: 'hh-s4' },
  { id: 'hh-s4', label: 'Plan of Care Review', description: 'Evaluate the physician-signed CMS-485 for completeness, including visit frequency, disciplines, goals, and duration', type: 'action', nextStep: 'hh-s5' },
  { id: 'hh-s5', label: 'Documentation Complete?', description: 'Assess whether face-to-face encounter, homebound certification, and OASIS assessment are on file', type: 'decision', yesNext: 'hh-s6', noNext: 'hh-s5a' },
  { id: 'hh-s5a', label: 'Request Additional Information', description: 'Agency or provider notified of missing documentation; 10 business day response window', type: 'outcome', outcome: 'info-requested' },
  { id: 'hh-s6', label: 'Skilled Services Justified?', description: 'Clinical reviewer determines whether the requested skilled services are reasonable and necessary for the patient\'s condition', type: 'decision', yesNext: 'hh-s7', noNext: 'hh-s8' },
  { id: 'hh-s7', label: 'Approved', description: 'Home health authorization granted for the 60-day certification period with specified disciplines and visit frequencies', type: 'outcome', outcome: 'approved' },
  { id: 'hh-s8', label: 'Peer-to-Peer Review', description: 'Case referred for peer-to-peer discussion between the ordering physician and UHC Medical Director', type: 'outcome', outcome: 'peer-review' },
];

const homeHealthCoverageRules: CoverageRules = {
  maxUnits: '60 skilled visits per benefit year (combined across all disciplines); home health aide visits do not count toward this limit when provided concurrently with skilled services',
  maxDollar: 'No separate dollar maximum; subject to plan annual out-of-pocket maximum',
  renewalPeriod: '60-day certification period; recertification with updated plan of care required for each renewal',
  authValidityPeriod: '60 days per certification period; aligned with CMS home health certification requirements',
  ageRestrictions: [
    'Pediatric home health (age < 21) may qualify for expanded hours and services under EPSDT for Medicaid-eligible members',
    'Patients age >= 65 on Medicare Advantage follow CMS home health coverage criteria',
  ],
  exclusions: [
    'Custodial care or personal care services not requiring skilled oversight (e.g., bathing, dressing, meal preparation alone)',
    '24-hour continuous nursing or shift nursing (covered under separate private duty nursing benefit if available)',
    'Home health services when the patient does not meet homebound criteria',
    'Services that are duplicative of outpatient therapy the patient is currently receiving',
    'Home infusion therapy (covered under separate home infusion benefit)',
  ],
  inNetworkRules: 'Covered at 100% after deductible for Medicare Advantage plans; commercial plans covered at 80% after deductible through participating agencies',
  outOfNetworkRules: 'Covered at 50% of allowed amount for non-participating agencies; requires pre-approval and documentation of no in-network availability in service area',
  preExistingConditions: 'No pre-existing condition limitations for home health benefits under ACA-compliant plans',
  concurrentReview: 'Required every 30 days during active home health episode; includes clinical progress review and goal reassessment',
  retrospectiveReview: 'Post-acute home health initiated within 3 days of hospital discharge may be authorized retrospectively; 14-day filing limit',
};

const homeHealthPolicyReferences: PolicyReference[] = [
  { policyNumber: 'UHC-HH-2024-001', title: 'Home Health Services Coverage and Medical Necessity Policy', effectiveDate: '2024-01-01', description: 'Comprehensive policy defining coverage criteria for home health services including homebound status requirements, skilled service necessity, and benefit limitations.' },
  { policyNumber: 'UHC-HH-2024-002', title: 'Homebound Status Determination Guidelines', effectiveDate: '2024-01-01', description: 'Detailed criteria and documentation standards for establishing and verifying homebound status consistent with CMS guidelines.' },
  { policyNumber: 'UHC-HH-2024-003', title: 'Home Health Recertification and Concurrent Review Policy', effectiveDate: '2024-03-01', description: 'Outlines recertification requirements for extended home health episodes, concurrent review intervals, and progress reporting standards.' },
  { policyNumber: 'UHC-HH-2024-004', title: 'Home Health Aide Coverage Criteria', effectiveDate: '2024-05-15', description: 'Defines when home health aide services are covered, including the requirement for concurrent skilled service, supervisory visit requirements, and aide care plan documentation.' },
];

const homeHealthQualifyingCodes: QualifyingCodes = {
  icd10: [
    { code: 'I69.351', description: 'Hemiplegia and hemiparesis following cerebral infarction affecting right dominant side' },
    { code: 'S72.001D', description: 'Fracture of unspecified part of neck of right femur, subsequent encounter for closed fracture with routine healing' },
    { code: 'Z96.641', description: 'Presence of right artificial hip joint' },
    { code: 'I50.22', description: 'Chronic systolic (congestive) heart failure' },
    { code: 'E11.621', description: 'Type 2 diabetes mellitus with foot ulcer' },
    { code: 'L89.154', description: 'Pressure ulcer of sacral region, stage 4' },
    { code: 'J44.1', description: 'Chronic obstructive pulmonary disease with acute exacerbation' },
    { code: 'Z87.39', description: 'Personal history of other diseases of the musculoskeletal system and connective tissue' },
    { code: 'M80.08XA', description: 'Age-related osteoporosis with current pathological fracture, vertebra(e), initial encounter' },
    { code: 'G81.91', description: 'Hemiplegia, unspecified affecting right dominant side' },
  ],
  hcpcs: [
    { code: 'G0151', description: 'Services of physical therapist in home health setting, each 15 minutes' },
    { code: 'G0152', description: 'Services of occupational therapist in home health setting, each 15 minutes' },
    { code: 'G0153', description: 'Services of speech-language pathologist in home health setting, each 15 minutes' },
    { code: 'G0154', description: 'Services of skilled nurse in home health setting, each 15 minutes' },
    { code: 'G0155', description: 'Services of clinical social worker in home health setting, each 15 minutes' },
    { code: 'G0156', description: 'Services of home health aide in home health setting, each 15 minutes' },
    { code: 'G0157', description: 'Services of physical therapy assistant in home health setting, each 15 minutes' },
    { code: 'G0158', description: 'Services of occupational therapy assistant in home health setting, each 15 minutes' },
    { code: 'G0162', description: 'Skilled services by a registered nurse (RN) for management and evaluation of the plan of care' },
    { code: 'G0299', description: 'Direct skilled nursing services of a registered nurse (RN) in the home health setting' },
  ],
};

/* ================================================================== */
/*  Main export function                                               */
/* ================================================================== */

export function getEnhancedGuidelines(): Record<
  PaType,
  {
    criteriaCategories: CriteriaCategory[];
    clinicalPathway: PathwayStep[];
    coverageRules: CoverageRules;
    policyReferences: PolicyReference[];
    qualifyingCodes: QualifyingCodes;
    appealProcess: AppealLevel[];
  }
> {
  return {
    inpatient: {
      criteriaCategories: inpatientCriteriaCategories,
      clinicalPathway: inpatientPathway,
      coverageRules: inpatientCoverageRules,
      policyReferences: inpatientPolicyReferences,
      qualifyingCodes: inpatientQualifyingCodes,
      appealProcess: SHARED_APPEAL_PROCESS,
    },
    outpatient: {
      criteriaCategories: outpatientCriteriaCategories,
      clinicalPathway: outpatientPathway,
      coverageRules: outpatientCoverageRules,
      policyReferences: outpatientPolicyReferences,
      qualifyingCodes: outpatientQualifyingCodes,
      appealProcess: SHARED_APPEAL_PROCESS,
    },
    pharmacy: {
      criteriaCategories: pharmacyCriteriaCategories,
      clinicalPathway: pharmacyPathway,
      coverageRules: pharmacyCoverageRules,
      policyReferences: pharmacyPolicyReferences,
      qualifyingCodes: pharmacyQualifyingCodes,
      appealProcess: SHARED_APPEAL_PROCESS,
    },
    imaging: {
      criteriaCategories: imagingCriteriaCategories,
      clinicalPathway: imagingPathway,
      coverageRules: imagingCoverageRules,
      policyReferences: imagingPolicyReferences,
      qualifyingCodes: imagingQualifyingCodes,
      appealProcess: SHARED_APPEAL_PROCESS,
    },
    DME: {
      criteriaCategories: dmeCriteriaCategories,
      clinicalPathway: dmePathway,
      coverageRules: dmeCoverageRules,
      policyReferences: dmePolicyReferences,
      qualifyingCodes: dmeQualifyingCodes,
      appealProcess: SHARED_APPEAL_PROCESS,
    },
    'home-health': {
      criteriaCategories: homeHealthCriteriaCategories,
      clinicalPathway: homeHealthPathway,
      coverageRules: homeHealthCoverageRules,
      policyReferences: homeHealthPolicyReferences,
      qualifyingCodes: homeHealthQualifyingCodes,
      appealProcess: SHARED_APPEAL_PROCESS,
    },
  };
}
