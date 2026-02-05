import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"
import { ChartColumnIncreasing, Flame, LayoutDashboard, ListChecks, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const pages = [
    { name: "Dashboard", route: "/dashboard", icon: LayoutDashboard },
    { name: "Tasks", route: "/tasks", icon: ListChecks },
    { name: "History", route: "/history", icon: ChartColumnIncreasing },
    { name: "Settings", route: "/settings", icon: Settings },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="px-5 pt-5 pb-0">
        <div className="flex gap-2">
          <div className="flex justify-center items-center rounded-md h-8 w-8 bg-[#00f0a0]">
            <Flame className="h-4 w-4" color="black" />
          </div>
          <div className="text-xl font-bold">
            Cadence
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-sm py-5">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-2">
              {pages.map((page) => {
                const isActive = pathname === page.route;
                return (
                  <SidebarMenuItem key={page.name}>
                    <SidebarMenuButton asChild>
                      <Link href={page.route} className={`transition-colors ${isActive ? "text-[#00f0a0] bg-sidebar-accent" : "text-muted-foreground hover:bg-sidebar-accent"} `}>
                        <div className="flex items-center gap-2">
                          <page.icon className="h-4 w-4" />
                          {page.name}
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent >
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage src={"https://github.com/shadcn.png"} alt="avatar" />
                      <AvatarFallback>TT</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="right" align="start">
                <DropdownMenuItem className="flex items-center text-destructive" onClick={() => {
                  logout()
                }}>
                  <LogOut className="h-4 w-4" /> <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar >
  )
}
