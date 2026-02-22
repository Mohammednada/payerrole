import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  dark?: boolean;
}

export function Breadcrumbs({ items, className, dark }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1 text-[12px]">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1">
              {idx > 0 && (
                <ChevronRight className={cn("h-3.5 w-3.5 shrink-0", dark ? "text-white/40" : "text-text-muted")} />
              )}
              {isLast ? (
                <span className={cn("font-semibold", dark ? "text-white" : "text-text-primary")}>
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={cn("transition-colors hover:underline", dark ? "text-white/60 hover:text-white" : "text-text-secondary hover:text-uhc-blue")}
                >
                  {item.label}
                </button>
              ) : (
                <span className={dark ? "text-white/60" : "text-text-secondary"}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
