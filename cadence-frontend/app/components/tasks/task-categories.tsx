'use client'

import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"

interface CategoryStats {
  categoryId: string;
  categoryName: string;
  taskCount: number;
}

interface TaskCategoriesProps {
  categories: CategoryStats[] | null | undefined
}

export function TaskCategories({ categories }: TaskCategoriesProps) {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <>
      <div className="flex gap-2">
        <Badge
          variant={"secondary"}
          onClick={() => setSelectedCategory(null)}
          className={`p-2 cursor-pointer ${selectedCategory === null ? 'text-primary ring-1 ring-[#00f0a0]' : 'text-muted-foreground hover:text-primary hover:ring-1 hover:ring-[#00f0a0]'} `}>
          All Tasks
        </Badge>
        {categories?.map((category) => {
          const isActive = selectedCategory === category.categoryId
          return (
            <Badge
              variant={"secondary"}
              key={category.categoryId}
              onClick={() => setSelectedCategory(category.categoryId)}
              className={`p-2 cursor-pointer ${isActive ? 'text-primary ring-1 ring-[#00f0a0]' : 'text-muted-foreground hover:text-primary hover:ring-1 hover:ring-[#00f0a0]'} `}>
              <div className="flex gap-4">
                <h1>{category.categoryName}</h1>
                <p>{category.taskCount}</p>
              </div>
            </Badge>
          );
        })}
      </div>
    </>
  )
}
