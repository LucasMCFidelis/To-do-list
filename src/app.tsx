import { ChevronDown, Moon, Pencil, Save, Search, SunDim, Trash2, X } from 'lucide-react'
import { useCallback, useState } from "react"

export function App() {
  const [isBlackModeActive, setIsBlackModeActive] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Atividade 1',
      date: new Date().toISOString(),
      finally: false
    },
    {
      id: 2,
      title: 'Atividade 2',
      date: new Date().toISOString(),
      finally: false
    },
    {
      id: 3,
      title: 'Atividade 3',
      date: new Date().toISOString(),
      finally: false
    },
    {
      id: 4,
      title: 'Atividade 1',
      date: new Date().toISOString(),
      finally: true
    },
  ])
  const changeThemeScreen = useCallback(() => {
    setIsBlackModeActive(prevState => !prevState)
  }, [])

  const completeActivity = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const idThisInput = parseInt(input.value)
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === idThisInput ? { ...activity, finally: !activity.finally } : activity
      )
    )
  }, [])

  const deleteActivity = useCallback((id: number) => {
    setActivities(prevActivities => prevActivities.filter(activity => activity.id !== id))
  }, [])

  const openEditModal = useCallback((id: number, title: string) => {
    setEditId(id)
    setEditTitle(title)
    setIsEditModalOpen(true)
  }, [])

  const closeEditModal = useCallback(() => {
    setEditId(null)
    setEditTitle('')
    setIsEditModalOpen(false)
  }, [])

  const saveEdit = useCallback(() => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === editId ? { ...activity, title: editTitle } : activity
      )
    )
    closeEditModal()
  }, [editId, editTitle, closeEditModal])

  return (
    <div className={`h-screen w-screen flex flex-wrap items-start justify-center transition-colors ${isBlackModeActive ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-900'}`}>
      <div className="w-9/12 flex flex-col">
        <div className="w-full flex flex-col justify-center items-center gap-3 py-8">
          <h1 className=''>TODO LIST</h1>
          <div className="flex flex-wrap-reverse justify-between w-full gap-5">
            <form className='flex-1 min-w-full sm:min-w-min flex justify-between bg-transparent border border-indigo-300 rounded-lg p-1.5'>
              <input type="text" className='flex-1 bg-transparent outline-none' />
              <button>
                <Search />
              </button>
            </form>
            <button className='h-9 w-20 flex items-center justify-center gap-3'>
              <h2>ALL</h2>
              <ChevronDown className='size-5' />
            </button>
            {isBlackModeActive ? (
              <button
                onClick={changeThemeScreen}
                className='flex justify-center items-center bg-indigo-700 h-9 w-9 rounded-xl '>
                <SunDim className='size-8' />
              </button>
            ) : (
              <button 
                onClick={changeThemeScreen} 
                className='flex justify-center items-center bg-indigo-700 text-zinc-200 h-9 w-9 rounded-xl'>
                <Moon className='size-8' />
              </button>
            )}
          </div>
        </div>

        <div className='w-full flex flex-col gap-3'>
          {activities.map(activity => (
            <div key={activity.id} className="flex justify-between">
              <div className='relative flex-1'>
                <input
                  onChange={completeActivity}
                  type="checkbox"
                  checked={activity.finally}
                  value={activity.id}
                  className='w-full absolute inset-0 $'
                />
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    {activity.finally ? (
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="25" height="25" rx="1.5" fill="#6C63FF" stroke="#6C63FF" />
                        <mask id="path-2-inside-1_0_1" fill="white">
                          <path d="M10.9978 18.6488L6.00002 13.7476L15.5593 4L20.5571 8.90124L10.9978 18.6488Z" />
                        </mask>
                        <path d="M10.9978 18.6488L9.59745 20.0767L11.0254 21.4771L12.4257 20.0491L10.9978 18.6488ZM12.3982 17.2209L7.40037 12.3196L4.59966 15.1755L9.59745 20.0767L12.3982 17.2209ZM19.1291 7.50089L9.56986 17.2484L12.4257 20.0491L21.985 10.3016L19.1291 7.50089Z" fill="#F7F7F7" mask="url(#path-2-inside-1_0_1)" />
                      </svg>
                    ) : (
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="25" height="25" rx="1.5" stroke="#6C63FF" />
                      </svg>
                    )}
                    <h2 className='w-36 sm:w-auto'>{activity.title}</h2>
                  </div>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => deleteActivity(activity.id)}
                >
                  <Trash2 />
                </button>
                <button
                  onClick={() => openEditModal(activity.id, activity.title)}
                >
                  <Pencil />
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>

      {isEditModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className={`w-52 sm:w-[450px] ${isBlackModeActive ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
            <input type="text" value={editTitle} 
        onChange={(e) => setEditTitle(e.target.value)}/>
            <button
              onClick={saveEdit}
            >
              <Save />
            </button>
            <button
              onClick={closeEditModal}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}