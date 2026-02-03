'use client';

import api from "@/lib/api"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    try {
      api.post('/auth/login', {
        email, password
      });
    } catch (e) {
      console.error("Login failed:", e)
    }
  }

  return (
    <div>
      Login
    </div>
  );
}
