import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Category } from "@/types/Category";
import { DayOfWeek } from "@/types/DayOfWeek";
import { Task } from "@/types/Task";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface EditTaskModalProps {
  categories: Category[] | null | undefined
  setOpenEditTask: Dispatch<SetStateAction<boolean>>
  setTasks: Dispatch<SetStateAction<Task[] | null>>
  task: Task | undefined | null
  onSuccess: () => void
}

export function EditTaskModal({ categories, setOpenEditTask, setTasks, task, onSuccess }: EditTaskModalProps) {
  const { user } = useAuth()
  const [taskName, setTaskName] = useState(task?.name)
  const [description, setDescription] = useState(task?.description)
  const [category, setCategory] = useState(categories?.find((cat) => cat.id === task?.categoryId)?.name ?? "")
  const [reminderTime, setReminderTime] = useState(task?.reminderTime ? new Date(task.reminderTime).toISOString().slice(11, 16) : "")
  const [recurringDays, setRecurringDays] = useState<DayOfWeek[]>(task?.recurringDays ?? [])
  const [editing, setEditing] = useState(false)
  const [priority, setPriority] = useState(task?.priority)
  const [isVisible, setIsVisible] = useState(false)

  async function handleEditTask(e) {
    e.preventDefault()
    setEditing(true)
    const taskRes = await fetch(`http://localhost:3000/task/${task?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        name: taskName,
        description: description,
        categoryId: categories?.find((cat) => cat.name === category)?.id,
        reminderTime: reminderTime ? `1970-01-01T${reminderTime}:00.000Z` : null,
        recurringDays: recurringDays,
        priority: priority,
        userId: user?.id
      })
    })

    if (!taskRes.ok) {
      if (taskRes.status === 401) {
        throw new Error("Unauthorized")
      }
      throw new Error("Could not update task.")
    }

    const data = await taskRes.json()
    setEditing(false)
    setTasks(prev => prev
      ? prev.map(task => task.id === data.id ? data : task)
      : [data]
    )
    handleClose()
    onSuccess()
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true)
    })
  }, [])

  function handleClose() {
    setIsVisible(false)
    setTimeout(() => setOpenEditTask(false), 200)
  }

  function toggleDay(day: string) {
    setRecurringDays((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

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
            <h2 className="text-lg font-bold">Edit Task</h2>
            <span className="text-muted-foreground text-sm">Make any changes you need.</span>
          </div>
          <Button
            onClick={() => handleClose()}
            className="cursor-pointer"
          >
            Close
          </Button>
        </div>
        <form className="w-full" onSubmit={handleEditTask}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Task Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="e.g, Morning Run"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
              <Textarea
                id="description"
                placeholder="Add details about this task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="h-20 resize-none"
              />
            </Field>
            <div className="flex justify-between">
              <Field className="w-60">
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select value={category} onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="null">None</SelectItem>
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
                <Select value={priority} onValueChange={(value) => setPriority(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="e.g, Low"></SelectValue>
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
            <Field>
              <FieldLabel htmlFor="timeOfDay">Time of Day (optional)</FieldLabel>
              <Input
                id="time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="recurringDays">Schedule</FieldLabel>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  {days.map((day) => (
                    <div key={day}>
                      <Button type="button" onClick={() => toggleDay(day)} className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${recurringDays.includes(day) ? "bg-[#00f0a0] hover:bg-[#00c080]" : "bg-card text-white hover:text-white"}`}>
                        {day.charAt(0)}
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">
                  {recurringDays.length === 7 ? "Every Day" : `${recurringDays.length} days per week`}
                </p>

              </div>
            </Field>
            <Button type="submit" className="bg-[#00f0a0] hover:bg-[#00c080] w-full cursor-pointer">
              {editing ? "Saving..." : "Save"}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div >
  </>)
}
