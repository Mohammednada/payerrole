import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '../../../shared/lib/utils';
import { DataTable, type Column } from '../../../shared/components/ui/data-table';
import { StatusBadge } from '../../../shared/components/ui/status-badge';
import { Badge } from '../../../shared/components/ui/badge';
import { SearchInput } from '../../../shared/components/ui/search-input';
import { Pagination } from '../../../shared/components/ui/pagination';
import { EmptyState } from '../../../shared/components/ui/empty-state';
import { usePagination } from '../../../shared/hooks/use-pagination';
import { ClaimsFilters, type ClaimFilterValue } from './claims-filters';
import { mockClaims } from '../../../mock/claims';
import type { Claim } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ClaimsListProps {
  onSelect: (claim: Claim) => void;
}

/* ------------------------------------------------------------------ */
/*  Claim type badge variants                                          */
/* ------------------------------------------------------------------ */

const TYPE_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'info' | 'teal'> = {
  professional: 'default',
  institutional: 'info',
  dental: 'teal',
  pharmacy: 'warning',
};

/* ------------------------------------------------------------------ */
/*  Table columns                                                      */
/* ------------------------------------------------------------------ */

const columns: Column<Record<string, unknown>>[] = [
  {
    key: 'claimNumber',
    label: 'Claim #',
    sortable: true,
    render: (val) => (
      <span className="font-medium text-uhc-blue">{val as string}</span>
    ),
  },
  {
    key: 'memberName',
    label: 'Member',
    sortable: true,
  },
  {
    key: 'providerName',
    label: 'Provider',
    sortable: true,
  },
  {
    key: 'type',
    label: 'Type',
    sortable: true,
    render: (val) => {
      const type = val as string;
      return (
        <Badge variant={TYPE_VARIANT[type] ?? 'default'}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      );
    },
  },
  {
    key: 'serviceDate',
    label: 'Service Date',
    sortable: true,
    render: (val) => formatDate(val as string),
  },
  {
    key: 'submittedDate',
    label: 'Submitted',
    sortable: true,
    render: (val) => formatDate(val as string),
  },
  {
    key: 'billedAmount',
    label: 'Billed Amt',
    sortable: true,
    render: (val) => (
      <span className="font-medium">{formatCurrency(val as number)}</span>
    ),
  },
  {
    key: 'paidAmount',
    label: 'Paid Amt',
    sortable: true,
    render: (val) => {
      const amount = val as number;
      return (
        <span className={cn('font-medium', amount > 0 ? 'text-success' : 'text-text-muted')}>
          {formatCurrency(amount)}
        </span>
      );
    },
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (val) => <StatusBadge status={val as string} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ClaimsList({ onSelect }: ClaimsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ClaimFilterValue>('all');

  /* ---- Filter + search ---- */

  const filteredClaims = useMemo(() => {
    let result = mockClaims;

    // Status filter
    if (activeFilter !== 'all') {
      result = result.filter((c) => c.status === activeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.memberName.toLowerCase().includes(lower) ||
          c.claimNumber.toLowerCase().includes(lower),
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  /* ---- Pagination ---- */

  const {
    currentPage,
    totalPages,
    pageSize,
    paginatedRange,
    goToPage,
  } = usePagination({ totalItems: filteredClaims.length, pageSize: 10 });

  const pageData = useMemo(
    () => filteredClaims.slice(paginatedRange.start, paginatedRange.end),
    [filteredClaims, paginatedRange],
  );

  /* ---- Row data cast for DataTable ---- */

  const tableData = pageData as unknown as Record<string, unknown>[];

  /* ---- Render ---- */

  return (
    <div className="space-y-5">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h1 className="text-[16px] font-semibold text-text-primary">Claims</h1>
        <p className="mt-1 text-[13px] text-text-secondary">
          View and manage submitted claims across all providers
        </p>
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="space-y-3"
      >
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by member name or claim number..."
          className="max-w-md"
        />
        <ClaimsFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        {filteredClaims.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No claims found"
            description="No claims match your current filters. Try adjusting your search or filter criteria."
          />
        ) : (
          <DataTable
            columns={columns}
            data={tableData}
            onRowClick={(row) => onSelect(row as unknown as Claim)}
            sortable
            emptyMessage="No claims found."
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              totalItems={filteredClaims.length}
              pageSize={pageSize}
            />
          </DataTable>
        )}
      </motion.div>
    </div>
  );
}
