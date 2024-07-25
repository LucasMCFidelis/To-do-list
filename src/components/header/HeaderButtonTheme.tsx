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
                    <Button
                        icon={<SunDim className='size-8' />}
                        onClick={changeThemeScreen}
                        className='h-9 w-9'
                    />
                ) : (
                    <Button
                        icon={<Moon className='size-8' />}
                        onClick={changeThemeScreen}
                        className='h-9 w-9'
                    />
                )
            }
        </>
    )
}