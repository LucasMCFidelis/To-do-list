import { Pencil, Plus, Save, Search, Trash2, X } from 'lucide-react'
import { FormEvent, useCallback, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from './components/button'
import { Modal } from './components/modal'
import { Activity } from './components/activity'
import { Header } from './components/header'

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
    console.log("form enviado");

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

  const formRef = useRef<HTMLFormElement>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, formRef: React.RefObject<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (formRef.current) {
        const formEvent = new Event('submit', { cancelable: true, bubbles: true });
        formRef.current.dispatchEvent(formEvent);
      }
    }
  }

  const filteredActivities = useCallback(() => {
    return activities.filter(activity => {
      if (filter === 'Complete') {
        return activity.finally;
      }
      if (filter === 'Incomplete') {
        return !activity.finally;
      }
      return true;
    }).filter(activity => activity.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, filter, activities])

  return (
    <div className={`min-h-screen max-w-screen flex flex-wrap items-start justify-center transition-colors ${isBlackModeActive ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-900'}`}>
      <div className="w-9/12 flex flex-col gap-5">
        <Header.Root title='TO DO LIST'>
          <Header.Search
            themeScreenMode = {isBlackModeActive}
            actionInput={handleSearchChange}
            icon={Search}
          />
          <Header.Filters
            filter={filter}
            actionFilter={handleFilterChange}
          />
          <Header.ButtonTheme
            themeScreenMode = {isBlackModeActive}
            changeThemeScreen={changeThemeScreen}
          ></Header.ButtonTheme>
        </Header.Root>

        <div className='w-full sm:w-11/12'>
          {filteredActivities().length > 0 ? (
            <div className='flex flex-col gap-3'>
              {filteredActivities().map(activity => (
                <Activity.Root key={activity.id}>
                  <Activity.Content
                    actionInput={completeActivity}
                    activity={activity}
                  >
                  </Activity.Content>
                  <Activity.Actions>
                    <Activity.Action
                      icon={Trash2}
                      onClick={() => deleteActivity(activity.id)}
                      className='hover:text-red-500'
                    />
                    <Activity.Action
                      icon={Pencil}
                      onClick={() => openEditModal(activity.id, activity.title)}
                      className='hover:text-indigo-600'
                    />
                  </Activity.Actions>
                </Activity.Root>
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
          <Button
            icon={<Plus className='size-8' />}
            onClick={openAddActivityModal}
            className='p-2 fixed bottom-5 rounded-full'
          />
        </div>
      </div>

      {isEditModalOpen && (
        <Modal
          themeScreenMode={isBlackModeActive}
          title={'EDIT NOTE'}
          actionForm={saveEdit}
          formRef={formRef}
          input={
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, formRef)}
              className='w-full'
            />
          }
          button1={
            <Button
              icon={<X className='size-6' />}
              title='CANCEL'
              onClick={closeEditModal}
              className='gap-2 p-2 border border-indigo-600 text-indigo-600 bg-transparent hover:border-indigo-700 hover:text-indigo-700 hover:bg-transparent'
            />
          }
          button2={
            <Button
              type='submit'
              icon={<Save className='size-6' />}
              title='SAVE'
              className='gap-2 p-2'
            />
          }
        />
      )}

      {isAddActivityModalOpen && (
        <Modal
          themeScreenMode={isBlackModeActive}
          title={'ADD NOTE'}
          actionForm={addActivity}
          formRef={formRef}
          input={
            <input
              type="text"
              name='title'
              placeholder='Input your note...'
              required
              onKeyDown={(e) => handleKeyDown(e, formRef)}
              className='w-full'
            />
          }
          button1={
            <Button
              icon={<X className='size-6' />}
              title='CANCEL'
              onClick={closeAddActivityModal}
              className='gap-2 p-2 border border-indigo-600 text-indigo-600 bg-transparent hover:border-indigo-700 hover:text-indigo-700 hover:bg-transparent'
            />
          }
          button2={
            <Button
              type='submit'
              icon={<Plus className='size-6' />}
              title='APPLY'
              className='gap-2 p-2'
            />
          }
        />
      )}
    </div>
  )
}