import { ButtonIcon } from "./ButtonIcon";
import { ButtonRoot } from "./ButtonRoot";
import { ButtonTitle } from "./ButtonTitle";

export const Button = {
    Root: ButtonRoot,
    Icon: ButtonIcon,
    Title: ButtonTitle
}

// import { ButtonHTMLAttributes, ReactNode } from "react";
// import { twMerge } from 'tailwind-merge'

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
//     icon: ReactNode,
//     title?: string
// }

// export function Button({ icon: Icon, title, ...rest }: ButtonProps ) {
//     return (
//         <button 
//             {...rest}
//             className={twMerge('flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-zinc-200 rounded-xl', rest.className)}
//         >
//             <h2 className='hidden sm:block space-x-2'>{title}</h2>
//             {Icon}
//       </button>
//     )
// }