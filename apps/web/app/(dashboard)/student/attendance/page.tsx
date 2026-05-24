"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const attendanceHistory = [
  { id: 1, date: "2026-05-24", class: "Advanced Mathematics", status: "Present", checkIn: "09:45 AM" },
  { id: 2, date: "2026-05-22", class: "Physics Theory", status: "Present", checkIn: "01:50 PM" },
  { id: 3, date: "2026-05-20", class: "Chemistry Revision", status: "Absent", checkIn: "-" },
  { id: 4, date: "2026-05-18", class: "Advanced Mathematics", status: "Late", checkIn: "10:15 AM" },
  { id: 5, date: "2026-05-15", class: "ICT Practical", status: "Present", checkIn: "03:55 PM" },
];

export default function StudentAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground mt-1">Track your class attendance and check-in history.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">88%</div>
            <p className="text-xs text-muted-foreground mt-1">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Classes Attended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">out of 48 total classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Absences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">6</div>
            <p className="text-xs text-muted-foreground mt-1">2 excused, 4 unexcused</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="space-y-1">
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Recent check-ins across all your classes.</CardDescription>
          </div>
          <div className="w-[180px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Check In Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.class}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>
                    {record.status === 'Present' && (
                      <Badge variant="success" className="flex w-fit items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Present
                      </Badge>
                    )}
                    {record.status === 'Absent' && (
                      <Badge variant="destructive" className="flex w-fit items-center gap-1">
                        <XCircle className="h-3 w-3" /> Absent
                      </Badge>
                    )}
                    {record.status === 'Late' && (
                      <Badge variant="warning" className="flex w-fit items-center gap-1">
                        <Clock className="h-3 w-3" /> Late
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
