"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, HelpCircle, AlertCircle, CheckCircle2 } from "lucide-react";

const availableQuizzes = [
  { id: 1, title: "Algebra Final Assessment", subject: "Mathematics", questions: 25, duration: "45 mins", due: "Tomorrow, 11:59 PM", type: "Mandatory" },
  { id: 2, title: "Kinematics Practice", subject: "Physics", questions: 15, duration: "30 mins", due: "Next Week", type: "Practice" },
  { id: 3, title: "Organic Chem Basics", subject: "Chemistry", questions: 20, duration: "40 mins", due: "Next Week", type: "Mandatory" },
];

const completedQuizzes = [
  { id: 101, title: "Calculus Midterm", subject: "Mathematics", date: "May 10, 2026", score: 85, total: 100, status: "Passed" },
  { id: 102, title: "Thermodynamics Quiz", subject: "Physics", date: "May 05, 2026", score: 60, total: 100, status: "Failed" },
  { id: 103, title: "Atomic Structure", subject: "Chemistry", date: "Apr 28, 2026", score: 95, total: 100, status: "Passed" },
];

export default function StudentQuizzesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quizzes & Assessments</h1>
        <p className="text-muted-foreground mt-1">Take pending quizzes and review your past scores.</p>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Quizzes</TabsTrigger>
          <TabsTrigger value="completed">Completed & Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableQuizzes.map((quiz) => (
              <Card key={quiz.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{quiz.subject}</Badge>
                    {quiz.type === 'Mandatory' ? (
                      <Badge variant="destructive" className="flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Mandatory</Badge>
                    ) : (
                      <Badge variant="secondary">Practice</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 flex-1">
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>{quiz.questions} Questions</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{quiz.duration}</span>
                    </div>
                    <div className="mt-4 p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-xs font-medium text-center">
                      Due: {quiz.due}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Attempt Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>My Quiz Attempts</CardTitle>
              <CardDescription>Review your scores and performance history.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date Attempted</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedQuizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">{quiz.title}</TableCell>
                      <TableCell>{quiz.subject}</TableCell>
                      <TableCell>{quiz.date}</TableCell>
                      <TableCell>
                        <span className="font-bold">{quiz.score}</span> / {quiz.total}
                      </TableCell>
                      <TableCell>
                        {quiz.status === "Passed" ? (
                          <Badge variant="success" className="flex w-fit items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Passed
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="flex w-fit items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Failed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Review Answers</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
