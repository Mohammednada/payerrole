import type { PriorAuth } from '../../../../shared/types';
import { formatDate, formatCurrency } from '../../../../shared/lib/utils';
import { Card } from '../../../../shared/components/ui/card';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PaInfoCardProps {
  pa: PriorAuth;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

interface FieldDef {
  label: string;
  value: string | undefined;
}

function InfoField({ label, value }: FieldDef) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </dt>
      <dd className="text-[13px] text-text-primary">{value || '\u2014'}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaInfoCard({ pa }: PaInfoCardProps) {
  const fields: FieldDef[] = [
    { label: 'Member ID', value: pa.memberId },
    { label: 'Member Name', value: pa.memberName },
    { label: 'Provider', value: pa.providerName },
    { label: 'NPI', value: pa.providerNpi },
    { label: 'Service Code', value: pa.serviceCode },
    { label: 'Service Description', value: pa.serviceDescription },
    { label: 'Diagnosis Code', value: pa.diagnosisCode },
    { label: 'Diagnosis Description', value: pa.diagnosisDescription },
    { label: 'Type', value: pa.type.charAt(0).toUpperCase() + pa.type.slice(1) },
    { label: 'Urgency', value: pa.urgency.charAt(0).toUpperCase() + pa.urgency.slice(1) },
    { label: 'Request Date', value: formatDate(pa.requestDate) },
    { label: 'Review Date', value: pa.reviewDate ? formatDate(pa.reviewDate) : undefined },
    { label: 'Decision Date', value: pa.decisionDate ? formatDate(pa.decisionDate) : undefined },
    { label: 'Expiration Date', value: pa.expirationDate ? formatDate(pa.expirationDate) : undefined },
    { label: 'Estimated Cost', value: formatCurrency(pa.estimatedCost) },
  ];

  return (
    <Card>
      <h3 className="mb-3 text-[14px] font-semibold text-text-primary">
        Authorization Details
      </h3>

      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {fields.map((field) => (
          <InfoField key={field.label} label={field.label} value={field.value} />
        ))}
      </dl>
    </Card>
  );
}
