import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  className,
}: PaginationProps) {
  const start = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const end = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always include first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }

    // Always include last page
    pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1 && totalItems <= pageSize) return null;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-3 sm:flex-row',
        className,
      )}
    >
      <p className="text-[12px] text-text-secondary">
        Showing{' '}
        <span className="font-medium text-text-primary">{start}</span>
        &ndash;
        <span className="font-medium text-text-primary">{end}</span>
        {' '}of{' '}
        <span className="font-medium text-text-primary">{totalItems}</span>
      </p>

      <nav className="flex items-center gap-1" aria-label="Pagination">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-[13px] transition-colors',
            currentPage <= 1
              ? 'cursor-not-allowed opacity-40'
              : 'hover:bg-[#f0f2f4] text-text-secondary',
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, idx) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${idx}`}
              className="inline-flex h-8 w-8 items-center justify-center text-[13px] text-text-muted"
            >
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={cn(
                'inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[13px] font-medium transition-colors',
                page === currentPage
                  ? 'bg-uhc-blue text-white'
                  : 'border border-border text-text-secondary hover:bg-[#f0f2f4]',
              )}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-[13px] transition-colors',
            currentPage >= totalPages
              ? 'cursor-not-allowed opacity-40'
              : 'hover:bg-[#f0f2f4] text-text-secondary',
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}
