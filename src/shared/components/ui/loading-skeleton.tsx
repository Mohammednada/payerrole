import { cn } from '../../lib/utils';

type SkeletonVariant = 'text' | 'card' | 'table' | 'avatar';

interface LoadingSkeletonProps {
  variant?: SkeletonVariant;
  count?: number;
  className?: string;
}

const pulse = 'animate-pulse rounded bg-gray-200';

export function LoadingSkeleton({
  variant = 'text',
  count = 5,
  className,
}: LoadingSkeletonProps) {
  if (variant === 'avatar') {
    return (
      <div className={cn(pulse, 'h-10 w-10 rounded-full', className)} />
    );
  }

  if (variant === 'text') {
    return (
      <div className={cn(pulse, 'h-4 w-full', className)} />
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn('overflow-hidden rounded-2xl border border-border', className)}>
        <div className={cn(pulse, 'h-40 w-full rounded-none')} />
        <div className="space-y-3 p-4">
          <div className={cn(pulse, 'h-4 w-3/4')} />
          <div className={cn(pulse, 'h-3 w-1/2')} />
        </div>
      </div>
    );
  }

  // table variant
  return (
    <div className={cn('w-full space-y-3', className)}>
      {/* Header row */}
      <div className="flex gap-4">
        <div className={cn(pulse, 'h-4 flex-[2]')} />
        <div className={cn(pulse, 'h-4 flex-[3]')} />
        <div className={cn(pulse, 'h-4 flex-[2]')} />
        <div className={cn(pulse, 'h-4 flex-1')} />
      </div>

      {/* Data rows */}
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className={cn(pulse, 'h-3 flex-[2]')} />
          <div className={cn(pulse, 'h-3 flex-[3]')} />
          <div className={cn(pulse, 'h-3 flex-[2]')} />
          <div className={cn(pulse, 'h-3 flex-1')} />
        </div>
      ))}
    </div>
  );
}
