"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Video, FileText, Clock, Users } from "lucide-react";

const enrolledClasses = [
  {
    id: 1,
    name: "Advanced Mathematics - AL 2026",
    subject: "Mathematics",
    grade: "A/L",
    teacher: "Mr. Nimal Perera",
    schedule: "Mon & Wed, 10:00 AM - 12:00 PM",
    progress: 45,
    students: 120,
    nextClass: "Today, 10:00 AM",
    status: "Active",
  },
  {
    id: 2,
    name: "Physics Theory Class",
    subject: "Physics",
    grade: "A/L",
    teacher: "Dr. Ajith Silva",
    schedule: "Tue & Thu, 02:00 PM - 04:00 PM",
    progress: 30,
    students: 85,
    nextClass: "Tomorrow, 02:00 PM",
    status: "Active",
  },
  {
    id: 3,
    name: "Chemistry Revision",
    subject: "Chemistry",
    grade: "A/L",
    teacher: "Mrs. Kanthi Fernando",
    schedule: "Saturday, 08:00 AM - 11:00 AM",
    progress: 75,
    students: 150,
    nextClass: "Saturday, 08:00 AM",
    status: "Active",
  },
  {
    id: 4,
    name: "ICT Practical Session",
    subject: "ICT",
    grade: "A/L",
    teacher: "Mr. Saman Kumara",
    schedule: "Friday, 04:00 PM - 06:00 PM",
    progress: 10,
    students: 40,
    nextClass: "Friday, 04:00 PM",
    status: "New",
  },
];

export default function StudentClassesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
          <p className="text-muted-foreground mt-1">Manage your enrolled classes and join live sessions.</p>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((cls) => (
          <Card key={cls.id} className="flex flex-col h-full hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant={cls.status === "New" ? "success" : "default"}>{cls.status}</Badge>
                <Badge variant="outline">{cls.subject}</Badge>
              </div>
              <CardTitle className="line-clamp-2 leading-tight text-xl">{cls.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px]">{cls.teacher.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cls.teacher}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4 flex-1">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4 shrink-0" />
                  <span>{cls.schedule}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-2 h-4 w-4 shrink-0" />
                  <span>{cls.students} Enrolled Students</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Course Progress</span>
                    <span className="font-medium">{cls.progress}%</span>
                  </div>
                  <Progress value={cls.progress} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-0">
              <Button className="w-full" variant="default">
                <Video className="mr-2 h-4 w-4" />
                Join Live
              </Button>
              <Button className="w-full" variant="secondary">
                <FileText className="mr-2 h-4 w-4" />
                Materials
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
