'use client'

import { Badge } from "@/components/ui/badge";
import { Category } from "@/types/Category";
import { Dispatch, SetStateAction } from "react"

interface TaskCategoriesProps {
  categories: Category[] | null | undefined
  selectedCategory: string | null
  setSelectedCategory: Dispatch<SetStateAction<string | null>>
}

export function TaskCategories({ categories, selectedCategory, setSelectedCategory }: TaskCategoriesProps) {
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
          const isActive = selectedCategory === category.id
          const color = category.color
          return (
            <div key={category.id}>
              <Badge
                variant={"secondary"}
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-2 cursor-pointer ${isActive ? 'text-primary ring-1 ring-[#00f0a0]' : 'text-muted-foreground hover:text-primary hover:ring-1 hover:ring-[#00f0a0]'} `}>
                <div className="flex items-center text-center gap-2">
                  <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: color }}></div>
                  <h1>{category.name}</h1>
                  <p>{category._count.tasks}</p>
                </div>
              </Badge>
            </div >
          );
        })}
      </div >
    </>
  )
}
