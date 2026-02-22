import { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { cn } from '../../../../shared/lib/utils';
import type { PriorAuth } from '../../../../shared/types';
import { Button } from '../../../../shared/components/ui/button';
import { StatusBadge } from '../../../../shared/components/ui/status-badge';
import { PriorityBadge } from '../../../../shared/components/ui/priority-badge';
import { Card } from '../../../../shared/components/ui/card';
import { Tabs, type Tab } from '../../../../shared/components/ui/tabs';
import { PaInfoCard } from './pa-info-card';
import { PaTimeline } from './pa-timeline';
import { PaDocuments } from './pa-documents';
import { PaNotes } from './pa-notes';
import { mockEligibilityResult } from '../../../../mock/eligibility';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PaDetailPageProps {
  pa: PriorAuth;
  onBack: () => void;
}

/* ------------------------------------------------------------------ */
/*  Tabs definition                                                    */
/* ------------------------------------------------------------------ */

const DETAIL_TABS: Tab[] = [
  { id: 'documents', label: 'Documents' },
  { id: 'notes', label: 'Notes' },
  { id: 'activity', label: 'Activity' },
];

/* ------------------------------------------------------------------ */
/*  Type details renderer                                              */
/* ------------------------------------------------------------------ */

function TypeDetailsCard({ pa }: { pa: PriorAuth }) {
  const details = pa.typeDetails;
  if (!details) return null;

  const fields: { label: string; value: string }[] = [];

  switch (details.type) {
    case 'inpatient':
      fields.push(
        { label: 'Admission Date', value: details.admissionDate },
        { label: 'Estimated LOS', value: `${details.estimatedLOS} days` },
        { label: 'Bed Type', value: details.bedType },
        { label: 'Attending Physician', value: details.attendingPhysician },
        { label: 'Facility', value: details.facilityName },
      );
      break;
    case 'outpatient':
      fields.push(
        { label: 'Procedure Code', value: details.procedureCode },
        { label: 'Facility Type', value: details.facilityType },
        { label: 'Anesthesia', value: details.anesthesiaRequired ? 'Yes' : 'No' },
        { label: 'Follow-Up Plan', value: details.followUpPlan },
      );
      break;
    case 'pharmacy':
      fields.push(
        { label: 'NDC Code', value: details.ndcCode },
        { label: 'Drug Name', value: details.drugName },
        { label: 'Dosage', value: details.dosage },
        { label: 'Quantity', value: String(details.quantityRequested) },
        { label: 'Days Supply', value: String(details.daysSupply) },
        { label: 'Pharmacy NPI', value: details.pharmacyNpi },
      );
      break;
    case 'imaging':
      fields.push(
        { label: 'Modality', value: details.modality },
        { label: 'Body Part', value: details.bodyPart },
        { label: 'Contrast', value: details.contrastRequired ? 'Yes' : 'No' },
        { label: 'Clinical Indication', value: details.clinicalIndication },
        { label: 'Ordering Provider', value: details.orderingProvider },
      );
      break;
    case 'DME':
      fields.push(
        { label: 'HCPCS Code', value: details.hcpcsCode },
        { label: 'Item', value: details.itemDescription },
        { label: 'Rental/Purchase', value: details.rentalOrPurchase },
        { label: 'Duration', value: `${details.durationMonths} months` },
        { label: 'CMN Required', value: details.cmnRequired ? 'Yes' : 'No' },
      );
      break;
    case 'home-health':
      fields.push(
        { label: 'Visit Frequency', value: details.visitFrequency },
        { label: 'Disciplines', value: details.discipline.join(', ') },
        { label: 'Homebound', value: details.homeboundStatus ? 'Yes' : 'No' },
        { label: 'Cert. Start', value: details.certificationPeriodStart },
        { label: 'Cert. End', value: details.certificationPeriodEnd },
      );
      break;
  }

  return (
    <Card>
      <h3 className="mb-3 text-[14px] font-semibold text-text-primary capitalize">
        {details.type} Details
      </h3>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.label} className="flex flex-col gap-0.5">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">{f.label}</dt>
            <dd className="text-[13px] text-text-primary">{f.value || '\u2014'}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaDetailPage({ pa, onBack }: PaDetailPageProps) {
  const [activeTab, setActiveTab] = useState('documents');

  // Simulate eligibility status from the mock data
  const isEligible = mockEligibilityResult.coverageStatus === 'active';

  return (
    <div className="space-y-5">
      {/* ---- Header ---- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} icon={<ArrowLeft className="h-4 w-4" />}>
            Back
          </Button>

          <h1 className="text-[16px] font-semibold text-text-primary">
            {pa.authNumber}
          </h1>

          <StatusBadge status={pa.status} />
          <PriorityBadge priority={pa.urgency} />
        </div>
      </div>

      {/* ---- Eligibility banner ---- */}
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg px-4 py-3 text-[13px] font-medium',
          isEligible
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200',
        )}
      >
        {isEligible ? (
          <CheckCircle className="h-4 w-4 shrink-0" />
        ) : (
          <AlertTriangle className="h-4 w-4 shrink-0" />
        )}
        <ShieldCheck className="h-4 w-4 shrink-0" />
        <span>
          Member is {isEligible ? 'eligible' : 'not eligible'} &mdash; {mockEligibilityResult.planName}, {mockEligibilityResult.coverageStatus}
        </span>
        {isEligible && (
          <span className="ml-auto text-[12px] text-green-600">
            {mockEligibilityResult.planType} | Effective {mockEligibilityResult.effectiveDate}
          </span>
        )}
      </div>

      {/* ---- Two-column layout ---- */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Left column — 60% */}
        <div className="lg:col-span-3 space-y-5">
          <PaInfoCard pa={pa} />
          {pa.typeDetails && <TypeDetailsCard pa={pa} />}
        </div>

        {/* Right column — 40% */}
        <div className="lg:col-span-2">
          <PaTimeline events={pa.timeline} />
        </div>
      </div>

      {/* ---- Tabs section ---- */}
      <div>
        <Tabs tabs={DETAIL_TABS} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-4">
          {activeTab === 'documents' && (
            <PaDocuments documents={pa.documents} />
          )}

          {activeTab === 'notes' && (
            <PaNotes initialNotes={pa.notes} />
          )}

          {activeTab === 'activity' && (
            <PaTimeline events={pa.timeline} />
          )}
        </div>
      </div>
    </div>
  );
}
