// remove tailwind and replace with scss

// 'use client';

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from './table';
// import { DataTablePagination } from '@/components/ui/pagination';
// import { Pagination } from '@/types/pagination';

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   paginate?: boolean;
//   pagination?: Pagination;
//   limit?: number;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   paginate = true,
//   pagination,
//   limit,
// }: Readonly<DataTableProps<TData, TValue>>) {
//   // eslint-disable-next-line
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });
//   //   table.getState().pagination.
//   return (
//     <div className="w-full">
//       <Table className="w-full border-y border-[#E7E8E9] bg-[#FAFBFA]">
//         <TableHeader className="text-tertiary-500 font-semibold text-base">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && 'selected'}
//                 className="border border-[#E7E8E9]"
//               >
//                 {/* <TableCell >01</TableCell> */}
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 No results
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       {paginate && (
//         <DataTablePagination
//           manualPagination={false}
//           table={table}
//           pagination={pagination}
//           limit={limit}
//         />
//       )}

//       {/* pagination 
//             <DataTablePagination manualPagination={true} table={table} />*/}
//     </div>
//   );
// }
// /* */
