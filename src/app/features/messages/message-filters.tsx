import { cn } from '../../../shared/lib/utils';
import type { MessageCategory } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type MessageFilterValue = 'all' | MessageCategory;

interface FilterDef {
  value: MessageFilterValue;
  label: string;
}

interface MessageFiltersProps {
  activeFilter: MessageFilterValue;
  onFilterChange: (filter: MessageFilterValue) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FILTERS: FilterDef[] = [
  { value: 'all', label: 'All' },
  { value: 'claims', label: 'Claims' },
  { value: 'prior-auth', label: 'Prior Auth' },
  { value: 'eligibility', label: 'Eligibility' },
  { value: 'general', label: 'General' },
  { value: 'billing', label: 'Billing' },
  { value: 'technical', label: 'Technical' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MessageFilters({
  activeFilter,
  onFilterChange,
  className,
}: MessageFiltersProps) {
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
