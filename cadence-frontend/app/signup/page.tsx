'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Flame } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailTaken, setEmailTaken] = useState(false)
  const [passwordValid, setPasswordValid] = useState(true)
  const [creating, setCreating] = useState(false)
  const router = useRouter()

  async function handleSignup(e) {
    e.preventDefault()
    setCreating(true)
    try {
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
      const response = await res.json()
      localStorage.setItem("accessToken", response.accessToken)
      setCreating(false)
      setPasswordValid(true)
      router.replace('/dashboard')
    } catch (e) {
      setCreating(false)
      setEmailTaken(true)
    }
  }

  function validatePassword(password: string) {
    return (password.length > 8)
  }

  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="flex flex-col gap-4 w-120 items-center text-center">
          <div className="flex gap-2">
            <div className="flex justify-center items-center rounded-md h-8 w-8 bg-[#00f0a0]">
              <Flame className="h-4 w-4" color="black" />
            </div>
            <div className="text-xl font-bold">
              Cadence
            </div>
          </div>
          <h1 className="text-2xl text-center max-w-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground">Start building better habits today</p>

          <form className="w-full" onSubmit={handleSignup}>
            <FieldGroup>
              <div className="flex gap-4">
                <Field>
                  <FieldLabel htmlFor="firstName">First name</FieldLabel>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Smith"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Field>
              </div>
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
                  onChange={(e) => { setPassword(e.target.value); setPasswordValid(validatePassword(e.target.value)) }}
                  required
                  aria-invalid={!passwordValid}
                  minLength={8}
                />
                <FieldDescription className="flex">
                  Must be at least 8 characters
                </FieldDescription>
              </Field>
              {emailTaken && <p className="text-[red]">Email already registered, try signing in instead</p>}
              <Button type="submit" className="bg-[#00f0a0] hover:bg-[#00c080] w-full cursor-pointer">
                {creating ? "Creating account..." : "Create Account"}
              </Button>
              <FieldDescription className="flex gap-1">
                Already have an account? <Link href={'/login'} className="text-bold">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </div>
      </div>
    </>
  );
}
