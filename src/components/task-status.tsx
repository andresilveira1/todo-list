interface TotalTasks {
  totalTasks: () => number;
  completedTasks: number;
}

export function TaskStatus({ totalTasks, completedTasks }: TotalTasks) {
  const createdTasks = totalTasks()

  return (
    <header className="flex justify-between">
      <p className="flex gap-2 items-center text-blue-350 text-sm font-bold">
        Tarefas criadas <span className="text-xs font-bold text-zinc-250 bg-zinc-450 px-2 py-0.5 rounded-full">{createdTasks}</span>
      </p>

      <p className="flex gap-2 text-indigo-450 text-sm font-bold">
        Concluídas <span className="text-xs font-bold text-zinc-250 bg-zinc-450 px-2 py-0.5 rounded-full">{completedTasks} de {createdTasks}</span>
      </p>
    </header>
  )
}