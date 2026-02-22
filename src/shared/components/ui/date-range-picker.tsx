import { cn } from '../../lib/utils';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  className?: string;
}

const inputClasses = cn(
  'h-10 w-full rounded-md border border-border bg-[#f3f3f5] px-3 py-2 text-[13px] text-text-primary',
  'outline-none transition-colors',
  'focus:border-uhc-blue focus:ring-1 focus:ring-uhc-blue/20',
);

export function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex flex-col gap-1">
        <label className="text-[13px] font-medium text-text-primary">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          max={endDate || undefined}
          onChange={(e) => onStartChange(e.target.value)}
          className={inputClasses}
        />
      </div>
      <span className="mt-5 text-text-muted">&ndash;</span>
      <div className="flex flex-col gap-1">
        <label className="text-[13px] font-medium text-text-primary">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          min={startDate || undefined}
          onChange={(e) => onEndChange(e.target.value)}
          className={inputClasses}
        />
      </div>
    </div>
  );
}
