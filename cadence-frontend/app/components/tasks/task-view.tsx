'use client'

import { CategoryStats } from "@/app/(app)/tasks/page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskViewProps {
  tasks: Task[] | null
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

export function TaskView({ tasks, selectedCategory, categories }: TaskViewProps) {

  const categoryMap = new Map(categories?.map((category) => [category.categoryId, category.categoryName]) || [])
  const frequencyMap = new Map()
  frequencyMap.set("DAILY", "Daily")
  frequencyMap.set("WEEKLY", "Weekly")
  frequencyMap.set("BIWEEKLY", "Biweekly")
  frequencyMap.set("MONTHLY", "Monthly")
  return (
    <>
      <div className="flex flex-col gap-2">
        {tasks?.map((task) => {
          // Filters for only tasks under the current category selected. Early return if no match.
          if (selectedCategory && selectedCategory !== task.categoryId) {
            return null;
          }

          return (
            <Card key={task.id} className="flex" >
              <CardTitle className="px-3 text-md">{task.name}</CardTitle>
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
