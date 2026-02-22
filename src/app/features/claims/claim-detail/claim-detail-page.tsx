import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '../../../../shared/lib/utils';
import { Card } from '../../../../shared/components/ui/card';
import { Button } from '../../../../shared/components/ui/button';
import { StatusBadge } from '../../../../shared/components/ui/status-badge';
import { Badge } from '../../../../shared/components/ui/badge';
import { Tabs } from '../../../../shared/components/ui/tabs';
import { ClaimLineItems } from './claim-line-items';
import { ClaimAdjustments } from './claim-adjustments';
import { ClaimEob } from './claim-eob';
import { ClaimRemittance } from './claim-remittance';
import type { Claim } from '../../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ClaimDetailPageProps {
  claim: Claim;
  onBack: () => void;
}

/* ------------------------------------------------------------------ */
/*  Tab definitions                                                    */
/* ------------------------------------------------------------------ */

const TABS = [
  { id: 'line-items', label: 'Line Items' },
  { id: 'adjustments', label: 'Adjustments' },
  { id: 'eob', label: 'EOB' },
  { id: 'remittance', label: 'Remittance' },
];

/* ------------------------------------------------------------------ */
/*  Type badge mapping                                                 */
/* ------------------------------------------------------------------ */

const TYPE_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'info' | 'teal'> = {
  professional: 'default',
  institutional: 'info',
  dental: 'teal',
  pharmacy: 'warning',
};

/* ------------------------------------------------------------------ */
/*  Detail row helper                                                  */
/* ------------------------------------------------------------------ */

function DetailRow({ label, value, className }: { label: string; value: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-1', className)}>
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">{label}</dt>
      <dd className="text-[13px] text-text-primary">{value}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ClaimDetailPage({ claim, onBack }: ClaimDetailPageProps) {
  const [activeTab, setActiveTab] = useState('line-items');

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="h-4 w-4" />}
            onClick={onBack}
          >
            Back
          </Button>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[16px] font-semibold text-text-primary">
                {claim.claimNumber}
              </h1>
              <StatusBadge status={claim.status} />
              <Badge variant={TYPE_VARIANT[claim.type] ?? 'default'}>
                {claim.type.charAt(0).toUpperCase() + claim.type.slice(1)}
              </Badge>
            </div>
            <p className="mt-1 text-[13px] text-text-secondary">
              {claim.memberName} &middot; {claim.providerName}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
      >
        <Card>
          <h2 className="mb-3 text-[14px] font-semibold text-text-primary">Claim Summary</h2>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailRow label="Member ID" value={claim.memberId} />
            <DetailRow label="Member Name" value={claim.memberName} />
            <DetailRow label="Provider" value={claim.providerName} />
            <DetailRow label="Provider NPI" value={claim.providerNpi} />
            <DetailRow label="Service Date" value={formatDate(claim.serviceDate)} />
            <DetailRow label="Submitted Date" value={formatDate(claim.submittedDate)} />
            <DetailRow
              label="Processed Date"
              value={claim.processedDate ? formatDate(claim.processedDate) : '\u2014'}
            />
            <DetailRow
              label="Paid Date"
              value={claim.paidDate ? formatDate(claim.paidDate) : '\u2014'}
            />
            <DetailRow
              label="Billed Amount"
              value={<span className="font-semibold">{formatCurrency(claim.billedAmount)}</span>}
            />
            <DetailRow
              label="Allowed Amount"
              value={
                <span className={cn('font-semibold', claim.allowedAmount > 0 ? 'text-text-primary' : 'text-text-muted')}>
                  {formatCurrency(claim.allowedAmount)}
                </span>
              }
            />
            <DetailRow
              label="Paid Amount"
              value={
                <span className={cn('font-semibold', claim.paidAmount > 0 ? 'text-success' : 'text-text-muted')}>
                  {formatCurrency(claim.paidAmount)}
                </span>
              }
            />
            <DetailRow
              label="Patient Responsibility"
              value={
                <span className={cn('font-semibold', claim.patientResponsibility > 0 ? 'text-warning' : 'text-text-muted')}>
                  {formatCurrency(claim.patientResponsibility)}
                </span>
              }
            />
            <DetailRow
              label="Adjustment Amount"
              value={
                <span className={cn('font-semibold', claim.adjustmentAmount > 0 ? 'text-error' : 'text-text-muted')}>
                  {formatCurrency(claim.adjustmentAmount)}
                </span>
              }
            />
            <DetailRow
              label="Diagnosis Codes"
              value={
                <div className="flex flex-wrap gap-1">
                  {claim.diagnosisCodes.map((code) => (
                    <span
                      key={code}
                      className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-text-secondary"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              }
            />
            <DetailRow
              label="Remittance ID"
              value={claim.remittanceId ?? '\u2014'}
            />
          </dl>
        </Card>
      </motion.div>

      {/* Tabs + content */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="space-y-4"
      >
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        <div>
          {activeTab === 'line-items' && (
            <ClaimLineItems lineItems={claim.lineItems} />
          )}
          {activeTab === 'adjustments' && (
            <ClaimAdjustments adjustments={claim.adjustments} />
          )}
          {activeTab === 'eob' && <ClaimEob claim={claim} />}
          {activeTab === 'remittance' && <ClaimRemittance claim={claim} />}
        </div>
      </motion.div>
    </div>
  );
}
