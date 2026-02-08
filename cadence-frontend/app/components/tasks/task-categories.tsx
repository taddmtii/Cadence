import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"

export function TaskCategories() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<Map<string, number>>()

  async function fetchCategories(e) {
    // 1. check all of the logged in users tasks, get categories from them.
    // 2. as we continue looking through the tasks, add category we have not seen before in the array and increment count.
    e.preventDefault()
  }

  return (
    <>
      <div className="flex">
        {/*{for (let [key, value] of  categories.entries()) {
          return (
        <Button key={category} variant={"outline"}>
          {category}
        </Button>
        )
        })}*/}

      </div>
    </>
  )
}
