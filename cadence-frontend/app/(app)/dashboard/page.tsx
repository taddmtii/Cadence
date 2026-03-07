'use client';

import { StatsCards } from "@/app/components/dashboard/stats-cards";
import { useAuth } from "@/contexts/AuthContext";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth()
  const [allTasksForToday, setAllTasksForToday] = useState<Task[]>()
  const [allCompletedTasksForToday, setAllCompletedTasksForToday] = useState<Task[]>()
  const [isLoading, setIsLoading] = useState(true)

  async function fetchData() {
    const allTasksForToday = await fetch(`http://localhost:3000/task/allTasksForTodayForUser/${user?.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
    const allCompletedTasksForToday = await fetch(`http://localhost:3000/task/allCompletedTasksForTodayForUser/${user?.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      },
    })


    const allTasksForTodayData = await allTasksForToday.json()
    const allCompletedTasksForTodayData = await allCompletedTasksForToday.json()
    setAllTasksForToday(allTasksForTodayData)
    setAllCompletedTasksForToday(allCompletedTasksForTodayData)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [isLoading])

  return <>
    <div className="flex flex-col gap-6 px-10 py-5 w-full">
      <div>
        <h1 className="font-bold">Dashboard</h1>
        <span className="text-muted-foreground">Welcome back, {user?.firstName}!</span>
      </div>
      <StatsCards isLoading={isLoading} allTasksForToday={allTasksForToday} allCompletedTasksForToday={allCompletedTasksForToday} />
    </div>

  </>
}
