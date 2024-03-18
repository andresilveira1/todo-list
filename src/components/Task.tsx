import { FormEvent, useState } from "react"
import { Check, Trash } from '@phosphor-icons/react'
import * as Checkbox from '@radix-ui/react-checkbox'

interface TaskList {
  task: string;
  onDeleteTask: (task: string) => void;
  onCompletedTask: (checked: boolean) => void;
}

export function Task({ task, onDeleteTask, onCompletedTask }: TaskList) {
  const [checked, setChecked] = useState(false)

  function handleTaskCompleted() {
    setChecked((prevChecked) => !prevChecked)
  }

  function handleWithTaskCompleted() {
    onCompletedTask(checked)
  }

  function handleDeleteTask(event: FormEvent) {
    event.preventDefault()

    onDeleteTask(task)
  }

  return (
    <div className="flex justify-between items-start gap-3 mb-3 p-4 bg-zinc-550 rounded-lg">
      <Checkbox.Root id={task} onClick={handleTaskCompleted} onCheckedChange={handleWithTaskCompleted} className="flex p-2.5 data-[state=checked]:p-0 border data-[state=checked]:border-transparent border-blue-350 data-[state=unchecked]:hover:bg-blue-550/20 bg-transparent rounded-full">
        <Checkbox.Indicator className="p-0.5 text-zinc-150 bg-purpleDark-500 data-[state=checked]:hover:bg-indigo-450 rounded-full">
          <Check />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={task} id="teste" data-state={checked} className="w-full overflow-hidden text-zinc-150 text-sm data-[state=true]:line-through data-[state=true]:text-zinc-350">{task}</label>

      <button onClick={handleDeleteTask} title="Delete Task">
        <Trash className="text-zinc-350 text-xl hover:text-red-450"/>
      </button>
    </div>
  )
}