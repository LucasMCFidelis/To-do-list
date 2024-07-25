interface ButtonTitleProps {
    title: string
}

export function ButtonTitle({ title }: ButtonTitleProps) {
    return (
        <h2 className='block space-x-2'>{title}</h2>
    )
}