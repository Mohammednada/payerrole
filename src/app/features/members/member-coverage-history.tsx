import { History } from 'lucide-react';
import type { CoverageHistoryItem } from '../../../shared/types';
import { formatDate } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { StatusBadge } from '../../../shared/components/ui/status-badge';
import { EmptyState } from '../../../shared/components/ui/empty-state';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MemberCoverageHistoryProps {
  history: CoverageHistoryItem[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MemberCoverageHistory({
  history,
}: MemberCoverageHistoryProps) {
  return (
    <Card padding={false} className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 pt-5 pb-3">
        <History className="h-4 w-4 text-text-muted" />
        <h3 className="text-[14px] font-semibold text-text-primary">
          Coverage History
        </h3>
      </div>

      {/* Content */}
      {history.length === 0 ? (
        <div className="px-5 pb-5">
          <EmptyState
            icon={History}
            title="No coverage history"
            description="No prior coverage records found for this member."
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-y border-border bg-surface">
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Plan Name
                </th>
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Type
                </th>
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Effective
                </th>
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Terminated
                </th>
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((entry, index) => (
                <tr
                  key={`${entry.planName}-${entry.effectiveDate}-${index}`}
                  className="hover:bg-surface/50 transition-colors duration-100"
                >
                  <td className="px-4 py-3 font-medium text-text-primary whitespace-nowrap">
                    {entry.planName}
                  </td>
                  <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                    {entry.planType}
                  </td>
                  <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                    {formatDate(entry.effectiveDate)}
                  </td>
                  <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                    {entry.terminationDate
                      ? formatDate(entry.terminationDate)
                      : '\u2014'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={entry.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
