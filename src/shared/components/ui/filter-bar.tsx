import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FilterChip {
  id: string;
  label: string;
  active: boolean;
}

interface FilterBarProps {
  filters: FilterChip[];
  onToggle: (id: string) => void;
  onClearAll: () => void;
  className?: string;
}

export function FilterBar({ filters, onToggle, onClearAll, className }: FilterBarProps) {
  const hasActive = filters.some((f) => f.active);

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onToggle(filter.id)}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
            filter.active
              ? 'border-uhc-blue bg-uhc-blue text-white'
              : 'border-border bg-white text-text-secondary hover:bg-[#f0f2f4]',
          )}
        >
          {filter.label}
        </button>
      ))}

      {hasActive && (
        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          <X className="h-3 w-3" />
          Clear all
        </button>
      )}
    </div>
  );
}
