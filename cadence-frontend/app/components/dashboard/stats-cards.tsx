import { Card } from "@/components/ui/card";

export function StatsCards() {
  return (
    <>
      <div className="flex w-full gap-4">
        <Card className="flex-1 h-40" />
        <Card className="flex-1 h-40" />
        <Card className="flex-1 h-40" />
        <Card className="flex-1 h-40" />
      </div>
      <div className="flex w-full gap-4">
        <Card className="w-[65%] h-150" />
        <Card className="w-[35%] h-150" />
      </div>
      <div className="flex w-full">
        <Card className="w-full h-90" />
      </div>
    </>

  )
}
