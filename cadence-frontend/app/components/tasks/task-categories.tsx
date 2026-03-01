'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Category } from "@/types/Category";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react"

interface TaskCategoriesProps {
  categories: Category[] | null | undefined
  setCategories: Dispatch<SetStateAction<Category[] | null | undefined>>
  selectedCategory: string | null
  setSelectedCategory: Dispatch<SetStateAction<string | null>>
  setSelectedEditCategory: Dispatch<SetStateAction<Category | null>>
  setOpenEditCategory: Dispatch<SetStateAction<boolean>>
}

export function TaskCategories({ categories, setCategories, selectedCategory, setSelectedCategory, setSelectedEditCategory, setOpenEditCategory }: TaskCategoriesProps) {

  async function handleCategoryDelete(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/category/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          id: id,
        })
      })
      console.log(res)
      if (res.ok) {
        setCategories(prev => prev ? prev.filter(cat => cat.id !== id) : prev);
      }

    }
    catch (e) {
      throw new Error("Error in deleting task.")
    }

  }
  return (
    <>
      <div className="flex gap-2 flex-wrap">
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
                  <p>{category._count?.tasks ?? 0}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="w-2 h-2 cursor-pointer" variant="ghost"><Ellipsis /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => {
                          setSelectedEditCategory(category)
                          setOpenEditCategory(true)
                        }}><Pencil />Edit Category</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}><Trash /> Delete Category</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this category.

                                The tasks associated with this category will be orphaned and thus show up under All Tasks.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCategoryDelete(category.id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Badge>
            </div >
          );
        })}
      </div >
    </>
  )
}
