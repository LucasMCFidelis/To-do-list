import { ButtonHTMLAttributes, ElementType } from "react";
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    icon: ElementType
}

export function ButtonActionActivity({ icon: Icon, ...rest }: ButtonProps ) {
    return (
        <button 
            {...rest}
            className={twMerge("text-zinc-600/60", rest.className)}
        >
            <Icon className="size-6" />
        </button>
    )
}