import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { FormEvent, useCallback, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Modal } from './components/modal'
import { Activity } from './components/activity'
import { Header } from './components/header'
import { Button } from './components/button'

export function App() {
  const [isBlackModeActive, setIsBlackModeActive] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false)
  const [actionActivityId, setActionActivityId] = useState<string | null>(null)
  const [actionActivityTitle, setActionActivityTitle] = useState('')
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

  const openDeleteModal = useCallback((id: string, title: string) => {
    setActionActivityId(id)
    setActionActivityTitle(title)
    setIsDeleteModalOpen(true)
  }, [])

  const closeDeleteModal = useCallback(() => {
    setActionActivityId(null)
    setActionActivityTitle('')
    setIsDeleteModalOpen(false)
  }, [])

  const deleteActivity = useCallback(() => {
    setActivities(prevActivities => prevActivities.filter(activity => activity.id !== actionActivityId))
    closeDeleteModal()
  }, [actionActivityId, actionActivityTitle, closeDeleteModal])

  const openEditModal = useCallback((id: string, title: string) => {
    setActionActivityId(id)
    setActionActivityTitle(title)
    setIsEditModalOpen(true)
  }, [])

  const closeEditModal = useCallback(() => {
    setActionActivityId(null)
    setActionActivityTitle('')
    setIsEditModalOpen(false)
  }, [])

  const saveEdit = useCallback(() => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === actionActivityId ? { ...activity, title: actionActivityTitle } : activity
      )
    )
    closeEditModal()
  }, [actionActivityId, actionActivityTitle, closeEditModal])

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
            themeScreenMode={isBlackModeActive}
            actionInput={handleSearchChange}
            icon={Search}
          />
          <Header.Filters
            filter={filter}
            actionFilter={handleFilterChange}
          />
          <Header.ButtonTheme
            themeScreenMode={isBlackModeActive}
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
                  />
                  <Activity.Actions>
                    <Activity.Action
                      icon={Trash2}
                      onClick={() => openDeleteModal(activity.id, activity.title)}
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
          <Button.Root
            onClick={openAddActivityModal}
            className='flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-zinc-200 p-2 fixed bottom-5 rounded-full'
          >
            <Button.Icon
              icon={Plus}
            />
          </Button.Root>
        </div>
      </div>

      {isAddActivityModalOpen && (
        <Modal.Root
          themeScreenMode={isBlackModeActive}
          title={'ADD NOTE'}
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
          actionForm={addActivity}
          formRef={formRef}
        >
          <Modal.Cancel
            action={closeAddActivityModal}
          />
          <Modal.Submit
            title='APPLY'
            icon={Plus}
          />
        </Modal.Root>
      )}

      {isEditModalOpen && (
        <Modal.Root
          themeScreenMode={isBlackModeActive}
          title={'EDIT NOTE'}
          input={
            <input
              type="text"
              value={actionActivityTitle}
              onChange={(e) => setActionActivityTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, formRef)}
              className='w-full'
            />
          }
          actionForm={saveEdit}
          formRef={formRef}
        >
          <Modal.Cancel
            action={closeEditModal}
          />
          <Modal.Submit />
        </Modal.Root>
      )}

      {isDeleteModalOpen && (
        <Modal.Root
          themeScreenMode={isBlackModeActive}
          title={`Deseja deletar a nota "${actionActivityTitle}"?`}
          actionForm={deleteActivity}
          formRef={formRef}
        >
          <Modal.Cancel
            action={closeDeleteModal}
          />
          <Modal.Submit
            title='DELETE'
            icon={Trash2}
          />
        </Modal.Root>
      )}
    </div>
  )
}