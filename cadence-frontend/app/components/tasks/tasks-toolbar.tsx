import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Filter, Plus, SlidersHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface TaskToolBarProps {
  setOpenCreateTask: Dispatch<SetStateAction<boolean>>
}

export function TaskToolbar({ setOpenCreateTask }: TaskToolBarProps) {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex">
          <Field orientation="horizontal">
            <Input type="search" placeholder="Search..." />
            <Button>Search</Button>
          </Field>
        </div>
        <div className="flex gap-2">
          <Button className="cursor-pointer" variant={"ghost"}>
            <Filter className="w-4 h-4" />Filter
          </Button>
          <Button className="cursor-pointer" variant={"ghost"}>
            <SlidersHorizontal className="w-4 h-4" />Sort
          </Button>
          <Button className="bg-[#00f0a0] hover:bg-[#00c080] cursor-pointer" onClick={() => setOpenCreateTask(true)}>
            <Plus className="w-4 h-4" /> New Task
          </Button>
        </div>
      </div>
    </>
  )
}
