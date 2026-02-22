import React from 'react';
import { cn } from '../../lib/utils';

const variantStyles = {
  default: 'bg-uhc-blue-50 text-uhc-blue',
  success: 'bg-success-light text-success',
  error: 'bg-error-light text-error',
  warning: 'bg-warning-light text-warning',
  info: 'bg-info-light text-info',
  teal: 'bg-teal-light text-teal',
} as const;

export type BadgeVariant = keyof typeof variantStyles;

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
