import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

// interface StatsCardsProps {
//   tasksCompletedToday: number;
//   totalTasksCount: number;

// }

export function StatsCards() {
  return (
    <>
      <div className="flex w-full gap-4">
        <Card className="flex-1 h-40 justify-center">
          <CardHeader>
            <CardDescription>Completed Today</CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex-1 h-40 justify-center">
          <CardHeader>
            <CardDescription>Current Streak</CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex-1 h-40 justify-center">
          <CardHeader>
            <CardDescription>Weekly Goal</CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex-1 h-40 justify-center">
          <CardHeader>
            <CardDescription>Improvement</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex w-full gap-4">
        <Card className="w-[65%] h-150">
          <CardHeader>
            <CardTitle>Todays Tasks</CardTitle>
            <CardDescription>2 of 6 completed</CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex w-[35%] h-150">
          <CardHeader>
            <div className="flex gap-1 justify-center items-center">
              <Flame color="orange" />
              <CardTitle>Streak Stats</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="flex w-full">
        <Card className="w-full h-90">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Task completion over the past 7 days.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>

  )
}
