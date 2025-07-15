"use client"

import { PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-50 h-8 w-8 bg-white border border-gray-200 shadow-md hover:bg-gray-50 md:relative md:top-auto md:left-auto md:shadow-none md:border-gray-300"
      aria-label="Toggle Sidebar"
    >
      <PanelLeft className="h-4 w-4" />
    </Button>
  )
}
