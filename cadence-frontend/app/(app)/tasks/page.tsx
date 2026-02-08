'use client'

import { CreateTaskModal } from "@/app/components/tasks/create-task-modal"
import { TaskCategories } from "@/app/components/tasks/task-categories"
import { TaskToolbar } from "@/app/components/tasks/tasks-toolbar"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"

export default function TasksPage() {
  const { user } = useAuth()
  const [openCreateTask, setOpenCreateTask] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-6 w-full px-10 py-5">
        <div>
          <h1 className="font-bold">Tasks</h1>
          <span className="text-muted-foreground">Manage your habits and recurring tasks</span>
        </div>
        <TaskToolbar setOpenCreateTask={setOpenCreateTask} />
        {openCreateTask ? (
          <CreateTaskModal setOpenCreateTask={setOpenCreateTask} />
        ) : null}
        <TaskCategories />
      </div>
    </>
  )
}
