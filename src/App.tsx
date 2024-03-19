import { PlusCircle } from '@phosphor-icons/react'

import logo from './assets/logo.svg'
import { Task } from './components/Task'
import { ChangeEvent, FormEvent, useState } from 'react'
import { EmptyForm } from './components/EmptyForm'
import { TaskStatus } from './components/TaskStatus'

export function App() {
  const [task, setTask] = useState('')
  const [createTask, setCreateTask] = useState<string[]>([])
  const [completed, setCompleted] = useState(0)

  function handleTaskText(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value)
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    setCreateTask([...createTask, task])
    setTask('')
  }

  function hasTasksStatus() {
    const totalTasks = createTask.length

    return totalTasks
  }

  function handleTaskCompleted(checked: boolean) {
    if (checked) {
      setCompleted((prevCompleted) => prevCompleted + 1)
    } else {
      setCompleted((prevCompleted) => prevCompleted - 1)
    }
  }

  function deleteTask(task: string, checked: boolean) {
    const taskListWithoutDeletedTask = createTask.filter(tasks => tasks !== task)

    if (checked) {
      setCreateTask(taskListWithoutDeletedTask)
      setCompleted((prevCompleted) => prevCompleted - 1)
    } else {
      setCreateTask(taskListWithoutDeletedTask)
    }
  }

  const doesTasksNotExists = createTask.length === 0 && <EmptyForm />

  return (
    <div className="h-screen">
      <header className="flex gap-3 justify-center h-[200px] bg-zinc-1000 text-4xl font-black">
        <img src={logo} alt="Logotipo do site" className="w-6"/>
        <strong className="flex items-center text-blue-350">
          to<span className="text-purpleDark-500">do</span>
        </strong>
      </header>

      <main className="w-[736px] mx-auto">
        <form className="flex gap-2 -mt-7">
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
        </form>

        <section className="mt-16 overflow-auto">
          <TaskStatus totalTasks={hasTasksStatus} completedTasks={completed}/>

          <form className="mt-6" id="teste">
            {doesTasksNotExists}

            {
              createTask.map(tasks => {
                return <Task key={tasks} task={tasks} onDeleteTask={deleteTask} onCompletedTask={handleTaskCompleted} />
              })
            }
          </form>
        </section>
      </main>
    </div>
  )
}

