"use client"

import { Calendar, Clock, Users, BookOpen, TrendingUp, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function SwimSchoolDashboard() {
  const upcomingLessons = [
    {
      id: 1,
      student: "Emma Johnson",
      instructor: "Sarah Miller",
      time: "9:00 AM",
      type: "Private Lesson",
      level: "Beginner",
      pool: "Lane 1",
    },
    {
      id: 2,
      student: "Michael Chen",
      instructor: "David Wilson",
      time: "10:30 AM",
      type: "Group Lesson",
      level: "Intermediate",
      pool: "Lane 2-3",
    },
    {
      id: 3,
      student: "Sofia Garcia",
      instructor: "Sarah Miller",
      time: "2:00 PM",
      type: "Private Lesson",
      level: "Advanced",
      pool: "Lane 1",
    },
  ]

  const stats = [
    {
      title: "Today's Lessons",
      value: "12",
      change: "+2 from yesterday",
      icon: BookOpen,
      color: "text-cyan-600",
    },
    {
      title: "Active Students",
      value: "148",
      change: "+12 this week",
      icon: Users,
      color: "text-teal-600",
    },
    {
      title: "Instructors Available",
      value: "6",
      change: "2 on break",
      icon: Clock,
      color: "text-cyan-500",
    },
    {
      title: "Revenue This Month",
      value: "$12,450",
      change: "+18% from last month",
      icon: TrendingUp,
      color: "text-teal-500",
    },
  ]

  const instructorSchedule = [
    { name: "Sarah Miller", lessons: 5, status: "Active", avatar: "SM" },
    { name: "David Wilson", lessons: 4, status: "Active", avatar: "DW" },
    { name: "Lisa Chen", lessons: 3, status: "Break", avatar: "LC" },
    { name: "Mike Johnson", lessons: 6, status: "Active", avatar: "MJ" },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 ml-20">
        {/* Simplified Header */}
        <div className="flex justify-end items-center gap-4 p-6 pb-0">
          <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white/80">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Lesson
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-6 bg-gradient-to-br from-cyan-50/30 to-teal-50/30 min-h-screen">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <div className="p-2 rounded-lg bg-white/50">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Schedule */}
            <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-100">
                    <Calendar className="h-5 w-5 text-teal-600" />
                  </div>
                  Today's Schedule
                </CardTitle>
                <CardDescription>Upcoming lessons and appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-200 border border-white/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium text-cyan-600 min-w-[60px] bg-cyan-100 px-2 py-1 rounded-lg">
                          {lesson.time}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{lesson.student}</div>
                          <div className="text-sm text-gray-500">
                            with {lesson.instructor} • {lesson.pool}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={lesson.type === "Private Lesson" ? "default" : "secondary"}
                          className="bg-cyan-600 text-white hover:bg-cyan-700"
                        >
                          {lesson.type}
                        </Badge>
                        <Badge variant="outline" className="border-cyan-200 text-cyan-700">
                          {lesson.level}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/30">
                  <Button variant="outline" className="w-full bg-white/50 hover:bg-white/80 border-white/30">
                    View Full Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Status */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-cyan-100">
                    <Users className="h-5 w-5 text-cyan-600" />
                  </div>
                  Instructor Status
                </CardTitle>
                <CardDescription>Current availability and workload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructorSchedule.map((instructor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-white/30"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="ring-2 ring-cyan-200">
                          <AvatarFallback className="bg-cyan-600 text-white font-semibold">
                            {instructor.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{instructor.name}</div>
                          <div className="text-sm text-gray-500">{instructor.lessons} lessons today</div>
                        </div>
                      </div>
                      <Badge
                        variant={instructor.status === "Active" ? "default" : "secondary"}
                        className={instructor.status === "Active" ? "bg-green-600 text-white hover:bg-green-700" : ""}
                      >
                        {instructor.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/30">
                  <Button variant="outline" className="w-full bg-white/50 hover:bg-white/80 border-white/30">
                    Manage Instructors
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6 bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used actions and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/80 border-white/30 hover:scale-105 transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-cyan-100">
                    <BookOpen className="h-6 w-6 text-cyan-600" />
                  </div>
                  <span className="text-sm font-medium">Book Lesson</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/80 border-white/30 hover:scale-105 transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-teal-100">
                    <Users className="h-6 w-6 text-teal-600" />
                  </div>
                  <span className="text-sm font-medium">Add Student</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/80 border-white/30 hover:scale-105 transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-cyan-100">
                    <Calendar className="h-6 w-6 text-cyan-600" />
                  </div>
                  <span className="text-sm font-medium">View Calendar</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/80 border-white/30 hover:scale-105 transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-teal-100">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <span className="text-sm font-medium">Time Tracking</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  )
}
