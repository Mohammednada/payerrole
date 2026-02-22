import { cn, formatCurrency, formatDate } from '../../../../shared/lib/utils';
import { Card } from '../../../../shared/components/ui/card';
import type { ClaimLineItem } from '../../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ClaimLineItemsProps {
  lineItems: ClaimLineItem[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ClaimLineItems({ lineItems }: ClaimLineItemsProps) {
  const totalBilled = lineItems.reduce((sum, li) => sum + li.billedAmount, 0);
  const totalAllowed = lineItems.reduce((sum, li) => sum + li.allowedAmount, 0);
  const totalPaid = lineItems.reduce((sum, li) => sum + li.paidAmount, 0);

  if (lineItems.length === 0) {
    return (
      <Card>
        <p className="py-8 text-center text-[13px] text-text-muted">
          No line items available for this claim.
        </p>
      </Card>
    );
  }

  return (
    <Card padding={false}>
      <div className="overflow-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Line #
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                CPT Code
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Description
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Service Date
              </th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Units
              </th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Billed
              </th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Allowed
              </th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Paid
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
                Adjustment Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, idx) => (
              <tr
                key={item.lineNumber}
                className={cn(
                  'border-b border-border last:border-b-0 transition-colors hover:bg-surface',
                  idx % 2 === 1 && 'bg-surface/50',
                )}
              >
                <td className="px-4 py-3 text-text-primary font-medium">{item.lineNumber}</td>
                <td className="px-4 py-3">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-mono font-medium text-text-secondary">
                    {item.cptCode}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-primary">{item.description}</td>
                <td className="px-4 py-3 text-text-secondary">{formatDate(item.serviceDate)}</td>
                <td className="px-4 py-3 text-right text-text-primary">{item.units}</td>
                <td className="px-4 py-3 text-right font-medium text-text-primary">
                  {formatCurrency(item.billedAmount)}
                </td>
                <td className="px-4 py-3 text-right font-medium text-text-primary">
                  {item.allowedAmount > 0 ? formatCurrency(item.allowedAmount) : '\u2014'}
                </td>
                <td className={cn(
                  'px-4 py-3 text-right font-medium',
                  item.paidAmount > 0 ? 'text-success' : 'text-text-muted',
                )}>
                  {item.paidAmount > 0 ? formatCurrency(item.paidAmount) : '\u2014'}
                </td>
                <td className="px-4 py-3 text-[11px] text-text-muted max-w-[200px] truncate">
                  {item.adjustmentReason ?? '\u2014'}
                </td>
              </tr>
            ))}

            {/* Totals row */}
            <tr className="bg-surface font-semibold border-t-2 border-border">
              <td className="px-4 py-3 text-text-primary" colSpan={5}>
                Totals
              </td>
              <td className="px-4 py-3 text-right text-text-primary">
                {formatCurrency(totalBilled)}
              </td>
              <td className="px-4 py-3 text-right text-text-primary">
                {totalAllowed > 0 ? formatCurrency(totalAllowed) : '\u2014'}
              </td>
              <td className={cn(
                'px-4 py-3 text-right',
                totalPaid > 0 ? 'text-success' : 'text-text-muted',
              )}>
                {totalPaid > 0 ? formatCurrency(totalPaid) : '\u2014'}
              </td>
              <td className="px-4 py-3" />
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
