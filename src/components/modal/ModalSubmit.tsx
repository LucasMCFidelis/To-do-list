import { ElementType } from "react";
import { Button } from "../button";
import { Save } from "lucide-react";

interface ModalSubmitProps {
    title?: string,
    icon?: ElementType
}

export function ModalSubmit({ title, icon: Icon}: ModalSubmitProps) {
    if (title == undefined){
        title = "SAVE"
    }
    if (Icon == undefined){
        Icon = Save
    }
    return (
        <Button.Root 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-zinc-200 "
        >
            <Button.Title 
                title={title} 
            />
            <Button.Icon 
                icon={Icon}
            />
        </Button.Root>
    )
}