import { useState, useMemo, type ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface Column<T> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  sortable?: boolean;
  emptyMessage?: string;
  children?: ReactNode;
  className?: string;
}

type SortDirection = 'asc' | 'desc';

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  sortable = false,
  emptyMessage = 'No data available.',
  children,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortDir === 'asc' ? -1 : 1;
      if (bVal == null) return sortDir === 'asc' ? 1 : -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal);
      const bStr = String(bVal);
      return sortDir === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [data, sortKey, sortDir]);

  const isSortableColumn = (col: Column<T>) =>
    sortable && col.sortable !== false;

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="overflow-auto rounded-2xl border border-border">
        <table className="w-full text-[12px]">
          <thead className="sticky top-0 z-10 bg-surface">
            <tr>
              {columns.map((col) => {
                const canSort = isSortableColumn(col);
                const isActive = sortKey === col.key;

                return (
                  <th
                    key={col.key}
                    className={cn(
                      'px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted border-b border-border',
                      canSort && 'cursor-pointer select-none hover:text-text-primary',
                    )}
                    onClick={canSort ? () => handleSort(col.key) : undefined}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {canSort && isActive && (
                        sortDir === 'asc'
                          ? <ChevronUp className="h-3.5 w-3.5" />
                          : <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-[12px] text-text-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={cn(
                    'border-b border-border last:border-b-0 transition-colors',
                    rowIdx % 2 === 1 && 'bg-surface/50',
                    onRowClick && 'cursor-pointer hover:bg-uhc-blue-50',
                    !onRowClick && 'hover:bg-surface',
                  )}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-[12px] text-text-primary">
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] as ReactNode) ?? '\u2014'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
