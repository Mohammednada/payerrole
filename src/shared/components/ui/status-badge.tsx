import { cn } from '../../lib/utils';

type StatusConfig = {
  label: string;
  bg: string;
  text: string;
  dot: string;
};

const STATUS_MAP: Record<string, StatusConfig> = {
  approved:       { label: 'Approved',       bg: 'bg-success-light', text: 'text-success',  dot: 'bg-green-500' },
  active:         { label: 'Active',         bg: 'bg-success-light', text: 'text-success',  dot: 'bg-green-500' },
  paid:           { label: 'Paid',           bg: 'bg-success-light', text: 'text-success',  dot: 'bg-green-500' },
  denied:         { label: 'Denied',         bg: 'bg-error-light',   text: 'text-error',    dot: 'bg-red-500' },
  terminated:     { label: 'Terminated',     bg: 'bg-error-light',   text: 'text-error',    dot: 'bg-red-500' },
  pending:        { label: 'Pending',        bg: 'bg-warning-light', text: 'text-warning',  dot: 'bg-amber-500' },
  submitted:      { label: 'Submitted',      bg: 'bg-warning-light', text: 'text-warning',  dot: 'bg-amber-500' },
  inactive:       { label: 'Inactive',       bg: 'bg-warning-light', text: 'text-warning',  dot: 'bg-amber-500' },
  'in-review':    { label: 'In Review',      bg: 'bg-info-light',    text: 'text-uhc-blue', dot: 'bg-blue-500' },
  'in review':    { label: 'In Review',      bg: 'bg-info-light',    text: 'text-uhc-blue', dot: 'bg-blue-500' },
  'in-process':   { label: 'In Process',     bg: 'bg-info-light',    text: 'text-uhc-blue', dot: 'bg-blue-500' },
  'in process':   { label: 'In Process',     bg: 'bg-info-light',    text: 'text-uhc-blue', dot: 'bg-blue-500' },
  cancelled:      { label: 'Cancelled',      bg: 'bg-gray-100',      text: 'text-gray-500', dot: 'bg-gray-400' },
  expired:        { label: 'Expired',        bg: 'bg-gray-100',      text: 'text-gray-500', dot: 'bg-gray-400' },
  'info-requested':{ label: 'Info Requested', bg: 'bg-orange-50',     text: 'text-orange-600', dot: 'bg-orange-500' },
  'pending-info': { label: 'Pending Info',   bg: 'bg-orange-50',     text: 'text-orange-600', dot: 'bg-orange-500' },
  appealed:       { label: 'Appealed',       bg: 'bg-purple-50',     text: 'text-purple-600', dot: 'bg-purple-500' },
};

const FALLBACK: StatusConfig = {
  label: '',
  bg: 'bg-gray-100',
  text: 'text-gray-600',
  dot: 'bg-gray-400',
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const key = status.toLowerCase().trim();
  const config = STATUS_MAP[key] ?? { ...FALLBACK, label: status };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium',
        config.bg,
        config.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}
