import { ReactNode } from "react";

interface ActivityActionsProps {
    children: ReactNode,
}

export function ActivityActions({ children }: ActivityActionsProps) {
    return (
        <div className="space-x-2">
            {children}
        </div>
    )
}