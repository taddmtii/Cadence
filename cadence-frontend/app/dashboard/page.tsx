'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  async function fetchUserData() {
    try {
      const token = localStorage.getItem("accessToken")

      // redirect to login page if no token
      if (!token) {
        router.push('/login')
        return;
      }

      const res = await fetch('http://localhost:3000/auth/me', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      const userData = await res.json()
      setUser(userData)
    } catch (e) {
      console.error('Error when trying to fetch user: ', e)
      localStorage.removeItem('token')
      router.push('/login')
    }
  }

  async function handleLogout() {
    localStorage.removeItem('token')
    router.push('/login')
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return <div>

  </div>
}
