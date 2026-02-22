import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-text-primary"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-10 rounded-lg border bg-[#f3f3f5] px-3 py-2 text-[13px] text-text-primary placeholder:text-text-muted transition-colors duration-150',
              'focus:border-uhc-blue focus:ring-1 focus:ring-uhc-blue/20 outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface',
              icon && 'pl-10',
              error
                ? 'border-error focus:ring-error/30 focus:border-error'
                : 'border-border hover:border-border-dark',
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error && inputId ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>

        {error && (
          <p
            id={inputId ? `${inputId}-error` : undefined}
            className="text-[10px] text-error"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
