import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search\u2026',
  className,
}: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'h-10 w-full rounded-lg border border-border bg-[#f3f3f5] pl-9 pr-8 text-[13px] text-text-primary',
          'placeholder:text-text-muted',
          'outline-none transition-colors',
          'focus:border-uhc-blue focus:ring-1 focus:ring-uhc-blue/20',
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-text-muted transition-colors hover:bg-surface hover:text-text-secondary"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
