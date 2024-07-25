import { ReactNode } from "react"

interface ActivityRootProps {
    children: ReactNode
}

export function ActivityRoot({ children }: ActivityRootProps) {
    return (
        <div className="flex flex-col gap-3 font-semibold">
            <div className='flex'>
                {children}
            </div>
            <div className="w-full h-px bg-indigo-500/30"></div>
        </div>
    )
}