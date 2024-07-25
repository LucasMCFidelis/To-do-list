import { ChangeEventHandler } from "react"

interface HeaderSearchProps {
    themeScreenMode: boolean,
    actionInput: ChangeEventHandler<HTMLInputElement>,
    icon: React.ElementType
}

export function HeaderSearch({themeScreenMode, actionInput, icon: Icon }: HeaderSearchProps){
    return (
        <div className={`flex-1 min-w-full sm:min-w-min flex justify-between bg-transparent rounded-lg p-1.5 border ${themeScreenMode ? 'text-zinc-200 border-zinc-200' : 'text-indigo-600 border-indigo-600'}`}>
            <input
                type="text"
                onChange={actionInput}
                className='flex-1 bg-transparent outline-none'
            />
            <Icon />
        </div>
    )
}