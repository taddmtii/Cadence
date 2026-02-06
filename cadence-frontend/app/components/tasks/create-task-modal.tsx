import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";

interface TaskToolBarProps {
  setOpenCreateTask: Dispatch<SetStateAction<boolean>>
}

export function CreateTaskModal({ setOpenCreateTask }: TaskToolBarProps) {
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [frequency, setFrequency] = useState("")
  const [category, setCategory] = useState("")
  const [taskGroup, setTaskGroup] = useState("")

  async function handleCreateTask() {

  }

  return (<>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setOpenCreateTask(false)}>
      <div className="bg-accent rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Create Task</h2>

        <Button
          onClick={() => setOpenCreateTask(false)}
          className="cursor-pointer"
        >
          Close
        </Button>
      </div>
    </div>
  </>)
}
