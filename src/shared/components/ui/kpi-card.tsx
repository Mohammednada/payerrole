import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  className?: string;
}

export function KpiCard({ title, value, change, icon: Icon, className }: KpiCardProps) {
  const isPositive = change >= 0;

  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card p-5',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">{title}</p>
          <p className="text-[18px] font-bold text-text-primary">{value}</p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-uhc-blue-50">
          <Icon className="h-5 w-5 text-uhc-blue" />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-success" />
        ) : (
          <TrendingDown className="h-4 w-4 text-error" />
        )}
        <span
          className={cn(
            'text-[11px] font-medium',
            isPositive ? 'text-success' : 'text-error',
          )}
        >
          {isPositive ? '+' : ''}
          {change.toFixed(1)}%
        </span>
        <span className="text-[10px] text-text-muted">vs last period</span>
      </div>
    </div>
  );
}
