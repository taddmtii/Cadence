'use client';

import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return <>
    <div></div>
  </>
}
