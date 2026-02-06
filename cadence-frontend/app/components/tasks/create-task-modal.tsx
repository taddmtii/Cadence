import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dispatch, SetStateAction, useState } from "react";

interface TaskToolBarProps {
  setOpenCreateTask: Dispatch<SetStateAction<boolean>>
}

export function CreateTaskModal({ setOpenCreateTask }: TaskToolBarProps) {
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [frequency, setFrequency] = useState("")
  const [category, setCategory] = useState("")
  const [taskGroup, setTaskGroup] = useState("")
  const [creating, setCreating] = useState(false)

  async function handleCreateTask(e) {
    // TODO: finish implementation.
    e.preventDefault()
    setCreating(true)
    try {
      const res = await fetch('http://localhost:3000/users/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // TODO: fill in body
        })
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized")
        }
        throw new Error("Task Creation failed")
      }
      const response = await res.json()
      setCreating(false)
    } catch (e) {
      throw new Error(e)
      setCreating(false)
    }

  }

  return (<>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setOpenCreateTask(false)}>
      <div className="bg-accent rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Create Task</h2>
        <form className="w-full" onSubmit={handleCreateTask}>
          <FieldGroup>

            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder=""
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                type="text"
                placeholder=""
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
              <Select onValueChange={(value) => setFrequency(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a frequency"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="DAILY">Daily</SelectItem>
                    <SelectItem value="WEEKLY">Weekly</SelectItem>
                    <SelectItem value="BIWEEKLY">Biweekly</SelectItem>
                    <SelectItem value="MONTHLY">Monthly</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Personal Development</SelectLabel>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Nutrition">Nutrition</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Sleep">Sleep</SelectItem>
                    <SelectItem value="Learning">Learning</SelectItem>
                    <SelectItem value="Reading">Reading</SelectItem>
                    <SelectItem value="Hobbies">Hobbies</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Professional</SelectLabel>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Career">Career</SelectItem>
                    <SelectItem value="Projects">Projects</SelectItem>
                    <SelectItem value="Networking">Networking</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Financial</SelectLabel>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Savings">Savings</SelectItem>
                    <SelectItem value="Budgets">Budgets</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Social</SelectLabel>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Relationships">Relationships</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Practical</SelectLabel>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Errands">Errands</SelectItem>
                    <SelectItem value="Habits">Habits</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>

                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="taskGroup">Task Group</FieldLabel>
              <Select onValueChange={(value) => setTaskGroup(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Task Group"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="DAILY">PLACEHOLDER / CALL Task Group method</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Button type="submit" className="bg-[#00f0a0] hover:bg-[#00c080] w-full cursor-pointer">
              {creating ? "Creating task..." : "Create Task"}
            </Button>
          </FieldGroup>
        </form>
        <Button
          onClick={() => setOpenCreateTask(false)}
          className="cursor-pointer"
        >
          Close
        </Button>
      </div>
    </div>
  </>)
}
