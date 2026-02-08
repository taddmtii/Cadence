import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Dispatch, SetStateAction, useState } from "react";

interface Task {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  archived: boolean;
  archivedAt: Date | null;
  description: string | null;
  frequency: string;
  categoryId: string;
  taskGroupId: string | null;
  userId: string;
}


interface TaskToolBarProps {
  setOpenCreateTask: Dispatch<SetStateAction<boolean>>
  setTasks: Dispatch<SetStateAction<Task[] | null>>
}

export function CreateTaskModal({ setOpenCreateTask, setTasks }: TaskToolBarProps) {
  const { user } = useAuth()
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [frequency, setFrequency] = useState("")
  const [category, setCategory] = useState("")
  const [creating, setCreating] = useState(false)

  async function handleCreateTask(e) {
    e.preventDefault()
    setCreating(true)
    const categoryRes = await fetch(`http://localhost:3000/category/category-name/${category}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
    const data = await categoryRes.json()
    const categoryId = data.id

    try {
      const res = await fetch('http://localhost:3000/task', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          name: taskName,
          description: description,
          frequency: frequency,
          categoryId: categoryId,
          userId: user?.id
        })
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized")
        }
        throw new Error("Task Creation failed, ", e)
      }
      const newTask = await res.json()
      setCreating(false)
      setTasks(prev => prev ? [...prev, newTask] : [newTask])

      setOpenCreateTask(false)
    } catch (e) {
      setCreating(false)
      setOpenCreateTask(false)
      throw new Error(e)
    }

  }

  return (<>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setOpenCreateTask(false)}>
      <div className="bg-accent rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-4">Create Task</h2>
          <Button
            onClick={() => setOpenCreateTask(false)}
            className="cursor-pointer"
          >
            Close
          </Button>
        </div>
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
              <Textarea
                id="description"
                placeholder=""
                onChange={(e) => setDescription(e.target.value)}
                required
                className="h-40 resize-none"
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
            <Button type="submit" className="bg-[#00f0a0] hover:bg-[#00c080] w-full cursor-pointer">
              {creating ? "Creating task..." : "Create Task"}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  </>)
}
