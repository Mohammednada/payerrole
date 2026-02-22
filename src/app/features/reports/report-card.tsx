import {
  Clock,
  DollarSign,
  TrendingDown,
  CheckCircle,
  PieChart as PieChartIcon,
  BarChart3,
  Users,
  Shield,
} from 'lucide-react';
import { cn, formatDateLong } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';
import type { Report } from '../../../shared/types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  DollarSign,
  TrendingDown,
  CheckCircle,
  PieChart: PieChartIcon,
  BarChart3,
  Users,
  Shield,
};

const FREQUENCY_VARIANT: Record<string, 'default' | 'success' | 'info' | 'teal'> = {
  daily: 'success',
  weekly: 'default',
  monthly: 'info',
  quarterly: 'teal',
};

interface ReportCardProps {
  report: Report;
  onClick: () => void;
}

export function ReportCard({ report, onClick }: ReportCardProps) {
  const Icon = ICON_MAP[report.icon] ?? BarChart3;
  const variant = FREQUENCY_VARIANT[report.frequency] ?? 'default';

  return (
    <Card
      className={cn(
        'group flex flex-col gap-3 transition-all duration-200',
        'hover:bg-[#f0f2f4]',
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl',
            'bg-uhc-blue-50 text-uhc-blue transition-colors duration-200',
            'group-hover:bg-uhc-blue group-hover:text-white',
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <Badge variant={variant} className="capitalize">
          {report.frequency}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-[13px] font-semibold text-text-primary">
          {report.title}
        </h3>
        <p className="text-[11px] leading-relaxed text-text-secondary line-clamp-2">
          {report.description}
        </p>
      </div>

      <p className="text-[10px] text-text-muted">
        Last generated {formatDateLong(report.lastGenerated)}
      </p>
    </Card>
  );
}
