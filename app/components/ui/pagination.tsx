// REPLACE TAILWIND WITH SCSS

// 'use client';

// import { Table } from '@tanstack/react-table';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useCallback, useEffect } from 'react';
// import { Button } from './button';
// import LimitSetter from './limit-setter';
// import { getPageNumbers } from '@/lib/utils';
// import { Pagination } from '@/types/pagination';

// // handle pagination manually if products are being fetched
// interface DataTablePaginationProps<TData> {
//   table: Table<TData>;
//   manualPagination: boolean;
//   limit?: number;
//   pagination?: Pagination;
// }

// export function DataTablePagination<TData>({
//   table,
//   manualPagination,
//   limit,
//   pagination,
// }: Readonly<DataTablePaginationProps<TData>>) {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   const entries = Array.from(searchParams.entries());
//   const defaultPage = entries
//     .map(([key, value]) => ({
//       filterKey: key,
//       filterValue: value,
//     }))
//     .find((filter) => filter.filterKey === 'page');
//   useEffect(() => {
//     if (defaultPage !== undefined) {
//       table.setPageIndex(Number(defaultPage.filterValue) - 1);
//     } else {
//       table.setPageIndex(0);
//     }
//   }, [defaultPage, table]);

//   //  get the params on refresh and set number value to that
//   const createQueryString = useCallback(
//     (value: string | number) => {
//       if (manualPagination) {
//         const params = new URLSearchParams(searchParams.toString());
//         params.set('page', `${value}`);
//         router.push(pathname + '?' + params.toString());
//       }
//       table.setPageIndex(Number(value) - 1);
//       console.log(
//         table.getState().pagination.pageSize,
//         'after creating query string',
//       );
//     },
//     [searchParams, pathname, router, table, manualPagination],
//   );

//   return (
//     <div className="mt-4 lg:px-3 flex items-center justify-between w-full gap-5 py-2">
//       <section
//         className="text-[#9E9E9E]"
//         style={{
//           fontFamily: 'DM Sans',
//         }}
//       >
//         {limit ? (
//           <LimitSetter limit={limit} />
//         ) : (
//           pagination &&
//           table.getRowCount() >= pagination.per_page && (
//             <p>Showing {pagination?.per_page} rows per page</p>
//           )
//         )}
//       </section>

//       {/* Pagination Buttons */}
//       <section className="flex items-center gap-9">
//         {pagination && (
//           <p
//             className="text-[#2D2D2D]"
//             style={{
//               fontFamily: 'DM Sans',
//             }}
//           >
//             Page {pagination.current_page} of {pagination.total}
//           </p>
//         )}

//         <section className="flex items-center gap-5">
//           {/* PREVIOUS */}
//           <Button
//             variant="ghost"
//             className="flex font-medium text-[.85rem] w-fit"
//             onClick={() => {
//               table.previousPage();
//               createQueryString(table.getState().pagination.pageIndex);
//             }}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <ChevronLeft />
//           </Button>

//           <div className="flex items-center space-x-2">
//             {getPageNumbers(
//               table.getState().pagination.pageIndex + 1,
//               table.getPageCount(),
//             ).map((page) =>
//               page === '...' ? (
//                 <span key={page} className="px-2">
//                   ...
//                 </span>
//               ) : (
//                 <button
//                   key={page}
//                   onClick={() => {
//                     createQueryString(page);
//                   }}
//                   className={`px-3 py-1 ${
//                     page === table.getState().pagination.pageIndex + 1
//                       ? 'border border-black/15 text-black rounded-sm font-medium'
//                       : ' text-tertiary-500'
//                   } hover:bg-accent-75 transition`}
//                 >
//                   {/* {page.toString().padStart(2, '0')} */}
//                   {pagination ? pagination?.current_page : page}
//                 </button>
//               ),
//             )}
//           </div>
//           <div className="flex gap-5">
//             {/* NEXT */}
//             <Button
//               variant="ghost"
//               className="flex font-medium text-[.85rem]"
//               onClick={() => {
//                 table.nextPage();
//                 createQueryString(table.getState().pagination.pageIndex + 2);
//               }}
//               disabled={!table.getCanNextPage()}
//             >
//               <ChevronRight />
//             </Button>
//           </div>
//         </section>
//       </section>
//     </div>
//   );
// }
