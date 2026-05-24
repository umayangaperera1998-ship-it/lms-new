"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Filter, ArrowUpDown } from "lucide-react";

const studentsList = [
  { id: "ST01", name: "Suresh Silva", email: "suresh.silva@gmail.com", class: "Advanced Mathematics", attendance: "95%", avgScore: "88%" },
  { id: "ST02", name: "Asha Perera", email: "asha.perera@yahoo.com", class: "Physics Theory AL", attendance: "92%", avgScore: "78%" },
  { id: "ST03", name: "Ruwan Fernando", email: "ruwanf@gmail.com", class: "Chemistry Revision", attendance: "80%", avgScore: "62%" },
  { id: "ST04", name: "Minoli Cooray", email: "minolic@gmail.com", class: "Advanced Mathematics", attendance: "98%", avgScore: "95%" },
  { id: "ST05", name: "Dinesh Jayasundara", email: "dineshj@gmail.com", class: "Physics Theory AL", attendance: "88%", avgScore: "70%" },
];

export default function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStudents = studentsList.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetail = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Directory</h1>
        <p className="text-muted-foreground mt-1">Monitor registrations, class performance metrics, and attendance.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8 bg-white dark:bg-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" /> Filter Classes
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <ArrowUpDown className="h-4 w-4" /> Sort Score
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Registered Class</TableHead>
                <TableHead>Attendance Rate</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-semibold">{student.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <Badge variant={parseInt(student.attendance) >= 90 ? "success" : "warning"}>
                      {student.attendance}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{student.avgScore}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleOpenDetail(student)}>
                      <Eye className="w-4 h-4 mr-1" /> Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student Details Dialog */}
      {selectedStudent && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedStudent.name}</DialogTitle>
              <DialogDescription>Student ID: {selectedStudent.id}</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Email</p>
                  <p className="font-medium mt-1">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Class</p>
                  <p className="font-medium mt-1">{selectedStudent.class}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Attendance Rate</p>
                  <p className="font-bold text-lg text-green-600 mt-1">{selectedStudent.attendance}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Average quiz score</p>
                  <p className="font-bold text-lg text-blue-600 mt-1">{selectedStudent.avgScore}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-semibold uppercase">Recent Quiz Attempts</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded">
                    <span>Algebra Midterm</span>
                    <span className="font-semibold text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded">
                    <span>Thermodynamics MCQ</span>
                    <span className="font-semibold text-orange-600">65%</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
