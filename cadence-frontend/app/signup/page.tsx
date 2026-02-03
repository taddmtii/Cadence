'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { Flame } from "lucide-react";
import { useState } from "react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  async function handleSignup(e) {
    console.log("handleSignup hit...")
    console.log("First Name: ", firstName)
    console.log("Last Name: ", lastName)
    console.log("Email: ", email)
    console.log("Password: ", password)
    e.preventDefault()
    try {
      await api.post('/auth/signup', {
        firstName, lastName, email, password
      });
      console.log("Signup successful!")
    } catch (e) {
      console.error("Signup failed:", e)
    }
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FieldDescription className="flex">
                  Must be at least 8 characters
                </FieldDescription>
              </Field>

              <Button type="submit" className="bg-[#00f0a0] hover:bg-[#00c080] w-full cursor-pointer">
                Create Account
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </>
  );
}
