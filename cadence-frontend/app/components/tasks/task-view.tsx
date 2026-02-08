'use client'

import { CategoryStats } from "@/app/(app)/tasks/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Ellipsis, Pencil, ToggleLeft, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface TaskViewProps {
  tasks: Task[] | null
  setTasks: Dispatch<SetStateAction<Task[] | null>>
  selectedCategory: string | null
  categories: CategoryStats[] | null | undefined
}

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

export function TaskView({ tasks, setTasks, selectedCategory, categories }: TaskViewProps) {

  const categoryMap = new Map(categories?.map((category) => [category.categoryId, category.categoryName]) || [])
  const categoryColorMap = new Map(
    categories?.map((category) => [category.categoryId, category.color]) || []
  );
  const frequencyMap = new Map()
  frequencyMap.set("DAILY", "Daily")
  frequencyMap.set("WEEKLY", "Weekly")
  frequencyMap.set("BIWEEKLY", "Biweekly")
  frequencyMap.set("MONTHLY", "Monthly")

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
                        <DropdownMenuItem onClick={(e) => handlePauseTask(task.id, task.archived)}><ToggleLeft />Pause Task</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive"><Trash /> Delete Task</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardHeader className="px-3 text-muted-foreground">{task.description}</CardHeader>
              <CardContent className="px-3 text-muted-foreground text-xs">
                <div className="flex gap-2">
                  <Badge variant="outline">{frequencyMap.get(task.frequency)}</Badge>
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
