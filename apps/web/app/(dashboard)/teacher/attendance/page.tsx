"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, AlertTriangle, QrCode, Save, ArrowRight } from "lucide-react";

const initialStudents = [
  { id: "ST01", name: "Suresh Silva", status: "Present" },
  { id: "ST02", name: "Asha Perera", status: "Present" },
  { id: "ST03", name: "Ruwan Fernando", status: "Absent" },
  { id: "ST04", name: "Minoli Cooray", status: "Present" },
  { id: "ST05", name: "Dinesh Jayasundara", status: "Late" },
];

export default function TeacherAttendancePage() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedClass, setSelectedClass] = useState("math");
  const [isSaved, setIsSaved] = useState(false);

  const handleStatusChange = (studentId: string, newStatus: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status: newStatus } : student
    ));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
        <p className="text-muted-foreground mt-1">Mark daily check-ins or generate QR codes for self check-in.</p>
      </div>

      <Tabs defaultValue="manual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="manual">Manual Registry</TabsTrigger>
          <TabsTrigger value="qrcode">QR Code Self Check-in</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
              <div className="space-y-1">
                <CardTitle>Session Registry</CardTitle>
                <CardDescription>Select class and date to log today's attendance.</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Advanced Math</SelectItem>
                    <SelectItem value="physics">Physics Theory</SelectItem>
                    <SelectItem value="chemistry">Chemistry Revision</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSave} className="flex items-center gap-1">
                  <Save className="h-4 w-4" /> Save Attendance
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-semibold">{student.id}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        {student.status === "Present" && <Badge variant="success">Present</Badge>}
                        {student.status === "Absent" && <Badge variant="destructive">Absent</Badge>}
                        {student.status === "Late" && <Badge variant="warning">Late</Badge>}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            size="icon" 
                            variant={student.status === "Present" ? "default" : "outline"}
                            className="h-8 w-8"
                            onClick={() => handleStatusChange(student.id, "Present")}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant={student.status === "Late" ? "default" : "outline"}
                            className="h-8 w-8 bg-amber-500 hover:bg-amber-600 text-white"
                            onClick={() => handleStatusChange(student.id, "Late")}
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant={student.status === "Absent" ? "default" : "outline"}
                            className="h-8 w-8 bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => handleStatusChange(student.id, "Absent")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            {isSaved && (
              <CardFooter className="justify-center border-t py-2 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 text-sm font-medium">
                Attendance logged successfully!
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="qrcode">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>QR Generator</CardTitle>
                <CardDescription>Generate a dynamically expiring check-in QR code for classroom projector screens.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="border-8 border-gray-100 p-4 bg-white rounded-lg shadow-inner mb-4">
                  {/* Mock QR Code Icon */}
                  <QrCode className="w-48 h-48 text-gray-800" />
                </div>
                <Badge variant="outline" className="animate-pulse">Expires in 45s</Badge>
              </CardContent>
              <CardFooter>
                <Button className="w-full flex items-center justify-center gap-1">
                  Regenerate QR Code <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How it works</CardTitle>
                <CardDescription>Follow these steps to setup student self check-ins.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">1</span>
                  <p className="pt-0.5 text-gray-700 dark:text-gray-300">Project this screen onto your classroom board or share it on Zoom.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">2</span>
                  <p className="pt-0.5 text-gray-700 dark:text-gray-300">Students open the mobile web application on their phone and select 'Scan QR'.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">3</span>
                  <p className="pt-0.5 text-gray-700 dark:text-gray-300">The attendance is immediately registered on your teacher dashboard live database.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
