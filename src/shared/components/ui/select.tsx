import React from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, value, ...props }, ref) => {
    const selectId =
      id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-[13px] font-medium text-text-primary"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            value={value}
            className={cn(
              'w-full h-10 rounded-lg border bg-[#f3f3f5] px-3 pr-8 py-2 text-[13px] text-text-primary appearance-none transition-colors duration-150 cursor-pointer',
              'focus:border-uhc-blue focus:ring-1 focus:ring-uhc-blue/20 outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface',
              error
                ? 'border-error focus:ring-error/30 focus:border-error'
                : 'border-border hover:border-border-dark',
              !value && placeholder && 'text-text-muted',
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              error && selectId ? `${selectId}-error` : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {error && (
          <p
            id={selectId ? `${selectId}-error` : undefined}
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

Select.displayName = 'Select';

export default Select;
