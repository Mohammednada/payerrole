import { Download, FileText } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '../../../../shared/lib/utils';
import { Card } from '../../../../shared/components/ui/card';
import { Button } from '../../../../shared/components/ui/button';
import type { Claim } from '../../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ClaimEobProps {
  claim: Claim;
}

/* ------------------------------------------------------------------ */
/*  Summary row helper                                                 */
/* ------------------------------------------------------------------ */

function AmountRow({
  label,
  amount,
  variant = 'default',
  bold = false,
}: {
  label: string;
  amount: number;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'muted';
  bold?: boolean;
}) {
  const colorMap = {
    default: 'text-text-primary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    muted: 'text-text-muted',
  };

  return (
    <div className={cn('flex items-center justify-between py-2', bold && 'border-t border-border pt-3')}>
      <span className={cn('text-[13px]', bold ? 'font-semibold text-text-primary' : 'text-text-secondary')}>
        {label}
      </span>
      <span className={cn('text-[13px]', bold ? 'font-semibold' : 'font-medium', colorMap[variant])}>
        {formatCurrency(amount)}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ClaimEob({ claim }: ClaimEobProps) {
  return (
    <div className="space-y-5">
      {/* EOB header */}
      <Card>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-uhc-blue-50">
              <FileText className="h-5 w-5 text-uhc-blue" />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold text-text-primary">
                Explanation of Benefits
              </h2>
              <p className="text-[13px] text-text-secondary">
                {claim.claimNumber}
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={<Download className="h-4 w-4" />}
            onClick={() => {
              /* no-op: download EOB */
            }}
          >
            Download EOB
          </Button>
        </div>
      </Card>

      {/* Claim info summary */}
      <Card>
        <h3 className="mb-3 text-[14px] font-semibold text-text-primary">Claim Information</h3>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          <div className="flex justify-between sm:flex-col sm:gap-0.5">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Claim Number</dt>
            <dd className="text-[13px] font-medium text-text-primary">{claim.claimNumber}</dd>
          </div>
          <div className="flex justify-between sm:flex-col sm:gap-0.5">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Member</dt>
            <dd className="text-[13px] text-text-primary">
              {claim.memberName} ({claim.memberId})
            </dd>
          </div>
          <div className="flex justify-between sm:flex-col sm:gap-0.5">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Provider</dt>
            <dd className="text-[13px] text-text-primary">
              {claim.providerName} (NPI: {claim.providerNpi})
            </dd>
          </div>
          <div className="flex justify-between sm:flex-col sm:gap-0.5">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Service Date</dt>
            <dd className="text-[13px] text-text-primary">{formatDate(claim.serviceDate)}</dd>
          </div>
        </dl>
      </Card>

      {/* Amounts breakdown */}
      <Card>
        <h3 className="mb-3 text-[14px] font-semibold text-text-primary">Amounts</h3>
        <div className="divide-y-0">
          <AmountRow label="Billed Amount" amount={claim.billedAmount} />
          <AmountRow
            label="Allowed Amount"
            amount={claim.allowedAmount}
            variant={claim.allowedAmount > 0 ? 'default' : 'muted'}
          />
          <AmountRow
            label="Paid Amount"
            amount={claim.paidAmount}
            variant={claim.paidAmount > 0 ? 'success' : 'muted'}
          />
          <AmountRow
            label="Patient Responsibility"
            amount={claim.patientResponsibility}
            variant={claim.patientResponsibility > 0 ? 'warning' : 'muted'}
          />
          <AmountRow
            label="Adjustments"
            amount={claim.adjustmentAmount}
            variant={claim.adjustmentAmount > 0 ? 'error' : 'muted'}
          />
          <AmountRow
            label="Total (Paid + Patient + Adjustments)"
            amount={claim.paidAmount + claim.patientResponsibility + claim.adjustmentAmount}
            bold
          />
        </div>
      </Card>
    </div>
  );
}
