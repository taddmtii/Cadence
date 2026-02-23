import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ColorResult, SketchPicker } from 'react-color'
import { useAuth } from "@/contexts/AuthContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Category } from "@/types/Category";

interface CreateCategoryModalProps {
  setOpenCreateCategory: Dispatch<SetStateAction<boolean>>
  setCategories: Dispatch<SetStateAction<Category[] | null | undefined>>
}

export function CreateCategoryModal({ setOpenCreateCategory, setCategories }: CreateCategoryModalProps) {
  const { user } = useAuth()
  const [categoryName, setCategoryName] = useState("")
  const [color, setColor] = useState("")
  const [showPicker, setShowPicker] = useState(false)
  const [creating, setCreating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)


  async function handleCreateCategory(e) {
    e.preventDefault()
    setCreating(true)
    const categoryRes = await fetch(`http://localhost:3000/category/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        name: categoryName,
        color: color,
        userId: user?.id
      })
    })

    if (!categoryRes.ok) {
      if (categoryRes.status === 401) {
        throw new Error("Unauthorized")
      }
      throw new Error("Could not create category.")
    }
    const newCategory = await categoryRes.json()
    setCreating(false)
    setCategories(prev => prev ? [...prev, newCategory] : [newCategory])
    handleClose()
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true)
    })
  }, [])

  function handleClose() {
    setIsVisible(false)
    setTimeout(() => setOpenCreateCategory(false), 200)
  }

  function handleColorChange(color: ColorResult) {
    setColor(color.hex)
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
            <h2 className="text-lg font-bold">Create New Category</h2>
            <span className="text-sm text-muted-foreground">Group your habits together in categories.</span>
          </div>
          <Button
            onClick={() => handleClose()}
            className="cursor-pointer"
          >
            Close
          </Button>
        </div>
        <form className="w-full" onSubmit={handleCreateCategory}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Category Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Fitness, Cooking"
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="color">Color</FieldLabel>
              <div className="flex items-center gap-3">
                <div onClick={() => setShowPicker(!showPicker)}
                  style={{ backgroundColor: color }}
                  className="w-10 h-10 rounded border-2 border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                  title="Click to pick the category color" />
                <Input id="color" type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="#000000" className="flex-1" />
              </div>
              {showPicker && (
                <div className="mt-2 relative">
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowPicker(false)}
                  />
                  <div className="relative z-20">
                    <SketchPicker
                      color={color}
                      onChangeComplete={handleColorChange}
                    />
                  </div>
                </div>
              )}
            </Field>
            <Button type="submit" className="bg-[#00f0a0] hover:bg-[#00c080] w-full cursor-pointer">
              {creating ? "Creating category..." : "Create Category"}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div >
  </>)
}
