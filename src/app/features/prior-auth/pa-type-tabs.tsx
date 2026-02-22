import { cn } from '../../../shared/lib/utils';
import type { PaType } from '../../../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type PaTypeFilterValue = 'all' | PaType;

interface TypeDef {
  value: PaTypeFilterValue;
  label: string;
}

interface PaTypeTabsProps {
  activeType: PaTypeFilterValue;
  onTypeChange: (type: PaTypeFilterValue) => void;
  typeCounts: Record<PaTypeFilterValue, number>;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TYPE_DEFS: TypeDef[] = [
  { value: 'all', label: 'All' },
  { value: 'inpatient', label: 'Inpatient' },
  { value: 'outpatient', label: 'Outpatient' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'imaging', label: 'Imaging' },
  { value: 'DME', label: 'DME' },
  { value: 'home-health', label: 'Home Health' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PaTypeTabs({ activeType, onTypeChange, typeCounts, className }: PaTypeTabsProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {TYPE_DEFS.map((def) => {
        const isActive = activeType === def.value;
        const count = typeCounts[def.value] ?? 0;

        return (
          <button
            key={def.value}
            type="button"
            onClick={() => onTypeChange(def.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors',
              isActive
                ? 'border-uhc-blue bg-uhc-blue/10 text-uhc-blue'
                : 'border-border bg-white text-text-secondary hover:border-border-dark hover:text-text-primary',
            )}
          >
            {def.label}
            <span
              className={cn(
                'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold',
                isActive ? 'bg-uhc-blue text-white' : 'bg-surface text-text-muted',
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
