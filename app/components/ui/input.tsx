// REPLACE TAILWIND WITH SCSS //use mixins for variants 

// 'use client';

// import { cn } from '@/lib/utils';
// import { cva } from 'class-variance-authority';
// import { Eye, EyeClosed } from 'lucide-react';
// import { ReactNode, useState } from 'react';

// const inputVariant = cva(
//   "text-text-secondary flex h-auto cursor-text items-center justify-center gap-2 [&>input]:py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-6 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50 focus:border-1 focus-within:border-primary-blue text-foreground font-medium",
//   {
//     variants: {
//       variant: {
//         outline: cn(
//           'group/input-group border-tertiary-50 relative flex w-full items-center rounded-lg border transition-[color,box-shadow] outline-none',
//           'h-14 min-w-0 has-[>textarea]:h-auto [&>input]:px-3',
//           'has-[[data-slot=input-group-control]:focus-visible]:border-primary-blue',
//           'has-[[data-slot][aria-invalid=true]]:border-primary-error',
//           'has-[[data-slot][aria-invalid=false]]:border-primary-green',
//         ),
//         ghost:
//           'order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]',
//       },
//       fieldHeight: {
//         xs: 'h-[40px]',
//         md: 'h-[40px]',
//         sm: 'h-[40px]',
//       },
//     },
//     defaultVariants: {
//       variant: 'outline',
//     },
//   },
// );

// type InputProps = {
//   inputType?: 'input' | 'password' | 'textarea';
//   icon?: ReactNode;
//   variant?: 'outline' | 'ghost';
//   fieldHeight?: 'xs' | 'sm' | 'md';
// } & (
//   | React.InputHTMLAttributes<HTMLInputElement>
//   | React.TextareaHTMLAttributes<HTMLTextAreaElement>
// );

// const Input = ({
//   inputType = 'input',
//   icon,
//   variant,
//   className,
//   fieldHeight,
//   ...props
// }: InputProps) => {
//   const [showPassword, setShowPassword] = useState(false);

//   // Render textarea
//   if (inputType === 'textarea') {
//     return (
//       <div className={cn(inputVariant({ variant, fieldHeight }), className)}>
//         {icon && (
//           <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
//             {icon}
//           </span>
//         )}
//         <textarea
//           data-slot="input-group-control"
//           className="w-full h-full resize-none outline-none"
//           {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
//         />
//       </div>
//     );
//   }

//   // Render input / password
//   return (
//     <div className={cn(inputVariant({ variant, fieldHeight }), className)}>
//       {icon && (
//         <span className="absolute left-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center h-full">
//           {icon}
//         </span>
//       )}

//       <input
//         type={
//           inputType === 'password'
//             ? showPassword
//               ? 'text'
//               : 'password'
//             : (props as React.InputHTMLAttributes<HTMLInputElement>).type
//         }
//         data-slot="input-group-control"
//         className="w-full h-full outline-none"
//         {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
//       />

//       {inputType === 'password' && (
//         <button
//           type="button"
//           onClick={() => setShowPassword(!showPassword)}
//           className="ml-2 absolute right-2"
//         >
//           {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
//         </button>
//       )}
//     </div>
//   );
// };

// export default Input;
