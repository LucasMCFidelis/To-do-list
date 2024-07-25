import { Button } from "../button";
import { Save } from "lucide-react";

export function ModalSubmit() {
    return (
        <Button.Root 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-zinc-200 "
        >
            <Button.Title title="SAVE"/>
            <Button.Icon icon={Save}/>
        </Button.Root>
    )
}