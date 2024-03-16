import { ClipboardText } from "@phosphor-icons/react";

export function EmptyForm() {
  return (
    <div className="flex flex-col justify-center items-center h-60 text-zinc-350 border-t-[1px] border-zinc-450 rounded-md">
      <ClipboardText className="text-7xl mb-4 text-zinc-450" weight="thin" />

      <strong>Você ainda não tem tarefas cadastradas</strong>

      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}