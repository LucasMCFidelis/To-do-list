import { ReactNode } from "react"

interface HeaderContentProps {
    children: ReactNode
}

export function HeaderContent({ children }: HeaderContentProps) {
    return (
        <div className="flex flex-wrap-reverse justify-between w-full gap-5">
            {children}
        </div>
    )
}