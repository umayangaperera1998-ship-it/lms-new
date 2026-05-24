"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/api/auth.api";
import { 
  Users, 
  BookOpen, 
  ClipboardList, 
  DollarSign, 
  Clock, 
  Plus, 
  Upload, 
  CheckSquare, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

// Mock Overview Data for Teacher
const stats = [
  { title: "Total Students", value: "320", icon: Users, color: "text-blue-500", desc: "+12 new this week" },
  { title: "Active Classes", value: "6", icon: BookOpen, color: "text-green-500", desc: "4 subjects" },
  { title: "Pending Grading", value: "18", icon: ClipboardList, color: "text-amber-500", desc: "3 quizzes need review" },
  { title: "Monthly Earnings", value: "LKR 145,000", icon: DollarSign, color: "text-purple-500", desc: "+8% from last month" },
];

const todayClasses = [
  { id: 1, name: "Advanced Mathematics", time: "10:00 AM - 12:00 PM", room: "Online Room 1", students: 120 },
  { id: 2, name: "Physics Theory AL 2026", time: "02:00 PM - 04:00 PM", room: "Online Room 3", students: 85 },
];

const tasks = [
  { id: 1, text: "Grade 'Algebra Final Assessment' submissions", due: "Due today" },
  { id: 2, text: "Upload Physics lecture notes for Chapter 4", due: "Due tomorrow" },
  { id: 3, text: "Prepare chemistry MCQ quiz for Friday class", due: "In 2 days" },
];

export default function TeacherDashboardOverviewPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(authApi.getCurrentUser());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user ? `${user.firstName} ${user.lastName}` : "Teacher"}! Here is what's happening today.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Action Hub */}
      <Card className="bg-slate-50 dark:bg-slate-900/10 border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Button asChild className="w-full">
            <Link href="/teacher/quizzes?tab=create">
              <Plus className="mr-2 h-4 w-4" /> Create Quiz
            </Link>
          </Button>
          <Button variant="secondary" asChild className="w-full">
            <Link href="/teacher/materials">
              <Upload className="mr-2 h-4 w-4" /> Upload Material
            </Link>
          </Button>
          <Button variant="secondary" asChild className="w-full">
            <Link href="/teacher/attendance">
              <CheckSquare className="mr-2 h-4 w-4" /> Attendance
            </Link>
          </Button>
          <Button variant="secondary" asChild className="w-full">
            <Link href="/teacher/schedule">
              <Clock className="mr-2 h-4 w-4" /> Class Schedule
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Today's Classes */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Today's Lectures</CardTitle>
            <CardDescription>You have {todayClasses.length} live sessions scheduled today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{cls.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {cls.time}
                    </p>
                    <p className="text-xs text-gray-500">Venue: {cls.room} • {cls.students} enrolled</p>
                  </div>
                  <Button size="sm" variant="default" className="flex items-center gap-1">
                    Start Session <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Items Checklist */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Task Checklist</CardTitle>
            <CardDescription>Things requiring your attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  <div>
                    <p className="text-sm font-medium leading-none">{task.text}</p>
                    <span className="text-[10px] font-semibold text-orange-500 mt-1 block">{task.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
