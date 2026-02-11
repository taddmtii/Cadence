'use client'

import { CreateCategoryModal } from "@/app/components/tasks/create-category-modal"
import { CreateTaskModal } from "@/app/components/tasks/create-task-modal"
import { TaskCategories } from "@/app/components/tasks/task-categories"
import { TaskView } from "@/app/components/tasks/task-view"
import { TaskToolbar } from "@/app/components/tasks/tasks-toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/contexts/AuthContext"
import { Task } from "@/types/Task"
import { useEffect, useState } from "react"

export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  color: string;
  taskCount: number;
}

export default function TasksPage() {
  const { user } = useAuth()
  const [openCreateTask, setOpenCreateTask] = useState(false)
  const [openCreateCategory, setOpenCreateCategory] = useState(false)
  const [categories, setCategories] = useState<CategoryStats[] | null>()
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function fetchData() {
    // Get all category information for badges
    const categoryStats = await fetch(`http://localhost:3000/task/category-stats/${user?.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
    const categoryStatsData = await categoryStats.json()
    setCategories(categoryStatsData)

    // Get all tasks for user for display
    const tasks = await fetch(`http://localhost:3000/task/allTasksForUser/${user?.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
    const tasksData = await tasks.json()
    setTasks(tasksData)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [isLoading])
  return (
    <>
      <div className="flex flex-col gap-6 w-full px-10 py-5">
        <div>
          <h1 className="font-bold">Tasks</h1>
          <span className="text-muted-foreground">Manage your habits and recurring tasks</span>
        </div>
        <TaskToolbar setOpenCreateTask={setOpenCreateTask} setOpenCreateCategory={setOpenCreateCategory} />
        {openCreateTask ? (
          <CreateTaskModal setOpenCreateTask={setOpenCreateTask} setTasks={setTasks} />
        ) : null}
        {openCreateCategory ? (
          <CreateCategoryModal setOpenCreateCategory={setOpenCreateCategory} setCategories={setCategories} />
        ) : null}
        {isLoading ? (
          <div className="flex gap-4">
            <Skeleton className="p-4 w-20" />
            <Skeleton className="p-4 w-20" />
            <Skeleton className="p-4 w-20" />
          </div>
        ) : <TaskCategories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
        <TaskView tasks={tasks} setTasks={setTasks} selectedCategory={selectedCategory} categories={categories} />
      </div>
    </>
  )
}
