import { useState, useMemo } from 'react';
import { Plus, ShieldCheck, BookOpen } from 'lucide-react';
import type { PriorAuth, PaType } from '../../../shared/types';
import { formatDate, formatCurrency } from '../../../shared/lib/utils';
import { mockPriorAuths } from '../../../mock/prior-auth';
import { usePagination } from '../../../shared/hooks/use-pagination';
import { DataTable, type Column } from '../../../shared/components/ui/data-table';
import { SearchInput } from '../../../shared/components/ui/search-input';
import { Pagination } from '../../../shared/components/ui/pagination';
import { StatusBadge } from '../../../shared/components/ui/status-badge';
import { PriorityBadge } from '../../../shared/components/ui/priority-badge';
import { Button } from '../../../shared/components/ui/button';
import { EmptyState } from '../../../shared/components/ui/empty-state';
import { PaFilters, type PaFilterValue } from './pa-filters';
import { PaTypeTabs, type PaTypeFilterValue } from './pa-type-tabs';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PaListProps {
  onSelect: (pa: PriorAuth) => void;
  onNewRequest: () => void;
  onViewRequirements?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Table row type (flat for DataTable generic constraint)             */
/* ------------------------------------------------------------------ */

type PaRow = {
  id: string;
  authNumber: string;
  memberName: string;
  providerName: string;
  serviceDescription: string;
  type: string;
  urgency: string;
  status: string;
  requestDate: string;
  estimatedCost: number;
  /** Reference to the original PriorAuth for row click */
  _source: PriorAuth;
  [key: string]: unknown;
};

/* ------------------------------------------------------------------ */
/*  Columns                                                            */
/* ------------------------------------------------------------------ */

const columns: Column<PaRow>[] = [
  {
    key: 'authNumber',
    label: 'Auth #',
    sortable: true,
    render: (val) => (
      <span className="font-medium text-uhc-blue">{val as string}</span>
    ),
  },
  { key: 'memberName', label: 'Member', sortable: true },
  { key: 'providerName', label: 'Provider', sortable: true },
  {
    key: 'serviceDescription',
    label: 'Service',
    sortable: false,
    render: (val) => (
      <span className="max-w-[200px] truncate block" title={val as string}>
        {val as string}
      </span>
    ),
  },
  {
    key: 'type',
    label: 'Type',
    sortable: true,
    render: (val) => (
      <span className="capitalize">{val as string}</span>
    ),
  },
  {
    key: 'urgency',
    label: 'Urgency',
    sortable: true,
    render: (_val, row) => <PriorityBadge priority={row.urgency} />,
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
    key: 'estimatedCost',
    label: 'Est. Cost',
    sortable: true,
    render: (val) => formatCurrency(val as number),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaList({ onSelect, onNewRequest, onViewRequirements }: PaListProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaFilterValue>('all');
  const [typeFilter, setTypeFilter] = useState<PaTypeFilterValue>('all');

  /* -- Type counts -- */
  const typeCounts = useMemo(() => {
    const counts: Record<PaTypeFilterValue, number> = {
      all: mockPriorAuths.length,
      inpatient: 0,
      outpatient: 0,
      pharmacy: 0,
      imaging: 0,
      DME: 0,
      'home-health': 0,
    };
    for (const pa of mockPriorAuths) {
      counts[pa.type as PaType]++;
    }
    return counts;
  }, []);

  /* -- Filtering -- */
  const filteredData = useMemo(() => {
    let result = mockPriorAuths;

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter((pa) => pa.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((pa) => pa.status === statusFilter);
    }

    // Search filter
    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(
        (pa) =>
          pa.memberName.toLowerCase().includes(lower) ||
          pa.authNumber.toLowerCase().includes(lower),
      );
    }

    return result;
  }, [search, statusFilter, typeFilter]);

  /* -- Pagination -- */
  const { currentPage, totalPages, pageSize, paginatedRange, goToPage } =
    usePagination({ totalItems: filteredData.length, pageSize: 10 });

  const paginatedData = filteredData.slice(paginatedRange.start, paginatedRange.end);

  /* -- Map to row shape -- */
  const rows: PaRow[] = paginatedData.map((pa) => ({
    id: pa.id,
    authNumber: pa.authNumber,
    memberName: pa.memberName,
    providerName: pa.providerName,
    serviceDescription: pa.serviceDescription,
    type: pa.type,
    urgency: pa.urgency,
    status: pa.status,
    requestDate: pa.requestDate,
    estimatedCost: pa.estimatedCost,
    _source: pa,
  }));

  /* -- Handlers -- */
  const handleRowClick = (row: PaRow) => {
    onSelect(row._source);
  };

  /* -- Render -- */
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[16px] font-semibold text-text-primary">
            Prior Authorizations
          </h1>
          <p className="mt-1 text-[13px] text-text-secondary">
            Manage and track prior authorization requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onViewRequirements && (
            <Button
              variant="secondary"
              icon={<BookOpen className="h-4 w-4" />}
              onClick={onViewRequirements}
            >
              PA Guidelines
            </Button>
          )}
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            onClick={onNewRequest}
          >
            New PA Request
          </Button>
        </div>
      </div>

      {/* Type tabs */}
      <PaTypeTabs
        activeType={typeFilter}
        onTypeChange={setTypeFilter}
        typeCounts={typeCounts}
      />

      {/* Status filters */}
      <PaFilters activeFilter={statusFilter} onFilterChange={setStatusFilter} />

      {/* Search */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by member name or auth number..."
        className="max-w-md"
      />

      {/* Table */}
      {filteredData.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="No authorizations found"
          description="No prior authorizations match your current search or filter criteria."
        />
      ) : (
        <DataTable<PaRow>
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
