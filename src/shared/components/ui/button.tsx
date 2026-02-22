import React from 'react';
import { cn } from '../../lib/utils';

const variantStyles = {
  primary:
    'bg-uhc-blue text-white hover:bg-uhc-blue-mid active:bg-uhc-blue-light disabled:bg-uhc-blue/50',
  secondary:
    'border border-uhc-blue text-uhc-blue bg-transparent hover:bg-uhc-blue-50 active:bg-uhc-blue-100 disabled:border-border disabled:text-text-muted',
  ghost:
    'bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary active:bg-uhc-blue-50 disabled:text-text-muted',
  danger:
    'bg-error text-white hover:bg-error/90 active:bg-error/80 disabled:bg-error/50',
} as const;

const sizeStyles = {
  sm: 'h-8 px-3 text-[12px] gap-1.5',
  md: 'h-10 px-4 text-[13px] gap-2',
  lg: 'h-11 px-5 text-[14px] gap-2',
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M14.5 8a6.5 6.5 0 0 0-6.5-6.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      icon,
      children,
      className,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-150 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uhc-blue disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <Spinner className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
