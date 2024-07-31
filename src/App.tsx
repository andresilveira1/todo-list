import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { PlusCircle } from '@phosphor-icons/react'

import logo from './assets/logo.svg'
import { Task } from './components/task'
import { EmptyForm } from './components/empty-form'
import { TaskStatus } from './components/task-status'

interface TaskProps {
  id: Date
  task: string
  isCompleted: boolean
}

export function App() {
  const [task, setTask] = useState('')
  const [createTask, setCreateTask] = useState<TaskProps[]>(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@todo-list:task-state-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    } 
    
    return []
  })
  const [taskCompleted, setTaskCompleted] = useState(0)

  function handleTaskText(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value)
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      id: new Date(),
      task,
      isCompleted: false
    }

    if (newTask.task.length > 0) {
      setCreateTask((prevState) => [...prevState, newTask])
      setTask('')
    }
  }

  function hasTasksStatus() {
    const totalTasks = createTask.length

    return totalTasks
  }

  function handleTaskCompleted(checked: boolean) {
    // const task = localStorage.getItem(
    //   '@todo-list:task-state-1.0.0',
    // )

    // if (task) {
    //   const taskCompleted: TaskProps[] = JSON.parse(task)
    //   taskCompleted.map((task) => task.id)
    // }

    if (checked) {
      setTaskCompleted((prevCompleted) => prevCompleted + 1)
    } else {
      setTaskCompleted((prevCompleted) => prevCompleted - 1)
    }
  }

  function deleteTask(task: string) {
    const taskListWithoutDeletedTask = createTask.filter(tasks => tasks.task !== task)

    setCreateTask(taskListWithoutDeletedTask)
  }

  const doesTasksNotExists = createTask.length === 0 && <EmptyForm />

  useEffect(() => {
    const stateJSON = JSON.stringify(createTask)

    localStorage.setItem('@todo-list:task-state-1.0.0', stateJSON)
  }, [createTask])

  return (
    <div className="h-screen">
      <header className="flex gap-3 justify-center h-[200px] bg-zinc-1000 text-4xl font-black">
        <img src={logo} alt="Logotipo do site" className="w-6"/>
        <strong className="flex items-center text-blue-350">
          to<span className="text-purpleDark-500">do</span>
        </strong>
      </header>

      <main className="px-4 md:px-0 md:w-[736px] mx-auto">
        <form>
          <div className="flex gap-2 -mt-7">
            <div className="flex-1 rounded-lg">
              <label htmlFor="task" className="sr-only">Adicione uma nova tarefa</label>
              <input type="text" id="task" value={task} onChange={handleTaskText} placeholder="Adicione uma nova tarefa" className="w-full p-4 rounded-lg placeholder-zinc-350 bg-zinc-550 text-zinc-150 outline-none border border-zinc-1000 focus:border-purpleDark-500"/>
            </div>

            <button 
              className="flex items-center justify-center gap-2 p-4 bg-blue-550 text-sm font-bold text-zinc-150 rounded-lg hover:bg-blue-350"
              onClick={handleCreateTask}
            >
              Criar
              <PlusCircle className="text-lg"/>
            </button>
          </div>

          <section className="mt-16 overflow-auto">
            <TaskStatus totalTasks={hasTasksStatus} completedTasks={taskCompleted}/>

            <div className="mt-6" id="tasks">
              {doesTasksNotExists}

              {
                createTask.map(tasks => {
                  return <Task key={String(tasks.id)} task={tasks.task} onDeleteTask={deleteTask} onCompletedTask={handleTaskCompleted} />
                })
              }
            </div>
          </section>
        </form>
      </main>
    </div>
  )
}

