'use client'

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null)
  const router = useRouter()

  async function checkAuth() {
    try {
      const token = localStorage.getItem("accessToken")

      // redirect to login page if no token
      if (!token) {
        router.push('/')
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

  useEffect(() => {
    checkAuth()
  }, [])

  async function login(email: string, password: string) {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized")
      }
      throw new Error("Login failed")
    }
    const response = await res.json()
    localStorage.setItem("accessToken", response.accessToken)

    const userResponse = await fetch('http://localhost:3000/auth/me', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${response.accessToken}`,
        "Content-Type": "application/json"
      },
    });
    const userData = await userResponse.json()
    setUser(userData)

    router.replace('/dashboard')

  }

  async function signup(firstName: string, lastName: string, email: string, password: string) {
    const res = await fetch('http://localhost:3000/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized")
      }
      throw new Error("Account Creation failed")
    }
    const response = await res.json()
    localStorage.setItem("accessToken", response.accessToken)

    const userResponse = await fetch('http://localhost:3000/auth/me', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${response.accessToken}`,
        "Content-Type": "application/json"
      },
    });
    const userData = await userResponse.json()
    setUser(userData)

    router.replace('/dashboard')
  }

  async function logout() {
    localStorage.removeItem('accessToken')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      isAuthenticated: !!user,
      signup,
      logout
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook so that we can extrapulate these auth functions anywhere.
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider!");
  }
  return context;
}
