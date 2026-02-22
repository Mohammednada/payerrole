import { cn } from '../../lib/utils';

type PriorityConfig = {
  label: string;
  bg: string;
  text: string;
};

const PRIORITY_MAP: Record<string, PriorityConfig> = {
  standard: { label: 'Standard', bg: 'bg-gray-100',    text: 'text-gray-600' },
  routine:  { label: 'Routine',  bg: 'bg-info-light',  text: 'text-uhc-blue' },
  urgent:   { label: 'Urgent',   bg: 'bg-warning-light', text: 'text-orange-600' },
  emergent: { label: 'Emergent', bg: 'bg-error-light', text: 'text-error' },
};

const FALLBACK: PriorityConfig = {
  label: '',
  bg: 'bg-gray-100',
  text: 'text-gray-600',
};

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const key = priority.toLowerCase().trim();
  const config = PRIORITY_MAP[key] ?? { ...FALLBACK, label: priority };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium',
        config.bg,
        config.text,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
