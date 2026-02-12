'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Category } from "@/types/Category";
import { Task } from "@/types/Task";
import { Ellipsis, Pencil, ToggleLeft, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface TaskViewProps {
  tasks: Task[] | null
  setTasks: Dispatch<SetStateAction<Task[] | null>>
  selectedCategory: string | null
  categories: Category[] | null | undefined
}

export function TaskView({ tasks, setTasks, selectedCategory, categories }: TaskViewProps) {

  const categoryMap = new Map(categories?.map((category) => [category.id, category.name]) || [])
  const categoryColorMap = new Map(
    categories?.map((category) => [category.id, category.color]) || []
  );

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
          const color = categoryColorMap.get(task.categoryId) || "gray"

          return (
            <Card key={task.id} className={`flex ${task.archived ? 'opacity-50' : ""}`}>
              <div className="flex justify-between px-3">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: color }}></div>
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
                        <DropdownMenuItem onClick={(e) => handlePauseTask(task.id, task.archived)}><ToggleLeft />{task.archived ? "Activate Task" : "Pause Task"}</DropdownMenuItem>
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
                  <Badge variant="outline">{task.frequency}</Badge>
                  <Badge variant="outline">{categoryMap.get(task.categoryId)}</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div >
    </>
  )

}
