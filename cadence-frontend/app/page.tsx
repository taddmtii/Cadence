import { ClipboardCheck, Flame, MoveRight } from "lucide-react";
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
          <section className="flex flex-col border-b border-border py-12 mx-auto mt-10 gap-8 text-center">
            <h1 className="text-6xl max-w-2xl font-bold">Master Your Daily <br /> Routine with <span className="text-[#00f0a0]">Cadence</span></h1>
            <p className="opacity-70 max-w-xl">The accountability platform that helps you build lasting habits through <br /> intelligent tracking, streak mechanics, and powerful analytics. Take control of <br /> your daily rhythm.</p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-[#00f0a0] hover:bg-[#00c080] cursor-pointer">
                <Link className="flex items-center gap-2" href="/signup">Start Organizing <MoveRight /></Link>
              </Button>
            </div>
          </section>
          {/*Features*/}
          <section className="flex flex-col border-b border-border py-12 mx-auto mt-10 gap-8 text-center">
            <h1 className="text-4xl max-w-2xl font-bold">Everything you need to suceed</h1>
            <p className="opacity-70 max-w-xl">Powerful features designed to help you build and maintain your healthy habits.</p>
            <div className="flex gap-4 ">
              <Card className="mx-auto w-85 max-w-4xl hover:border-[#00f0a0]">
                <CardHeader>
                  <div className="flex flex-col gap-2 text-start">
                    <ClipboardCheck />
                    <CardTitle>Smart Task Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Create tasks and task groups, organize them into categories, and track completions with precision.
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
