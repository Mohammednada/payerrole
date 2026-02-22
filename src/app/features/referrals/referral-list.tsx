import { useState, useMemo } from 'react';
import { Plus, FileText } from 'lucide-react';
import type { Referral } from '../../../shared/types';
import { formatDate } from '../../../shared/lib/utils';
import { mockReferrals } from '../../../mock/referrals';
import { usePagination } from '../../../shared/hooks/use-pagination';
import { DataTable, type Column } from '../../../shared/components/ui/data-table';
import { SearchInput } from '../../../shared/components/ui/search-input';
import { Pagination } from '../../../shared/components/ui/pagination';
import { StatusBadge } from '../../../shared/components/ui/status-badge';
import { Badge } from '../../../shared/components/ui/badge';
import { Button } from '../../../shared/components/ui/button';
import { EmptyState } from '../../../shared/components/ui/empty-state';
import { ReferralFilters } from './referral-filters';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ReferralListProps {
  onSelect: (referral: Referral) => void;
  onNewReferral: () => void;
}

/* ------------------------------------------------------------------ */
/*  Table row type (flat for DataTable generic constraint)             */
/* ------------------------------------------------------------------ */

type ReferralRow = {
  id: string;
  referralNumber: string;
  memberName: string;
  referringProvider: string;
  referredToProvider: string;
  specialty: string;
  status: string;
  requestDate: string;
  usedVisits: number;
  authorizedVisits: number;
  urgency: string;
  /** Reference to the original Referral for row click */
  _source: Referral;
  [key: string]: unknown;
};

/* ------------------------------------------------------------------ */
/*  Columns                                                            */
/* ------------------------------------------------------------------ */

const columns: Column<ReferralRow>[] = [
  {
    key: 'referralNumber',
    label: 'Referral #',
    sortable: true,
    render: (val) => (
      <span className="font-medium text-uhc-blue">{val as string}</span>
    ),
  },
  { key: 'memberName', label: 'Member', sortable: true },
  { key: 'referringProvider', label: 'Referring Provider', sortable: true },
  { key: 'referredToProvider', label: 'Referred To', sortable: true },
  {
    key: 'specialty',
    label: 'Specialty',
    sortable: true,
    render: (val) => (
      <Badge variant="default">{val as string}</Badge>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (_val, row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'requestDate',
    label: 'Request Date',
    sortable: true,
    render: (val) => formatDate(val as string),
  },
  {
    key: 'usedVisits',
    label: 'Visits',
    sortable: false,
    render: (_val, row) => (
      <span className="text-[13px]">
        <span className="font-medium">{row.usedVisits as number}</span>
        <span className="text-text-muted"> / {row.authorizedVisits as number}</span>
      </span>
    ),
  },
  {
    key: 'urgency',
    label: 'Urgency',
    sortable: true,
    render: (val) => {
      const urgency = val as string;
      return (
        <Badge variant={urgency === 'urgent' ? 'error' : 'info'}>
          {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
        </Badge>
      );
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ReferralList({ onSelect, onNewReferral }: ReferralListProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  /* -- Filtering -- */
  const filteredData = useMemo(() => {
    let result = mockReferrals;

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((r) => r.status === statusFilter);
    }

    // Search filter
    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.memberName.toLowerCase().includes(lower) ||
          r.referralNumber.toLowerCase().includes(lower),
      );
    }

    return result;
  }, [search, statusFilter]);

  /* -- Pagination -- */
  const { currentPage, totalPages, pageSize, paginatedRange, goToPage } =
    usePagination({ totalItems: filteredData.length, pageSize: 10 });

  const paginatedData = filteredData.slice(paginatedRange.start, paginatedRange.end);

  /* -- Map to row shape -- */
  const rows: ReferralRow[] = paginatedData.map((r) => ({
    id: r.id,
    referralNumber: r.referralNumber,
    memberName: r.memberName,
    referringProvider: r.referringProvider,
    referredToProvider: r.referredToProvider,
    specialty: r.specialty,
    status: r.status,
    requestDate: r.requestDate,
    usedVisits: r.usedVisits,
    authorizedVisits: r.authorizedVisits,
    urgency: r.urgency,
    _source: r,
  }));

  /* -- Handlers -- */
  const handleRowClick = (row: ReferralRow) => {
    onSelect(row._source);
  };

  /* -- Render -- */
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[16px] font-semibold text-text-primary">
            Referrals
          </h1>
          <p className="mt-1 text-[13px] text-text-secondary">
            Manage and track member referrals to specialists.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={onNewReferral}
        >
          New Referral
        </Button>
      </div>

      {/* Filters */}
      <ReferralFilters activeFilter={statusFilter} onFilterChange={setStatusFilter} />

      {/* Search */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by member name or referral number..."
        className="max-w-md"
      />

      {/* Table */}
      {filteredData.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No referrals found"
          description="No referrals match your current search or filter criteria."
        />
      ) : (
        <DataTable<ReferralRow>
          columns={columns}
          data={rows}
          onRowClick={handleRowClick}
          sortable
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={filteredData.length}
            pageSize={pageSize}
          />
        </DataTable>
      )}
    </div>
  );
}
