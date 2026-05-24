"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Calendar, Users, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const teacherClasses = [
  {
    id: 1,
    name: "Advanced Mathematics - AL 2026",
    subject: "Mathematics",
    grade: "A/L",
    studentsCount: 120,
    schedule: "Mon & Wed, 10:00 AM - 12:00 PM",
    averagePerformance: 82,
    status: "Active",
  },
  {
    id: 2,
    name: "Physics Theory AL 2026",
    subject: "Physics",
    grade: "A/L",
    studentsCount: 85,
    schedule: "Tue & Thu, 02:00 PM - 04:00 PM",
    averagePerformance: 76,
    status: "Active",
  },
  {
    id: 3,
    name: "Chemistry Revision Grade 13",
    subject: "Chemistry",
    grade: "A/L",
    studentsCount: 150,
    schedule: "Saturday, 08:00 AM - 11:00 AM",
    averagePerformance: 88,
    status: "Active",
  },
  {
    id: 4,
    name: "Applied Math Crash Course",
    subject: "Mathematics",
    grade: "A/L",
    studentsCount: 45,
    schedule: "Friday, 06:00 PM - 08:00 PM",
    averagePerformance: 90,
    status: "Draft",
  },
];

export default function TeacherClassesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes & Course Management</h1>
          <p className="text-muted-foreground mt-1">Create, organize, and monitor your academic classrooms.</p>
        </div>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add New Class
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search classes..."
            className="pl-8 bg-white dark:bg-gray-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teacherClasses.map((cls) => (
          <Card key={cls.id} className="flex flex-col h-full hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant={cls.status === "Active" ? "default" : "secondary"}>
                  {cls.status}
                </Badge>
                <Badge variant="outline">{cls.grade}</Badge>
              </div>
              <CardTitle className="text-xl line-clamp-1">{cls.name}</CardTitle>
              <CardDescription>{cls.subject}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4 flex-1">
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  <span>{cls.schedule}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-gray-400" />
                  <span>{cls.studentsCount} Students Registered</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Average Class Score</span>
                    <span className="font-semibold">{cls.averagePerformance}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full" 
                      style={{ width: `${cls.averagePerformance}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 gap-2">
              <Button size="sm" variant="outline" asChild className="flex-1">
                <Link href={`/teacher/classes/${cls.id}`}>
                  <Eye className="w-4 h-4 mr-1"/> View
                </Link>
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Pencil className="w-4 h-4 mr-1"/> Edit
              </Button>
              <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4"/>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
