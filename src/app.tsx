import { Moon, Pencil, Plus, Save, Search, SunDim, Trash2, X } from 'lucide-react'
import { FormEvent, useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function App() {
  const [isBlackModeActive, setIsBlackModeActive] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('')
  const [activities, setActivities] = useState([
    { id: uuidv4(), title: 'Atividade 1', date: new Date().toISOString(), finally: false },
    { id: uuidv4(), title: 'Atividade 2', date: new Date().toISOString(), finally: false },
    { id: uuidv4(), title: 'Atividade 3', date: new Date().toISOString(), finally: false },
    { id: uuidv4(), title: 'Atividade 1', date: new Date().toISOString(), finally: true },
  ])
  const changeThemeScreen = useCallback(() => {
    setIsBlackModeActive(prevState => !prevState)
  }, [])

  function openAddActivityModal() {
    setIsAddActivityModalOpen(true)
  }
  function closeAddActivityModal() {
    setIsAddActivityModalOpen(false)
  }

  const addActivity = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString()

    if (!title) {
      return
    }
    const newActivity = {
      id: uuidv4(),
      title,
      date: new Date().toISOString(),
      finally: false
    }

    setActivities(prevActivities => [
      ...prevActivities,
      newActivity
    ])
    closeAddActivityModal()

  }, [])

  const completeActivity = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const idThisInput = event.target.value
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === idThisInput ? { ...activity, finally: !activity.finally } : activity
      )
    )
  }, [])

  const deleteActivity = useCallback((id: string) => {
    setActivities(prevActivities => prevActivities.filter(activity => activity.id !== id))
  }, [])

  const openEditModal = useCallback((id: string, title: string) => {
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setFilter(event.target.value);
  }

  const filteredActivities = useCallback(() => {
    return activities.filter(activity => {
      if (filter === 'Complete') {
        return !activity.finally;
      }
      if (filter === 'Incomplete') {
        return activity.finally;
      }
      return true;
    }).filter(activity => activity.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, filter, activities])

  return (
    <div className={`min-h-screen max-w-screen flex flex-wrap items-start justify-center transition-colors ${isBlackModeActive ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-900'}`}>
      <div className="w-9/12 flex flex-col gap-5">
        <div className="w-full flex flex-col justify-center items-center gap-3 py-8">
          <h1 className='text-2xl font-semibold'>TODO LIST</h1>
          <div className="flex flex-wrap-reverse justify-between w-full gap-5">
            <div className='flex-1 min-w-full sm:min-w-min flex justify-between bg-transparent border border-indigo-300 rounded-lg p-1.5'>
              <input
                type="text"
                onChange={handleSearchChange}
                className='flex-1 bg-transparent outline-none' />
              <button>
                <Search />
              </button>
            </div>
            <div>
              <select
                value={filter}
                onChange={handleFilterChange}
                className='h-9 w-22 flex items-center justify-center px-2 bg-indigo-600 hover:bg-indigo-700 text-zinc-200 rounded-xl cursor-pointer'>
                <option 
                  value=""
                  className='text-indigo-600 bg-zinc-200'
                >
                  ALL
                </option>
                <option 
                  value="Complete"
                  className='text-indigo-600 bg-zinc-200'
                >
                  Complete
                </option>
                <option 
                  value="Incomplete"
                  className='text-indigo-600 bg-zinc-200'
                >
                  Incomplete
                </option>
              </select>
            </div>

            {isBlackModeActive ? (
              <button
                onClick={changeThemeScreen}
                className='flex justify-center items-center bg-indigo-600 h-9 w-9 rounded-xl hover:bg-indigo-700'>
                <SunDim className='size-8' />
              </button>
            ) : (
              <button
                onClick={changeThemeScreen}
                className='flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-zinc-200 h-9 w-9 rounded-xl'>
                <Moon className='size-8' />
              </button>
            )}
          </div>
        </div>

        <div className='w-full'>
          {filteredActivities().length > 0 ? (
            <div className='flex flex-col gap-3'>
              {filteredActivities().map(activity => (
                <div key={activity.id} className="flex flex-col gap-3 font-semibold">
                  <div className='flex'>
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
                              <rect x="0.5" y="0.5" width="25" height="25" rx="1.5" fill="#4f46e5" stroke="#4f46e5" />
                              <mask id="path-2-inside-1_0_1" fill="white">
                                <path d="M10.9978 18.6488L6.00002 13.7476L15.5593 4L20.5571 8.90124L10.9978 18.6488Z" />
                              </mask>
                              <path d="M10.9978 18.6488L9.59745 20.0767L11.0254 21.4771L12.4257 20.0491L10.9978 18.6488ZM12.3982 17.2209L7.40037 12.3196L4.59966 15.1755L9.59745 20.0767L12.3982 17.2209ZM19.1291 7.50089L9.56986 17.2484L12.4257 20.0491L21.985 10.3016L19.1291 7.50089Z" fill="#F7F7F7" mask="url(#path-2-inside-1_0_1)" />
                            </svg>
                          ) : (
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="0.5" y="0.5" width="25" height="25" rx="1.5" stroke="#4f46e5" />
                            </svg>
                          )}
                          <h2 className='w-36 sm:w-auto'>{activity.title}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="space-x-2 text-zinc-600/60">
                      <button
                        onClick={() => deleteActivity(activity.id)}
                        className='hover:text-red-500'
                      >
                        <Trash2 />
                      </button>
                      <button
                        onClick={() => openEditModal(activity.id, activity.title)}
                        className='hover:text-indigo-600'
                      >
                        <Pencil />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-px bg-indigo-500/30"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5">
              <img src="/empty.svg" alt="List is empty" />
              <h2>Empty...</h2>
            </div>
          )}

        </div>
        <div className='flex justify-end'>
          <button
            onClick={openAddActivityModal}
            className='bg-indigo-600 hover:bg-indigo-700 text-zinc-200 rounded-full p-2'>
            <Plus className='size-8' />
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className={`w-52 sm:w-[450px] rounded-md ${isBlackModeActive ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
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

      {isEditModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className={`w-52 sm:w-[450px] py-5 px-8 space-y-10 rounded-md ${isBlackModeActive ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
            <div className='flex flex-col items-center gap-2'>
              <h2>EDIT NOTE</h2>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className='w-full'
              />
            </div>
            <div className="w-full flex justify-between font-semibold">
              <button
                onClick={closeEditModal}
                className='flex gap-2 border border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700 rounded-xl p-2'
              >
                <h2 className='hidden sm:block'>CANCEL</h2>
                <X />
              </button>
              <button
                onClick={saveEdit}
                className='flex gap-2 bg-indigo-600 hover:bg-indigo-700 text-zinc-200 rounded-xl p-2'
              >
                <h2 className='hidden sm:block'>SAVE</h2>
                <Save />
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddActivityModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <form onSubmit={addActivity} className={`sm:w-[450px] py-5 px-8 space-y-10 rounded-md ${isBlackModeActive ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
            <div className='flex flex-col items-center gap-2'>
              <h2>NEW NOTE</h2>
              <input
                type="text"
                name='title'
                placeholder='Input your note...'
                required
                className='w-full'
              />
            </div>
            <div className="w-full flex flex-wrap justify-between font-semibold">
              <button
                onClick={closeAddActivityModal}
                className='flex gap-2 border border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700 rounded-xl p-2'
              >
                <h2 className='hidden sm:block'>CANCEL</h2>
                <X />
              </button>
              <button
                type='submit'
                className='flex gap-2 bg-indigo-600 hover:bg-indigo-700 text-zinc-200 rounded-xl p-2'
              >
                <h2 className='hidden sm:block'>APPLY</h2>
                <Plus />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}