import { useState, useMemo } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
}

export function usePagination({ totalItems, pageSize = 10, initialPage = 1 }: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedRange = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, totalItems);
    return { start, end };
  }, [currentPage, pageSize, totalItems]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    pageSize,
    paginatedRange,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}
