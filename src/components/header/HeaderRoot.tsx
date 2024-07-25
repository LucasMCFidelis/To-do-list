import { ReactNode } from "react"

interface HeaderRootProps {
    title: string,
    children: ReactNode
}

export function HeaderRoot({ title, children }: HeaderRootProps) {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-3 py-8">
            <h1 className='text-2xl font-semibold'>{title}</h1>
            <div className="flex flex-wrap-reverse justify-between w-full gap-5">
                {children}
            </div>
        </div>
    )
}