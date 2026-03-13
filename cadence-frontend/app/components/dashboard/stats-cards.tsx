import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/types/Task";
import { Calendar, ChartLine, CircleCheck, Flame } from "lucide-react";

interface StatsCardsProps {
  isLoading: boolean;
  allTasksForToday: Task[];
  allCompletedTasksForToday: Task[];
  currentStreak: number
  weeklyGoal: number
}

export function StatsCards({ isLoading, allTasksForToday, allCompletedTasksForToday, currentStreak, weeklyGoal }: StatsCardsProps) {
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
            <div className="flex flex-col">
              <CardHeader className="flex justify-between">
                <CardDescription>Completed Today</CardDescription>
                <div className="rounded-lg p-2.5 bg-green-300/20">
                  <CircleCheck color="green" className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <span className="font-bold text-2xl">{allCompletedTasksForToday ? allCompletedTasksForToday.length : ""}</span>
                  <span className="text-sm text-muted-foreground"> /{allTasksForToday ? allTasksForToday.length : ""}</span>
                </div>
              </CardContent>
            </div>
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
            <div className="flex flex-col">
              <CardHeader className="flex justify-between">
                <CardDescription>Current Streak</CardDescription>
                <div className="rounded-lg p-2.5 bg-orange-300/30">
                  <Flame color="orange" className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <span className="font-bold text-2xl">{currentStreak !== undefined ? currentStreak : undefined}</span>
                  <span className="text-sm text-muted-foreground"> days</span>
                </div>
              </CardContent>
            </div>
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
            <div className="flex flex-col">
              <CardHeader className="flex justify-between">
                <CardDescription>Weekly Goal</CardDescription>
                <div className="rounded-lg p-2.5 bg-blue-300/20">
                  <Calendar color="lightblue" className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <span className="font-bold text-2xl">{weeklyGoal ? weeklyGoal : 100}</span>
                  <span className="text-sm text-muted-foreground"> %</span>
                </div>
              </CardContent>
            </div>
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
            <div className="flex flex-col">
              <CardHeader className="flex justify-between">
                <CardDescription>Improvement</CardDescription>
                <div className="rounded-lg p-2.5 bg-green-500/10">
                  <ChartLine color="green" className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <span className="font-bold text-2xl">+12</span>
                  <span className="text-sm text-muted-foreground"> %</span>
                </div>
              </CardContent>
            </div>
          )
          }
        </Card>
      </div>
      <div className="flex w-full gap-4">
        <Card className="w-[65%] h-150">
          {isLoading ? (
            <div className="flex px-6 flex-col gap-3">
              <Skeleton className="h-4 w-[30%]" />
              <Skeleton className="h-8 w-[50%]" />
            </div>
          ) : (
            <div className="flex flex-col">
              <CardHeader>
                <CardTitle>Todays Tasks</CardTitle>
                <CardDescription>{allCompletedTasksForToday ? allCompletedTasksForToday.length : ""} of {allTasksForToday ? allTasksForToday.length : ""} completed</CardDescription>
              </CardHeader>
            </div>
          )
          }
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
