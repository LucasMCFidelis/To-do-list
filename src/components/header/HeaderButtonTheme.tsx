import { Button } from "../button"
import { Moon, SunDim } from "lucide-react"

interface HeaderButtonThemeProps {
    themeScreenMode: boolean,
    changeThemeScreen: () => void,
}

export function HeaderButtonTheme({ themeScreenMode, changeThemeScreen }: HeaderButtonThemeProps) {
    return (
        <>
            {
                themeScreenMode ? (
                    <Button.Root 
                        onClick={changeThemeScreen}
                        className='h-9 w-9 gap-0 p-0 bg-indigo-600 hover:bg-indigo-700 text-zinc-200'
                    >
                        <Button.Icon icon={SunDim}/>                                
                    </Button.Root>
                ) : (
                    <Button.Root 
                        onClick={changeThemeScreen}
                        className='h-9 w-9 bg-indigo-600 hover:bg-indigo-700 text-zinc-200'
                    >
                        <Button.Icon icon={Moon}/>                           
                    </Button.Root>
                )
            }
        </>
    )
}