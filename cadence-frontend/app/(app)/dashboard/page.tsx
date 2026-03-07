'use client';

import { StatsCards } from "@/app/components/dashboard/stats-cards";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth()

  return <>
    <div className="flex flex-col gap-6 px-10 py-5 w-full">
      <div>
        <h1 className="font-bold">Dashboard</h1>
        <span className="text-muted-foreground">Welcome back, {user?.firstName}!</span>
      </div>
      <StatsCards />

    </div>

  </>
}
