import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        {/*Hero goes here*/}
      </div>
    </>
  );
}
