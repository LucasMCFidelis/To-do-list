import { Button } from "../button";
import { X } from "lucide-react";

interface ModalCancelProps{
    action: () => void
}

export function ModalCancel({ action }: ModalCancelProps) {
    return (
        <Button.Root 
            onClick={action}
            className="w-auto border border-indigo-600 text-indigo-600 bg-transparent hover:border-indigo-700 hover:text-indigo-700 hover:bg-transparent"
        >
            <Button.Title title="CANCEL"/>
            <Button.Icon icon={X}/>
        </Button.Root>
    )
}