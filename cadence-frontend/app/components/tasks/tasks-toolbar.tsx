import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Filter, Plus, SlidersHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface TaskToolBarProps {
  setOpenCreateTask: Dispatch<SetStateAction<boolean>>
  setOpenCreateCategory: Dispatch<SetStateAction<boolean>>
}

export function TaskToolbar({ setOpenCreateTask, setOpenCreateCategory }: TaskToolBarProps) {
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#00f0a0] hover:bg-[#00c080] cursor-pointer" onClick={() => setOpenCreateTask(true)}>
                <Plus className="w-4 h-4" /> Create
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex ">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setOpenCreateTask(true)}>Task</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenCreateCategory(true)}>Category</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}
