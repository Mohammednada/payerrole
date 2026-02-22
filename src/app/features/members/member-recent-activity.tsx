import { useState } from 'react';
import { Activity, FileText, ShieldCheck } from 'lucide-react';
import type { MemberClaim, MemberPA } from '../../../shared/types';
import { formatDate, formatCurrency } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { Tabs } from '../../../shared/components/ui/tabs';
import { StatusBadge } from '../../../shared/components/ui/status-badge';
import { EmptyState } from '../../../shared/components/ui/empty-state';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MemberRecentActivityProps {
  claims: MemberClaim[];
  pas: MemberPA[];
}

/* ------------------------------------------------------------------ */
/*  Tab definitions                                                    */
/* ------------------------------------------------------------------ */

const TABS = [
  { id: 'claims', label: 'Recent Claims' },
  { id: 'pas', label: 'Recent PAs' },
] as const;

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ClaimsTable({ claims }: { claims: MemberClaim[] }) {
  if (claims.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No recent claims"
        description="No claims have been submitted for this member recently."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Claim #
            </th>
            <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Service Date
            </th>
            <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Provider
            </th>
            <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Amount
            </th>
            <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {claims.map((claim) => (
            <tr
              key={claim.claimNumber}
              className="hover:bg-surface/50 transition-colors duration-100"
            >
              <td className="px-4 py-3 font-medium text-uhc-blue whitespace-nowrap">
                {claim.claimNumber}
              </td>
              <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                {formatDate(claim.serviceDate)}
              </td>
              <td className="px-4 py-3 text-text-primary whitespace-nowrap">
                {claim.provider}
              </td>
              <td className="px-4 py-3 text-right font-medium text-text-primary whitespace-nowrap">
                {formatCurrency(claim.amount)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <StatusBadge status={claim.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PAsTable({ pas }: { pas: MemberPA[] }) {
  if (pas.length === 0) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="No recent prior authorizations"
        description="No prior authorizations have been filed for this member recently."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Auth #
            </th>
            <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Request Date
            </th>
            <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Service
            </th>
            <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {pas.map((pa) => (
            <tr
              key={pa.authNumber}
              className="hover:bg-surface/50 transition-colors duration-100"
            >
              <td className="px-4 py-3 font-medium text-uhc-blue whitespace-nowrap">
                {pa.authNumber}
              </td>
              <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                {formatDate(pa.requestDate)}
              </td>
              <td className="px-4 py-3 text-text-primary">
                {pa.service}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <StatusBadge status={pa.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MemberRecentActivity({
  claims,
  pas,
}: MemberRecentActivityProps) {
  const [activeTab, setActiveTab] = useState<string>('claims');

  return (
    <Card padding={false}>
      {/* Header */}
      <div className="flex items-center gap-2 px-5 pt-5 pb-2">
        <Activity className="h-4 w-4 text-text-muted" />
        <h3 className="text-[14px] font-semibold text-text-primary">
          Recent Activity
        </h3>
      </div>

      {/* Tabs */}
      <div className="px-5">
        <Tabs tabs={[...TABS]} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab content */}
      <div className="pt-2 pb-2">
        {activeTab === 'claims' && <ClaimsTable claims={claims} />}
        {activeTab === 'pas' && <PAsTable pas={pas} />}
      </div>
    </Card>
  );
}
