'use client';
import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import LimitSetter from './limit-setter';
import '../../styles/components/pagination.scss'
import { getPageNumbers } from '@/app/lib/utils';

export function DataTablePagination<TData>({
  table
}: {table: Table<TData>}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const entries = Array.from(searchParams.entries());
  const defaultPage = entries
    .map(([key, value]) => ({
      filterKey: key,
      filterValue: value,
    }))
    .find((filter) => filter.filterKey === 'page');

  useEffect(() => {
    if (defaultPage !== undefined) {
      table.setPageIndex(Number(defaultPage.filterValue) - 1);
    } else {
      table.setPageIndex(0);
    }
  }, []);

  const createQueryString = useCallback(
    (value: string | number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', `${value}`);
        router.push(pathname + '?' + params.toString());
      table.setPageIndex(Number(value) - 1);
    },
    [searchParams, pathname, router, table],
  );

  return (
    <div className="data-table-pagination">
          <LimitSetter table={table} />

        <div className="data-table-pagination__nav">
          {/* PREVIOUS */}
          <button
            className="pagination-btn"
            onClick={() => {
              table.previousPage();
              createQueryString(table.getState().pagination.pageIndex);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft width={18} height={18} />
          </button>

          {/* PAGE NUMBERS */}
          <div className="pagination-pages">
            {getPageNumbers(
              table.getState().pagination.pageIndex + 1,
              table.getPageCount(),
            ).map((page) =>
              page === '...' ? (
                <span key={page} className="pagination-ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => createQueryString(page)}
                  className={`pagination-page ${
                    page === table.getState().pagination.pageIndex + 1
                      ? 'is-active'
                      : ''
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          {/* NEXT */}
          <button
            className="pagination-btn"
            onClick={() => {
              table.nextPage();
              createQueryString(
                table.getState().pagination.pageIndex + 2,
              );
            }}
            disabled={!table.getCanNextPage()}
          >
              <ChevronRight width={18} height={18} />
          </button>
        </div>

    </div>
  );
}
