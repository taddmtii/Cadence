'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Category } from "@/types/Category";
import { Priority } from "@/types/Priority";
import { Task } from "@/types/Task";
import { Calendar, Ellipsis, Pencil, Timer, ToggleLeft, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface TaskViewProps {
  tasks: Task[] | null
  setTasks: Dispatch<SetStateAction<Task[] | null>>
  selectedCategory: string | null
  categories: Category[] | null | undefined
}

export function TaskView({ tasks, setTasks, selectedCategory, categories }: TaskViewProps) {
  // const categoryMap = new Map(categories?.map((category) => [category.id, category.name]) || [])
  const categoryColorMap = new Map(
    categories?.map((category) => [category.id, category.color]) || []
  );

  const priorityColorMap: Record<Priority, string> = {
    Low: "#22c55e",
    Medium: "#eab308",
    High: "#f97316",
    Urgent: "#ef4444"
  }

  async function handlePauseTask(id: string, archived: boolean) {
    try {
      const res = await fetch(`http://localhost:3000/task/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          id: id,
          archived: !archived
        })
      })
      const updatedTask = await res.json()
      setTasks(prev => prev ? prev.map(task => task.id === id ? updatedTask : task) : prev);
    }
    catch (e) {
      throw new Error("Error in updating task.")
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/task/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          id: id,
        })
      })
      if (res.ok) {
        setTasks(prev => prev ? prev.filter(task => task.id !== id) : prev);
      }

    }
    catch (e) {
      throw new Error("Error in deleting task.")
    }
  }


  return (
    <>
      <div className="flex flex-col gap-2">
        {tasks?.map((task) => {
          // Filters for only tasks under the current category selected. Early return if no match.
          if (selectedCategory && selectedCategory !== task.categoryId) {
            return null;
          }
          const categoryColor = categoryColorMap.get(task.categoryId) || "gray"
          const priorityColor = priorityColorMap[task.priority]
          const reminderTime: Date = new Date(task.reminderTime!)
          const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return (
            <Card key={task.id} className={`flex ${task.archived ? 'opacity-50' : ""}`}>
              <div className="flex justify-between px-3">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: categoryColor }}></div>
                  <CardTitle className="px-3 text-md">{task.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">Active</span>
                  <Switch checked={!task.archived} onCheckedChange={() => handlePauseTask(task.id, task.archived)} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost"><Ellipsis /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem><Pencil />Edit Task</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePauseTask(task.id, task.archived)}><ToggleLeft />{task.archived ? "Activate Task" : "Pause Task"}</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}><Trash /> Delete Task</DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this task.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardHeader className="px-3 text-muted-foreground">{task.description}</CardHeader>
              <CardContent className="px-3 text-muted-foreground text-xs">
                <div className="flex gap-2">
                  <Badge variant="outline"><Calendar className="w-4 h-4" />{task.recurringDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)).join(", ")}</Badge>
                  {task.reminderTime ? <Badge variant="outline"><Calendar className="w-4 h-4" />{reminderTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'UTC'
                  })}</Badge> : ""}
                  <Badge style={{ backgroundColor: priorityColor }}><Timer className="w-4 h-4" />{task.priority}</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div >
    </>
  )

}
