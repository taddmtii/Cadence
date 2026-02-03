import { ChartLine, ClipboardCheck, CloudLightning, Flame, LucideGitGraph, MoveRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function WelcomePage() {
  return (
    <>
      <div className="min-h-screen">

        <header className="fixed top-0 left-0 right-0 border-b">
          <div className="flex w-screen mx-auto justify-between px-6 h-16 items-center max-w-7xl">
            <div className="flex gap-2">
              <Link href="/">
                <div className="flex justify-center items-center rounded-md h-8 w-8 bg-[#00f0a0] ">
                  <Flame className="h-4 w-4" color="black" />
                </div>
              </Link>
              <div className="text-xl font-bold">
                Cadence
              </div>
            </div>
            <div className="flex gap-4">
              <Button className="cursor-pointer" variant={"ghost"}>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="bg-[#00f0a0] hover:bg-[#00c080] cursor-pointer">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </header>

        {/*Main Content*/}
        <div className="flex flex-col mt-16">
          {/*Hero*/}
          <section className="flex flex-col border-b border-border py-12 mx-auto mt-10 gap-8 text-center items-center">
            <h1 className="text-6xl max-w-2xl font-bold">Master Your Daily <br /> Routine with <span className="text-[#00f0a0]">Cadence</span></h1>
            <p className="opacity-70 max-w-xl">The accountability platform that helps you build lasting habits through <br /> intelligent tracking, streak mechanics, and powerful analytics. Take control of <br /> your daily rhythm.</p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-[#00f0a0] hover:bg-[#00c080] cursor-pointer">
                <Link className="flex items-center gap-2" href="/signup">Start Organizing <MoveRight /></Link>
              </Button>
            </div>
          </section>

          {/*Features*/}
          <section className="flex flex-col border-b border-border py-12 mx-auto gap-12 text-center items-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl max-w-2xl font-bold">Everything you need to succeed</h1>
              <p className="opacity-70 max-w-xl">Powerful features designed to help you build and maintain your healthy habits.</p>
            </div>
            <div className="flex flex-col gap-4 max-w-5xl lg:flex-row">
              <Card className="mx-auto w-85 max-w-4xl transition-all duration-200 hover:ring-2 hover:ring-[#00f0a0]">
                <CardHeader className="">
                  <div className="flex flex-col pb-0 gap-2 text-start">
                    <ClipboardCheck />
                    <CardTitle>Smart Task Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-start">
                  <p>
                    Create tasks and task groups, organize them into categories, and track completions with precision.
                  </p>
                </CardContent>
              </Card>
              <Card className="mx-auto w-85 max-w-4xl transition-all duration-200 hover:ring-2 hover:ring-[#00f0a0]">
                <CardHeader>
                  <div className="flex flex-col pb-0 gap-2 text-start">
                    <Zap />
                    <CardTitle>Streak Mechanics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-start">
                  <p>
                    Build momentum with streak tracking. watch your consistency grow as you complete tasks daily.
                  </p>
                </CardContent>
              </Card>
              <Card className="mx-auto w-85 max-w-4xl transition-all duration-200 hover:ring-2 hover:ring-[#00f0a0]">
                <CardHeader>
                  <div className="flex flex-col pb-0 gap-2 text-start">
                    <ChartLine />
                    <CardTitle>Powerful Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-start">
                  <p>
                    Visualize your progress with detailed analytics. See completion rates, trends, and patterns over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/*How Cadence Works*/}
          <section className="flex flex-col border-b border-border py-12 mx-auto gap-12 text-center items-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl max-w-2xl font-bold">How Cadence Works</h1>
              <p className="opacity-70 max-w-xl">Get started in minutes and transform your daily habits.</p>
            </div>
            <div className="flex flex-col gap-4 max-w-5xl lg:flex-row">
              <Card className="mx-auto w-85 max-w-4xl bg-background border-none">
                <CardHeader>
                  <div className="flex flex-col pb-0 gap-2 text-start">
                    <h1 className="text-4xl font-bold text-[#00f0a0]/25">01</h1>
                    <CardTitle>Define Your Tasks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-start">
                  <p>
                    Create tasks, group them into categories, then set your daily, weekly, or monthly schedules.
                  </p>
                </CardContent>
              </Card>
              <Card className="mx-auto w-85 max-w-4xl bg-background border-none">
                <CardHeader>
                  <div className="flex flex-col pb-0 gap-2 text-start">
                    <h1 className="text-4xl font-bold text-[#00f0a0]/25">02</h1>
                    <CardTitle>Track Daily</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-start">
                  <p>
                    Check off tasks as you complete them. Build streaks and watch your consistency improve.
                  </p>
                </CardContent>
              </Card>
              <Card className="mx-auto w-85 max-w-4xl bg-background border-none">
                <CardHeader>
                  <div className="flex flex-col pb-0 gap-2 text-start">
                    <h1 className="text-4xl font-bold text-[#00f0a0]/25">03</h1>
                    <CardTitle>Analyze & improve</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-start">
                  <p>
                    Review your analytics to understand patterns and optimize your routine for success.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>

    </>
  );
}
