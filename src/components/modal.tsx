import { FormEventHandler, ReactElement } from "react"

interface ModalProps {
  themeScreenMode: boolean,
  title: string,
  input: ReactElement,
  button1: ReactElement,
  button2: ReactElement,
  actionForm: FormEventHandler<HTMLFormElement>
  formRef: React.RefObject<HTMLFormElement>
}

export function Modal({ themeScreenMode, title, input, button1, button2, actionForm, formRef}: ModalProps) {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className={`w-64 sm:w-[450px] py-5 px-8 rounded-md ${themeScreenMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
        <form ref={formRef} onSubmit={actionForm} className="space-y-10">
          <div className='flex flex-col items-center gap-2'>
            <h2>{title}</h2>
            {input}
          </div>
          <div className="w-full flex justify-between font-semibold">
            {button1}
            {button2}
          </div>
        </form>
      </div>
    </div>
  )
}