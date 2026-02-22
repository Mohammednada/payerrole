import { cn } from '../../../shared/lib/utils';
import type { ReferralStatus } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ReferralFilterValue = 'all' | ReferralStatus;

interface FilterDef {
  value: ReferralFilterValue;
  label: string;
}

interface ReferralFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FILTERS: FilterDef[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-review', label: 'In Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'denied', label: 'Denied' },
  { value: 'completed', label: 'Completed' },
  { value: 'expired', label: 'Expired' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ReferralFilters({ activeFilter, onFilterChange, className }: ReferralFiltersProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
              isActive
                ? 'border-uhc-blue bg-uhc-blue text-white'
                : 'border-gray-300 bg-white text-text-secondary hover:border-gray-400',
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
