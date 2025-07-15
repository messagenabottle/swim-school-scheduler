"use client"
import {
  Calendar,
  Users,
  BookOpen,
  Settings,
  BarChart3,
  CreditCard,
  Bell,
  Home,
  UserCheck,
  MapPin,
  FileText,
  HelpCircle,
  ChevronDown,
  Waves,
} from "lucide-react"

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    title: "Schedule",
    icon: Calendar,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-100",
    items: [
      { title: "Today's Schedule", url: "/schedule/today" },
      { title: "Weekly View", url: "/schedule/week" },
      { title: "Monthly View", url: "/schedule/month" },
      { title: "Book Lesson", url: "/schedule/book" },
    ],
  },
  {
    title: "Students",
    icon: Users,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    items: [
      { title: "All Students", url: "/students" },
      { title: "Add Student", url: "/students/add" },
      { title: "Progress Reports", url: "/students/progress" },
      { title: "Attendance", url: "/students/attendance" },
    ],
  },
  {
    title: "Instructors",
    icon: UserCheck,
    iconColor: "text-cyan-700",
    bgColor: "bg-cyan-100",
    items: [
      { title: "All Instructors", url: "/instructors" },
      { title: "Add Instructor", url: "/instructors/add" },
      { title: "Schedules", url: "/instructors/schedules" },
      { title: "Performance", url: "/instructors/performance" },
    ],
  },
  {
    title: "Lessons",
    url: "/lessons",
    icon: BookOpen,
    iconColor: "text-teal-700",
    bgColor: "bg-teal-100",
  },
  {
    title: "Facilities",
    icon: MapPin,
    iconColor: "text-blue-700",
    bgColor: "bg-blue-100",
    items: [
      { title: "Pool Management", url: "/facilities/pools" },
      { title: "Equipment", url: "/facilities/equipment" },
      { title: "Maintenance", url: "/facilities/maintenance" },
    ],
  },
]

const managementItems = [
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-100",
  },
  {
    title: "Billing",
    icon: CreditCard,
    iconColor: "text-cyan-700",
    bgColor: "bg-cyan-100",
    items: [
      { title: "Invoices", url: "/billing/invoices" },
      { title: "Payments", url: "/billing/payments" },
      { title: "Packages", url: "/billing/packages" },
    ],
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
    iconColor: "text-teal-700",
    bgColor: "bg-teal-100",
  },
]

export function AppSidebar() {
  const { state, open, setOpen } = useSidebar()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [activePage] = useState("Dashboard") // This would come from router in real app

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMouseEnter = () => {
    if (isCollapsed && !isMobile) {
      const timeout = setTimeout(() => {
        setIsHovered(true)
      }, 300) // 300ms delay like Google Keep
      setHoverTimeout(timeout)
    }
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    if (!isMobile) {
      setIsHovered(false)
    }
  }

  const handleMobileToggle = () => {
    if (isMobile) {
      if (isCollapsed) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }
  }

  const handleClickOutside = () => {
    if (isMobile && isHovered) {
      setIsHovered(false)
    }
  }

  const shouldShowExpanded = !isCollapsed || isHovered

  // Check if a section contains the active page
  const sectionContainsActivePage = (item: any) => {
    if (item.title === activePage) return true
    if (item.items) {
      return item.items.some((subItem: any) => subItem.title === activePage)
    }
    return false
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && isHovered && <div className="fixed inset-0 bg-black/20 z-40" onClick={handleClickOutside} />}

      <Sidebar className="border-none">
        <div
          className={`fixed inset-y-0 left-4 z-50 flex transition-all duration-300 ${
            shouldShowExpanded ? "w-72" : "w-16"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMobileToggle}
        >
          <div className="flex w-full flex-col rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl my-4 overflow-hidden">
            <SidebarHeader className={`transition-all duration-300 ${shouldShowExpanded ? "p-6 pb-4" : "p-3"}`}>
              <div className={`flex items-center ${shouldShowExpanded ? "gap-3" : "justify-center"}`}>
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-lg flex-shrink-0">
                  <Waves className="size-5" />
                </div>
                {shouldShowExpanded && (
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-bold text-gray-900 text-lg truncate">Southwest Aquatics</span>
                    <span className="text-xs text-gray-500 font-medium truncate">Swimming Excellence</span>
                  </div>
                )}
              </div>

              {shouldShowExpanded && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between mt-4 bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-200"
                    >
                      <span className="text-sm font-medium">Main Location</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="start">
                    <DropdownMenuItem>
                      <span>Main Location</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>North Branch</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>South Branch</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarHeader>

            <SidebarContent
              className={`flex-1 overflow-y-auto transition-all duration-300 ${shouldShowExpanded ? "px-4" : "px-2"}`}
            >
              <SidebarGroup className="mb-6">
                {shouldShowExpanded && (
                  <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                    Main Navigation
                  </SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu className={`space-y-1 ${!shouldShowExpanded ? "flex flex-col items-center" : ""}`}>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        {item.items && shouldShowExpanded ? (
                          <Collapsible defaultOpen={sectionContainsActivePage(item)} className="group/collapsible">
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton className="w-full h-12 rounded-xl hover:bg-white/60 transition-all duration-200 group">
                                <div
                                  className={`flex items-center justify-center rounded-lg ${item.bgColor} group-hover:scale-110 transition-transform duration-200 w-9 h-9`}
                                >
                                  <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                  {item.title}
                                </span>
                                <ChevronDown className="ml-auto h-4 w-4 text-gray-400 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub className="ml-9 mt-2 space-y-1">
                                {item.items.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                      asChild
                                      className="h-9 rounded-lg hover:bg-white/60 transition-all duration-200"
                                    >
                                      <a href={subItem.url} className="text-sm text-gray-600 hover:text-gray-900">
                                        {subItem.title}
                                      </a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <SidebarMenuButton
                            asChild
                            isActive={item.title === activePage}
                            className={`rounded-xl hover:bg-white/60 transition-all duration-200 group data-[active=true]:bg-cyan-50 data-[active=true]:border data-[active=true]:border-cyan-200 ${shouldShowExpanded ? "w-full h-12" : "h-12 w-12 p-0"}`}
                          >
                            <a
                              href={item.url}
                              className={`flex items-center ${shouldShowExpanded ? "gap-3" : "justify-center"}`}
                            >
                              <div
                                className={`flex items-center justify-center rounded-lg ${item.bgColor} group-hover:scale-110 transition-transform duration-200 w-9 h-9`}
                              >
                                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                              </div>
                              {shouldShowExpanded && (
                                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                  {item.title}
                                </span>
                              )}
                            </a>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                {shouldShowExpanded && (
                  <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                    Management
                  </SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu className={`space-y-1 ${!shouldShowExpanded ? "flex flex-col items-center" : ""}`}>
                    {managementItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        {item.items && shouldShowExpanded ? (
                          <Collapsible defaultOpen={sectionContainsActivePage(item)} className="group/collapsible">
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton className="w-full h-12 rounded-xl hover:bg-white/60 transition-all duration-200 group">
                                <div
                                  className={`flex items-center justify-center rounded-lg ${item.bgColor} group-hover:scale-110 transition-transform duration-200 w-9 h-9`}
                                >
                                  <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                  {item.title}
                                </span>
                                <ChevronDown className="ml-auto h-4 w-4 text-gray-400 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub className="ml-9 mt-2 space-y-1">
                                {item.items.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                      asChild
                                      className="h-9 rounded-lg hover:bg-white/60 transition-all duration-200"
                                    >
                                      <a href={subItem.url} className="text-sm text-gray-600 hover:text-gray-900">
                                        {subItem.title}
                                      </a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <SidebarMenuButton
                            asChild
                            className={`rounded-xl hover:bg-white/60 transition-all duration-200 group ${shouldShowExpanded ? "w-full h-12" : "h-12 w-12 p-0"}`}
                          >
                            <a
                              href={item.url}
                              className={`flex items-center ${shouldShowExpanded ? "gap-3" : "justify-center"}`}
                            >
                              <div
                                className={`flex items-center justify-center rounded-lg ${item.bgColor} group-hover:scale-110 transition-transform duration-200 w-9 h-9`}
                              >
                                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                              </div>
                              {shouldShowExpanded && (
                                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                  {item.title}
                                </span>
                              )}
                            </a>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            {shouldShowExpanded && (
              <SidebarFooter className="p-4 pt-2">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="w-full h-14 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-200 border border-white/30">
                          <Avatar className="h-9 w-9 ring-2 ring-cyan-200">
                            <AvatarFallback className="bg-cyan-600 text-white font-semibold">AM</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-start">
                            <span className="font-medium text-gray-900">Admin Manager</span>
                            <span className="text-xs text-gray-500">admin@swaquatics.com</span>
                          </div>
                          <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="top" className="w-64 mb-2">
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <HelpCircle className="mr-2 h-4 w-4" />
                          <span>Help & Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <span>Sign out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            )}
          </div>
        </div>
      </Sidebar>
    </>
  )
}
