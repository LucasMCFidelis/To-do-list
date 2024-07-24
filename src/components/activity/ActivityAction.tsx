import { ButtonHTMLAttributes, ElementType } from "react";
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    icon: ElementType
}

export function ActivityAction({ icon: Icon, ...rest }: ButtonProps ) {
    return (
        <button 
            {...rest}
            className={twMerge("text-zinc-600/60", rest.className)}
        >
            <Icon className="size-6" />
        </button>
    )
}

{/* <ButtonActionActivity
                icon={Trash2}
                onClick={() => deleteActivity(activity.id)}
                className='hover:text-red-500'
            />
            <ButtonActionActivity
                icon={Pencil}
                onClick={() => openEditModal(activity.id, activity.title)}
                className='hover:text-indigo-600'
            /> */}