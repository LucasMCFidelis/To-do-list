import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from 'tailwind-merge'

interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
}

export function ButtonRoot({ children, ...rest }: ButtonRootProps ) {
    return (
        <button 
            {...rest}
            className={twMerge('flex justify-center items-center gap-2 p-2 rounded-xl', rest.className)}
        >
            {children}
      </button>
    )
}