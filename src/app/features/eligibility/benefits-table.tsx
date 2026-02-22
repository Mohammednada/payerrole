import { motion } from 'motion/react';
import { cn } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';
import type { BenefitRow } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BenefitsTableProps {
  benefits: BenefitRow[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADER_CELLS = [
  'Category',
  'In-Network',
  'Out-of-Network',
  'Auth Required',
  'Notes',
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function BenefitsTable({ benefits }: BenefitsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card padding={false}>
        <div className="px-5 pt-5 pb-3">
          <h3 className="text-[14px] font-semibold text-text-primary">
            Benefits Summary
          </h3>
          <p className="mt-1 text-[12px] text-text-muted">
            {benefits.length} benefit categories
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            {/* Sticky header */}
            <thead className="sticky top-0 z-10 bg-surface">
              <tr>
                {HEADER_CELLS.map((header) => (
                  <th
                    key={header}
                    className="whitespace-nowrap border-b border-border px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {benefits.map((row, i) => (
                <tr
                  key={row.category}
                  className={cn(
                    'transition-colors hover:bg-uhc-blue-50/40',
                    i % 2 === 0 ? 'bg-card' : 'bg-surface/50',
                  )}
                >
                  {/* Category */}
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-text-primary">
                    {row.category}
                  </td>

                  {/* In-Network */}
                  <td className="whitespace-nowrap px-4 py-3 text-text-secondary">
                    {row.inNetwork}
                  </td>

                  {/* Out-of-Network */}
                  <td className="whitespace-nowrap px-4 py-3 text-text-secondary">
                    {row.outOfNetwork}
                  </td>

                  {/* Auth Required */}
                  <td className="px-4 py-3">
                    {row.authRequired ? (
                      <Badge variant="warning">Yes</Badge>
                    ) : (
                      <Badge variant="success">No</Badge>
                    )}
                  </td>

                  {/* Notes */}
                  <td className="max-w-xs px-4 py-3 text-text-muted">
                    {row.notes ?? '\u2014'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
