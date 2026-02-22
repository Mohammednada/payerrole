import { CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { cn } from '../../../../shared/lib/utils';
import { Card } from '../../../../shared/components/ui/card';
import type { PaWizardData } from '../../../../shared/types';
import { PA_DOCUMENT_REQUIREMENTS } from '../../../../mock/prior-auth';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StepReviewProps {
  data: PaWizardData;
  onNotesChange: (notes: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </dt>
      <dd className="text-[13px] text-text-primary">{value || '\u2014'}</dd>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-[14px] font-semibold text-text-primary">{children}</h3>
  );
}

/* ------------------------------------------------------------------ */
/*  Type details renderer                                              */
/* ------------------------------------------------------------------ */

function TypeDetailsReview({ data }: { data: PaWizardData }) {
  const details = data.typeDetails;
  if (!details) return null;

  const fields: { label: string; value: string }[] = [];

  switch (details.type) {
    case 'inpatient':
      fields.push(
        { label: 'Admission Date', value: details.admissionDate },
        { label: 'Estimated LOS', value: details.estimatedLOS ? `${details.estimatedLOS} days` : '' },
        { label: 'Bed Type', value: details.bedType },
        { label: 'Attending Physician', value: details.attendingPhysician },
        { label: 'Facility', value: details.facilityName },
      );
      break;
    case 'outpatient':
      fields.push(
        { label: 'Procedure Code', value: details.procedureCode },
        { label: 'Facility Type', value: details.facilityType },
        { label: 'Anesthesia Required', value: details.anesthesiaRequired ? 'Yes' : 'No' },
        { label: 'Follow-Up Plan', value: details.followUpPlan },
      );
      break;
    case 'pharmacy':
      fields.push(
        { label: 'NDC Code', value: details.ndcCode },
        { label: 'Drug Name', value: details.drugName },
        { label: 'Dosage', value: details.dosage },
        { label: 'Quantity', value: details.quantityRequested ? String(details.quantityRequested) : '' },
        { label: 'Days Supply', value: details.daysSupply ? String(details.daysSupply) : '' },
        { label: 'Pharmacy NPI', value: details.pharmacyNpi },
      );
      break;
    case 'imaging':
      fields.push(
        { label: 'Modality', value: details.modality },
        { label: 'Body Part', value: details.bodyPart },
        { label: 'Contrast Required', value: details.contrastRequired ? 'Yes' : 'No' },
        { label: 'Clinical Indication', value: details.clinicalIndication },
        { label: 'Ordering Provider', value: details.orderingProvider },
      );
      break;
    case 'DME':
      fields.push(
        { label: 'HCPCS Code', value: details.hcpcsCode },
        { label: 'Item Description', value: details.itemDescription },
        { label: 'Rental/Purchase', value: details.rentalOrPurchase },
        { label: 'Duration', value: details.durationMonths ? `${details.durationMonths} months` : '' },
        { label: 'CMN Required', value: details.cmnRequired ? 'Yes' : 'No' },
      );
      break;
    case 'home-health':
      fields.push(
        { label: 'Visit Frequency', value: details.visitFrequency },
        { label: 'Disciplines', value: details.discipline.join(', ') },
        { label: 'Homebound Status', value: details.homeboundStatus ? 'Yes' : 'No' },
        { label: 'Cert. Period Start', value: details.certificationPeriodStart },
        { label: 'Cert. Period End', value: details.certificationPeriodEnd },
      );
      break;
  }

  return (
    <Card>
      <SectionTitle>Type-Specific Details ({details.type})</SectionTitle>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {fields.map((f) => (
          <ReviewField key={f.label} label={f.label} value={f.value} />
        ))}
      </dl>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StepReview({ data, onNotesChange }: StepReviewProps) {
  const { memberInfo, serviceInfo, providerInfo, eligibilityCheck, documentChecklist, notes } = data;

  const requirements = PA_DOCUMENT_REQUIREMENTS[serviceInfo.type] ?? [];
  const uploadedDocs = documentChecklist.filter((c) => c.uploaded);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[14px] font-semibold text-text-primary">
          Review &amp; Submit
        </h2>
        <p className="mt-1 text-[13px] text-text-secondary">
          Please review the information below before submitting.
        </p>
      </div>

      {/* Eligibility status */}
      {eligibilityCheck?.checked && (
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg px-4 py-3 text-[13px] font-medium',
            eligibilityCheck.eligible
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200',
          )}
        >
          {eligibilityCheck.eligible ? (
            <CheckCircle className="h-4 w-4 shrink-0" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0" />
          )}
          {eligibilityCheck.eligible
            ? `Eligible \u2014 ${eligibilityCheck.planName} (${eligibilityCheck.coverageStatus})`
            : `Not Eligible \u2014 Coverage ${eligibilityCheck.coverageStatus}`}
          {eligibilityCheck.authRequired && (
            <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
              Auth Required
            </span>
          )}
        </div>
      )}

      {/* Member */}
      <Card>
        <SectionTitle>Member Information</SectionTitle>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          <ReviewField label="Member ID" value={memberInfo.memberId} />
          <ReviewField label="Member Name" value={memberInfo.memberName} />
          <ReviewField label="Date of Birth" value={memberInfo.dob} />
          <ReviewField label="Subscriber ID" value={memberInfo.subscriberId} />
        </dl>
      </Card>

      {/* Service */}
      <Card>
        <SectionTitle>Service Information</SectionTitle>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          <ReviewField label="Type" value={serviceInfo.type} />
          <ReviewField label="Urgency" value={serviceInfo.urgency} />
          <ReviewField label="Service Code" value={serviceInfo.serviceCode} />
          <ReviewField
            label="Service Description"
            value={serviceInfo.serviceDescription}
          />
          <ReviewField label="Diagnosis Code" value={serviceInfo.diagnosisCode} />
          <ReviewField
            label="Diagnosis Description"
            value={serviceInfo.diagnosisDescription}
          />
          <ReviewField label="Start Date" value={serviceInfo.startDate} />
          <ReviewField label="End Date" value={serviceInfo.endDate} />
          <ReviewField
            label="Quantity"
            value={serviceInfo.quantity ? String(serviceInfo.quantity) : ''}
          />
        </dl>
      </Card>

      {/* Type details */}
      <TypeDetailsReview data={data} />

      {/* Provider */}
      <Card>
        <SectionTitle>Provider Information</SectionTitle>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          <ReviewField label="Provider Name" value={providerInfo.providerName} />
          <ReviewField label="NPI" value={providerInfo.providerNpi} />
          <ReviewField label="Facility Name" value={providerInfo.facilityName} />
          <ReviewField label="Facility Address" value={providerInfo.facilityAddress} />
        </dl>
      </Card>

      {/* Documents summary */}
      {uploadedDocs.length > 0 && (
        <Card>
          <SectionTitle>Documents ({uploadedDocs.length} of {requirements.length})</SectionTitle>
          <div className="space-y-2">
            {uploadedDocs.map((doc) => {
              const req = requirements.find((r) => r.id === doc.requirementId);
              return (
                <div key={doc.requirementId} className="flex items-center gap-2 text-[13px]">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span className="text-text-primary">{req?.name ?? doc.requirementId}</span>
                  {doc.fileName && (
                    <span className="text-text-muted">({doc.fileName})</span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Notes */}
      <Card>
        <SectionTitle>Additional Notes</SectionTitle>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add any additional notes for the reviewer..."
          rows={4}
          className={cn(
            'w-full resize-none rounded-md border border-border bg-card px-3 py-2 text-[13px] text-text-primary placeholder:text-text-muted',
            'focus:outline-none focus:ring-2 focus:ring-uhc-blue/30 focus:border-uhc-blue',
          )}
        />
      </Card>
    </div>
  );
}
