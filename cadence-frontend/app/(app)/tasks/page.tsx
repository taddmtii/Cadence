'use client'

import { CreateTaskModal } from "@/app/components/tasks/create-task-modal"
import { TaskToolbar } from "@/app/components/tasks/tasks-toolbar"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"

export default function TasksPage() {
  const { user } = useAuth()
  const [openCreateTask, setOpenCreateTask] = useState(false)

  return (
    <>
      <div className="flex flex-col w-full px-10 py-5">
        <h1 className="font-bold">Tasks</h1>
        <span className="text-muted-foreground">Manage your habits and recurring tasks</span>
        <TaskToolbar setOpenCreateTask={setOpenCreateTask} />
        {openCreateTask ? (
          <CreateTaskModal setOpenCreateTask={setOpenCreateTask} />
        ) : null}
      </div>
    </>
  )
}
