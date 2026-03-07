import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/types/Task";
import { Flame } from "lucide-react";

interface StatsCardsProps {
  isLoading: boolean;
  allTasksForToday: Task[];
  allCompletedTasksForToday: Task[];
}

export function StatsCards({ isLoading, allTasksForToday, allCompletedTasksForToday }: StatsCardsProps) {

  return (
    <>
      <div className="flex w-full gap-4">
        <Card className="flex-1 h-40 justify-center">
          {isLoading ? (
            <div className="flex px-6 flex-col gap-3">
              <Skeleton className="h-4 w-[50%]" />
              <Skeleton className="h-8 w-[80%]" />
            </div>
          ) : (
            <CardHeader>
              <CardDescription>Completed Today</CardDescription>
              <CardContent className="px-0">
                <div>
                  <span className="font-bold text-2xl">{allCompletedTasksForToday ? allCompletedTasksForToday.length : ""}</span>
                  <span className="text-sm text-muted-foreground"> /{allTasksForToday ? allTasksForToday.length : ""}</span>
                </div>
              </CardContent>
            </CardHeader>
          )
          }
        </Card>

        <Card className="flex-1 h-40 justify-center">
          {isLoading ? (
            <div className="flex px-6 flex-col gap-3">
              <Skeleton className="h-4 w-[50%]" />
              <Skeleton className="h-8 w-[80%]" />
            </div>
          ) : (
            <CardHeader>
              <CardDescription>Current Streak</CardDescription>
            </CardHeader>
          )
          }
        </Card>

        <Card className="flex-1 h-40 justify-center">
          {isLoading ? (
            <div className="flex px-6 flex-col gap-3">
              <Skeleton className="h-4 w-[50%]" />
              <Skeleton className="h-8 w-[80%]" />
            </div>
          ) : (
            <CardHeader>
              <CardDescription>Weekly Goal</CardDescription>
            </CardHeader>
          )
          }
        </Card>

        <Card className="flex-1 h-40 justify-center">
          {isLoading ? (
            <div className="flex px-6 flex-col gap-3">
              <Skeleton className="h-4 w-[50%]" />
              <Skeleton className="h-8 w-[80%]" />
            </div>
          ) : (
            <CardHeader>
              <CardDescription>Improvement</CardDescription>
            </CardHeader>
          )
          }
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
