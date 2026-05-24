"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Clock, Trophy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock Data for the Student Dashboard
const statsData = [
  { title: "Enrolled Classes", value: "4", icon: BookOpen, color: "text-blue-500" },
  { title: "Attendance", value: "92%", icon: CheckCircle, color: "text-green-500" },
  { title: "Quizzes Done", value: "12", icon: ClipboardList, color: "text-purple-500" },
  { title: "Avg Score", value: "85%", icon: Trophy, color: "text-yellow-500" },
];

function ClipboardList(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

const upcomingClasses = [
  { id: 1, name: "Advanced Mathematics", subject: "Math", time: "Today, 10:00 AM", teacher: "Mr. Perera" },
  { id: 2, name: "Physics Theory", subject: "Physics", time: "Today, 02:00 PM", teacher: "Dr. Silva" },
  { id: 3, name: "Chemistry Revision", subject: "Chemistry", time: "Tomorrow, 09:00 AM", teacher: "Mrs. Fernando" },
];

const attendanceData = [
  { name: 'Jan', present: 20, absent: 2 },
  { name: 'Feb', present: 18, absent: 4 },
  { name: 'Mar', present: 22, absent: 1 },
  { name: 'Apr', present: 19, absent: 0 },
  { name: 'May', present: 21, absent: 2 },
];

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your academic progress.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Attendance Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Your attendance records for the last 5 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="present" name="Present Days" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" name="Absent Days" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>You have {upcomingClasses.length} classes scheduled next.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{cls.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {cls.time}
                    </p>
                    <p className="text-xs text-muted-foreground">Teacher: {cls.teacher}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {cls.subject}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements & Quizzes */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Quizzes</CardTitle>
            <CardDescription>Your latest quiz performances.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Algebra Basics", score: 90, date: "2 days ago" },
                { name: "Newton's Laws", score: 75, date: "1 week ago" },
                { name: "Organic Chemistry", score: 88, date: "2 weeks ago" },
              ].map((quiz, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{quiz.name}</p>
                    <p className="text-xs text-muted-foreground">{quiz.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[100px]">
                      <Progress value={quiz.score} className="h-2" />
                    </div>
                    <span className="text-sm font-medium w-8">{quiz.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Badges earned from your hard work.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
              <span className="text-xs font-medium text-center">Perfect<br/>Attendance</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-xs font-medium text-center">Top 10%<br/>Math</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
