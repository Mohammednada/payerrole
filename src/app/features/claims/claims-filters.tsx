import { cn } from '../../../shared/lib/utils';
import type { ClaimStatus } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ClaimFilterValue = 'all' | ClaimStatus;

interface ClaimsFiltersProps {
  activeFilter: ClaimFilterValue;
  onFilterChange: (filter: ClaimFilterValue) => void;
}

/* ------------------------------------------------------------------ */
/*  Filter definitions                                                 */
/* ------------------------------------------------------------------ */

const FILTER_OPTIONS: { value: ClaimFilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'in-process', label: 'In Process' },
  { value: 'paid', label: 'Paid' },
  { value: 'denied', label: 'Denied' },
  { value: 'adjusted', label: 'Adjusted' },
  { value: 'pending-info', label: 'Pending Info' },
  { value: 'appealed', label: 'Appealed' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ClaimsFilters({ activeFilter, onFilterChange }: ClaimsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onFilterChange(option.value)}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
            activeFilter === option.value
              ? 'border-uhc-blue bg-uhc-blue text-white'
              : 'border-gray-300 bg-white text-text-secondary hover:border-gray-400',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
