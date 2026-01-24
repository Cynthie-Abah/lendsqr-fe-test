// REPLACE TAILWIND WITH SCSS

// 'use client';
// import Link from 'next/link';
// import Input from './input';
// import clsx from 'clsx';
// import { usePathname } from 'next/navigation';

// export const Header = () => {
//   const pathname = usePathname();
//   const navLinks = [
//     { label: 'Overview', href: '/' },
//     { label: 'Customers', href: '/customers' },
//     { label: 'Jobs', href: '/jobs' },
//   ];

//   return (
//     <div className=" bg-white p-3 h-17.5 shadow-xs border-b border-light-muted-02 flex items-center justify-between">
//       <nav>
//         <ul className="flex gap-4 mx-6 text-sm">
//           {navLinks.map(({ label, href }) => (
//             <li key={href}>
//               <Link
//                 href={href}
//                 className={clsx(
//                   'text-muted-foreground transition font-medium hover:text-black',
//                   pathname === href && 'text-black',
//                 )}
//               >
//                 {label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className="flex items-center gap-4 h-9">
//         {/* search bar */}
//         <div className="search">
//           <Input className="h-9 w-70 text-sm" placeholder="Search" />
//         </div>

//         {/* profile */}
//         <div className="profile border border-light-muted-02 rounded-md h-full px-4 text-sm flex items-center gap-2">
//           <div className="logo w-4 h-4 rounded-full bg-light-muted-02 flex items-center justify-center text-2xs font-semibold text-gray-600"></div>
//           <span className="text-black-300 text-sm">Username</span>
//         </div>
//       </div>
//     </div>
//   );
// };
