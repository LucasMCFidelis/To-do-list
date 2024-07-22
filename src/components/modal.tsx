interface ModalProps {
    themeScreenMode: boolean,
    section: React.ElementType

}

export function Modal({themeScreenMode, section: Section} : ModalProps) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className={`w-64 sm:w-[450px] py-5 px-8 rounded-md ${themeScreenMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
            <Section/>
          </div>
        </div>
    )
}