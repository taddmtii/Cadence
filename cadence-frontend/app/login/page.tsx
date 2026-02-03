'use client';

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/lib/api"
import { Flame } from "lucide-react";
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e) {
    e.preventDefault()
    try {
      await api.post('/auth/login', {
        email, password
      });
      console.log("Login successful!")
    } catch (e) {
      console.error("Login failed:", e)
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col gap-4 w-120 items-center text-center">
          <div className="flex gap-2">
            <div className="flex justify-center items-center rounded-md h-8 w-8 bg-[#00f0a0]">
              <Flame className="h-4 w-4" color="black" />
            </div>
            <div className="text-xl font-bold">
              Cadence
            </div>
          </div>
          <h1 className="text-2xl text-center max-w-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to continue building your habits</p>

          <form className="w-full" onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Button type="submit" className="bg-[#00f0a0] hover:bg-[#00c080] w-full cursor-pointer">
                Sign In
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </>
  );
}
