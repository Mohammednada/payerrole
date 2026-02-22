import { motion } from 'motion/react';
import { User, CreditCard, Stethoscope } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';
import type { EligibilityResult, CoverageStatus } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CoverageSummaryCardProps {
  result: EligibilityResult;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const STATUS_VARIANT: Record<CoverageStatus, { variant: 'success' | 'error' | 'warning' | 'default'; label: string }> = {
  active:     { variant: 'success', label: 'Active' },
  inactive:   { variant: 'default', label: 'Inactive' },
  terminated: { variant: 'error',   label: 'Terminated' },
  pending:    { variant: 'warning', label: 'Pending' },
};

function ProgressBar({
  label,
  met,
  total,
}: {
  label: string;
  met: number;
  total: number;
}) {
  const pct = Math.min((met / total) * 100, 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-text-secondary">{label}</span>
        <span className="font-medium text-text-primary">
          {formatCurrency(met)}{' '}
          <span className="text-text-muted font-normal">
            / {formatCurrency(total)}
          </span>
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className={cn(
            'h-full rounded-full',
            pct >= 80 ? 'bg-error' : pct >= 50 ? 'bg-warning' : 'bg-uhc-blue',
          )}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
      {children}
    </h3>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CoverageSummaryCard({ result }: CoverageSummaryCardProps) {
  const statusInfo = STATUS_VARIANT[result.coverageStatus];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="space-y-5">
        {/* ---- Member Info & Coverage Status ---- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-uhc-blue-50">
              <User className="h-5 w-5 text-uhc-blue" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-text-primary">
                {result.memberName}
              </h2>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-text-secondary">
                <span>
                  <span className="text-text-muted">Member ID:</span>{' '}
                  {result.memberId}
                </span>
                <span>
                  <span className="text-text-muted">DOB:</span>{' '}
                  {formatDate(result.dob)}
                </span>
                <span>
                  <span className="text-text-muted">Subscriber:</span>{' '}
                  {result.subscriberId}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-text-secondary">
                <span>
                  <span className="text-text-muted">Group:</span>{' '}
                  {result.groupNumber} &mdash; {result.groupName}
                </span>
              </div>
            </div>
          </div>

          <Badge variant={statusInfo.variant} className="shrink-0">
            {statusInfo.label}
          </Badge>
        </div>

        <hr className="border-border" />

        {/* ---- Plan Info ---- */}
        <div>
          <SectionTitle>Plan Information</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InfoField label="Plan Type" value={result.planType} />
            <InfoField label="Plan Name" value={result.planName} />
            <InfoField label="Effective Date" value={formatDate(result.effectiveDate)} />
            <InfoField
              label="Termination Date"
              value={result.terminationDate ? formatDate(result.terminationDate) : 'N/A'}
            />
          </div>
        </div>

        {/* ---- PCP ---- */}
        <div>
          <SectionTitle>Primary Care Provider</SectionTitle>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-light">
              <Stethoscope className="h-4 w-4 text-teal" />
            </div>
            <div className="text-[13px]">
              <p className="font-medium text-text-primary">{result.pcpName}</p>
              <p className="text-[11px] text-text-muted">NPI: {result.pcpNpi}</p>
            </div>
          </div>
        </div>

        <hr className="border-border" />

        {/* ---- Copays Grid ---- */}
        <div>
          <SectionTitle>Copays</SectionTitle>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <CopayCard label="Primary Care" amount={result.copay.primaryCare} />
            <CopayCard label="Specialist" amount={result.copay.specialist} />
            <CopayCard label="Urgent Care" amount={result.copay.urgentCare} />
            <CopayCard label="Emergency Room" amount={result.copay.er} />
          </div>
        </div>

        <hr className="border-border" />

        {/* ---- Deductible Progress ---- */}
        <div>
          <SectionTitle>Deductible</SectionTitle>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ProgressBar
              label="Individual"
              met={result.deductible.individualMet}
              total={result.deductible.individual}
            />
            <ProgressBar
              label="Family"
              met={result.deductible.familyMet}
              total={result.deductible.family}
            />
          </div>
        </div>

        {/* ---- Out-of-Pocket Max Progress ---- */}
        <div>
          <SectionTitle>Out-of-Pocket Maximum</SectionTitle>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ProgressBar
              label="Individual"
              met={result.outOfPocketMax.individualMet}
              total={result.outOfPocketMax.individual}
            />
            <ProgressBar
              label="Family"
              met={result.outOfPocketMax.familyMet}
              total={result.outOfPocketMax.family}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-3 py-2.5">
      <p className="text-[10px] text-text-muted">{label}</p>
      <p className="mt-0.5 text-[13px] font-medium text-text-primary">{value}</p>
    </div>
  );
}

function CopayCard({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-3 py-2.5">
      <CreditCard className="h-4 w-4 shrink-0 text-text-muted" />
      <div>
        <p className="text-[10px] text-text-muted">{label}</p>
        <p className="text-[13px] font-semibold text-text-primary">
          {formatCurrency(amount)}
        </p>
      </div>
    </div>
  );
}
