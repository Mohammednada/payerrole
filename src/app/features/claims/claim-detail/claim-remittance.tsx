import { Download, Banknote } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '../../../../shared/lib/utils';
import { Card } from '../../../../shared/components/ui/card';
import { Button } from '../../../../shared/components/ui/button';
import type { Claim } from '../../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ClaimRemittanceProps {
  claim: Claim;
}

/* ------------------------------------------------------------------ */
/*  Detail row helper                                                  */
/* ------------------------------------------------------------------ */

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0">
      <span className="text-[13px] text-text-secondary">{label}</span>
      <span className="text-[13px] font-medium text-text-primary">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ClaimRemittance({ claim }: ClaimRemittanceProps) {
  const hasRemittance = !!claim.remittanceId;

  if (!hasRemittance) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Banknote className="h-7 w-7 text-text-muted" />
          </div>
          <h3 className="text-[14px] font-semibold text-text-primary">No Remittance Available</h3>
          <p className="mt-1 max-w-sm text-[13px] text-text-muted">
            Remittance information is not yet available for this claim. This may be because the claim
            has not been processed or payment has not been issued.
          </p>
        </div>
      </Card>
    );
  }

  /* Mock payment details derived from claim data */
  const mockCheckNumber = `EFT-${claim.remittanceId?.replace('REM-', '') ?? '000000'}`;
  const paymentMethod = 'Electronic Funds Transfer (EFT)';

  return (
    <div className="space-y-5">
      {/* Remittance header */}
      <Card>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success-light">
              <Banknote className="h-5 w-5 text-success" />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold text-text-primary">
                Remittance Advice
              </h2>
              <p className="text-[13px] text-text-secondary">
                {claim.remittanceId}
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={<Download className="h-4 w-4" />}
            onClick={() => {
              /* no-op: download remittance */
            }}
          >
            Download Remittance
          </Button>
        </div>
      </Card>

      {/* Payment details */}
      <Card>
        <h3 className="mb-3 text-[14px] font-semibold text-text-primary">Payment Details</h3>
        <div>
          <DetailRow label="Remittance ID" value={claim.remittanceId ?? 'N/A'} />
          <DetailRow label="Payment Method" value={paymentMethod} />
          <DetailRow label="Check / EFT Number" value={mockCheckNumber} />
          <DetailRow
            label="Paid Date"
            value={claim.paidDate ? formatDate(claim.paidDate) : 'N/A'}
          />
          <DetailRow
            label="Paid Amount"
            value={
              <span className={cn('font-semibold', claim.paidAmount > 0 ? 'text-success' : 'text-text-muted')}>
                {formatCurrency(claim.paidAmount)}
              </span>
            }
          />
        </div>
      </Card>

      {/* Provider info */}
      <Card>
        <h3 className="mb-3 text-[14px] font-semibold text-text-primary">Provider Information</h3>
        <div>
          <DetailRow label="Provider Name" value={claim.providerName} />
          <DetailRow label="Provider NPI" value={claim.providerNpi} />
          <DetailRow label="Claim Number" value={claim.claimNumber} />
          <DetailRow
            label="Service Date"
            value={formatDate(claim.serviceDate)}
          />
          <DetailRow
            label="Billed Amount"
            value={formatCurrency(claim.billedAmount)}
          />
          <DetailRow
            label="Allowed Amount"
            value={
              claim.allowedAmount > 0
                ? formatCurrency(claim.allowedAmount)
                : 'N/A'
            }
          />
        </div>
      </Card>
    </div>
  );
}
