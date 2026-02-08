'use client'

import { CreateTaskModal } from "@/app/components/tasks/create-task-modal"
import { TaskCategories } from "@/app/components/tasks/task-categories"
import { TaskToolbar } from "@/app/components/tasks/tasks-toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"

interface CategoryStats {
  categoryId: string;
  categoryName: string;
  taskCount: number;
}

export default function TasksPage() {
  const { user } = useAuth()
  const [openCreateTask, setOpenCreateTask] = useState(false)
  const [categories, setCategories] = useState<CategoryStats[] | null>()
  const [isLoading, setIsLoading] = useState(true)

  async function fetchData() {
    const categoryStats = await fetch(`http://localhost:3000/task/category-stats/${user?.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
    const categoryStatsData = await categoryStats.json()
    setCategories(categoryStatsData)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [categories])
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
        {isLoading ? (
          <div className="flex gap-4">
            <Skeleton className="p-4 w-20" />
            <Skeleton className="p-4 w-20" />
            <Skeleton className="p-4 w-20" />
          </div>
        ) : <TaskCategories categories={categories} />}

      </div>
    </>
  )
}
