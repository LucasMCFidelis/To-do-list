import { ReactNode } from "react"

interface ActivityRootProps {
    key: string,
    children: ReactNode
}

export function ActivityRoot({ key, children }: ActivityRootProps) {
    return (
        <div key={key} className="flex flex-col gap-3 font-semibold">
            <div className='flex'>
                {children}
                
                
            </div>
            <div className="w-full h-px bg-indigo-500/30"></div>

        </div>
    )
}