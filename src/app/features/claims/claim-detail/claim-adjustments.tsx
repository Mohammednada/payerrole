import { cn, formatCurrency } from '../../../../shared/lib/utils';
import { Card } from '../../../../shared/components/ui/card';
import type { ClaimAdjustment } from '../../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ClaimAdjustmentsProps {
  adjustments: ClaimAdjustment[];
}

/* ------------------------------------------------------------------ */
/*  Group color mapping                                                */
/* ------------------------------------------------------------------ */

const GROUP_STYLES: Record<ClaimAdjustment['group'], { bg: string; text: string; label: string }> = {
  CO: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Contractual Obligation' },
  PR: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Patient Responsibility' },
  OA: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Other Adjustment' },
  PI: { bg: 'bg-teal-50', text: 'text-teal-700', label: 'Payer Initiated' },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ClaimAdjustments({ adjustments }: ClaimAdjustmentsProps) {
  if (adjustments.length === 0) {
    return (
      <Card>
        <p className="py-8 text-center text-[13px] text-text-muted">
          No adjustments recorded for this claim.
        </p>
      </Card>
    );
  }

  const totalAmount = adjustments.reduce((sum, adj) => sum + adj.amount, 0);

  return (
    <Card padding={false}>
      <div className="overflow-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Code
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Group
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Reason
              </th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {adjustments.map((adj, idx) => {
              const groupStyle = GROUP_STYLES[adj.group];

              return (
                <tr
                  key={`${adj.group}-${adj.code}-${idx}`}
                  className={cn(
                    'border-b border-border last:border-b-0 transition-colors hover:bg-surface',
                    idx % 2 === 1 && 'bg-surface/50',
                  )}
                >
                  <td className="px-4 py-3">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-mono font-medium text-text-secondary">
                      {adj.code}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium',
                        groupStyle.bg,
                        groupStyle.text,
                      )}
                    >
                      {adj.group}
                      <span className="hidden sm:inline">&mdash; {groupStyle.label}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-primary">{adj.reason}</td>
                  <td className="px-4 py-3 text-right font-medium text-error">
                    {formatCurrency(adj.amount)}
                  </td>
                </tr>
              );
            })}

            {/* Totals row */}
            <tr className="bg-surface font-semibold border-t-2 border-border">
              <td className="px-4 py-3 text-text-primary" colSpan={3}>
                Total Adjustments
              </td>
              <td className="px-4 py-3 text-right text-error">
                {formatCurrency(totalAmount)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
