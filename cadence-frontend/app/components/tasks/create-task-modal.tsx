import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Category } from "@/types/Category";
import { Task } from "@/types/Task";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CreateTaskModalProps {
  categories: Category[] | null | undefined
  setOpenCreateTask: Dispatch<SetStateAction<boolean>>
  setTasks: Dispatch<SetStateAction<Task[] | null>>
}

export function CreateTaskModal({ categories, setOpenCreateTask, setTasks }: CreateTaskModalProps) {
  const { user } = useAuth()
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [creating, setCreating] = useState(false)
  const [priority, setPriority] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  async function handleCreateTask(e) {
    e.preventDefault()
    setCreating(true)
    const categoryRes = await fetch(`http://localhost:3000/category/category-name/${category}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      },
    })

    if (!categoryRes.ok) {
      if (categoryRes.status === 401) {
        throw new Error("Unauthorized")
      }
      throw new Error("Could not retrieve categories")
    }

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
          categoryId: categoryId,
          priority: priority,
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
      handleClose()
      throw new Error(e)
    }
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true)
    })
  }, [])

  function handleClose() {
    setIsVisible(false)
    setTimeout(() => setOpenCreateTask(false), 200)
  }

  return (<>
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={handleClose}
    >
      <div
        className={`bg-accent rounded-lg p-6 w-full max-w-md transition-all duration-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <div className="flex flex-col mb-6">
            <h2 className="text-lg font-bold">Create New Task</h2>
            <span className="text-muted-foreground text-sm">Add a new habit or recurring task to track.</span>
          </div>
          <Button
            onClick={() => handleClose()}
            className="cursor-pointer"
          >
            Close
          </Button>
        </div>
        <form className="w-full" onSubmit={handleCreateTask}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Task Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="e.g, Morning Run"
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
              <Textarea
                id="description"
                placeholder="Add details about this task..."
                onChange={(e) => setDescription(e.target.value)}
                required
                className="h-20 resize-none"
              />
            </Field>
            <div className="flex justify-between">
              <Field className="w-60">
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories?.map((category) => {
                        return (
                          <SelectItem value={category.name} key={category.id}>
                            <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: category.color }}></div>
                            {category.name}</SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field className="w-30">
                <FieldLabel htmlFor="priority">Priority</FieldLabel>
                <Select onValueChange={(value) => setPriority(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a priority"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Button type="submit" className="bg-[#00f0a0] hover:bg-[#00c080] w-full cursor-pointer">
              {creating ? "Creating task..." : "Create Task"}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div >
  </>)
}
