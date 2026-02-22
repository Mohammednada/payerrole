import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 py-16 text-center',
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-uhc-blue-50">
        <Icon className="h-7 w-7 text-text-muted" />
      </div>

      <h3 className="text-[14px] font-semibold text-text-primary">{title}</h3>

      <p className="mt-1 max-w-sm text-[13px] text-text-muted">{description}</p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-xl bg-uhc-blue px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:opacity-90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
