import { FormEventHandler, ReactElement, ReactNode } from "react"

interface ModalRootProps {
  themeScreenMode: boolean,
  title: string,
  input: ReactElement,
  actionForm: FormEventHandler<HTMLFormElement>,
  formRef: React.RefObject<HTMLFormElement>,
  children: ReactNode
}

export function ModalRoot({ themeScreenMode, title, input, actionForm, formRef, children }: ModalRootProps) {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className={`w-72 sm:w-[450px] py-5 px-8 rounded-md ${themeScreenMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
        <form ref={formRef} onSubmit={actionForm} className="space-y-10">
          <div className='flex flex-col items-center gap-2'>
            <h2>{title}</h2>
            {input}
          </div>
          <div className="w-full flex justify-between font-semibold">
            {children}
          </div>
        </form>
      </div>
    </div>
  )
}