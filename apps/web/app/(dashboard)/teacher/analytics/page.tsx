"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";

const performanceData = [
  { class: "Advanced Math", average: 82, passingRate: 95 },
  { class: "Physics Theory", average: 76, passingRate: 88 },
  { class: "Chemistry Revision", average: 88, passingRate: 98 },
  { class: "Applied Math", average: 70, passingRate: 85 },
];

const registrationTrend = [
  { month: "Jan", students: 180 },
  { month: "Feb", students: 210 },
  { month: "Mar", students: 240 },
  { month: "Apr", students: 290 },
  { month: "May", students: 320 },
];

export default function TeacherAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Classroom Analytics</h1>
        <p className="text-muted-foreground mt-1">Review average class performance and registration trends.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Class Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Class Averages & Passing Rates</CardTitle>
            <CardDescription>Performance comparison across active courses.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="class" />
                <YAxis unit="%" />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" name="Class Average" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="passingRate" name="Passing Rate" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Student Enrolment Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Student Growth Trend</CardTitle>
            <CardDescription>Cumulative active student enrollments over the past 5 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" name="Active Students" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
