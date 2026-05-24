"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash, Clock, FileText, Settings, Play } from "lucide-react";

// Mock quizzes list
const quizzesList = [
  { id: 1, title: "Algebra Final Assessment", subject: "Math", questions: 25, duration: "45 mins", status: "Published" },
  { id: 2, title: "Kinematics Practice", subject: "Physics", questions: 15, duration: "30 mins", status: "Draft" },
  { id: 3, title: "Organic Chem Basics", subject: "Chemistry", questions: 20, duration: "40 mins", status: "Published" },
];

export default function TeacherQuizzesPage() {
  const [quizzes, setQuizzes] = useState(quizzesList);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizSubject, setNewQuizSubject] = useState("Math");
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("my-quizzes");

  const addQuestion = () => {
    setQuestions(prev => [...prev, { id: Date.now(), text: "", type: "mcq", options: ["", "", "", ""], answer: 0 }]);
  };

  const handleQuestionTextChange = (id: number, text: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, text } : q));
  };

  const handleOptionChange = (qId: number, oIdx: number, val: string) => {
    setQuestions(prev => prev.map(q => q.id === qId ? {
      ...q,
      options: q.options.map((opt: string, i: number) => i === oIdx ? val : opt)
    } : q));
  };

  const handleAnswerSelect = (qId: number, ansIdx: number) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, answer: ansIdx } : q));
  };

  const handleCreateQuiz = () => {
    if (!newQuizTitle.trim()) return;
    const newQuiz = {
      id: Date.now(),
      title: newQuizTitle,
      subject: newQuizSubject,
      questions: questions.length,
      duration: "45 mins",
      status: "Draft"
    };
    setQuizzes(prev => [...prev, newQuiz]);
    setNewQuizTitle("");
    setQuestions([]);
    setActiveTab("my-quizzes");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quiz Management</h1>
        <p className="text-muted-foreground mt-1">Design MCQ/Essay tests, view student submissions, and grade answers.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-quizzes">My Quizzes</TabsTrigger>
          <TabsTrigger value="create">Create Quiz</TabsTrigger>
          <TabsTrigger value="grading">Grading Panels</TabsTrigger>
        </TabsList>

        <TabsContent value="my-quizzes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="flex flex-col justify-between hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{quiz.subject}</Badge>
                    <Badge variant={quiz.status === "Published" ? "default" : "secondary"}>
                      {quiz.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      <span>{quiz.questions} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{quiz.duration} Limit</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 border-t pt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="default" className="flex-1">
                    <Play className="w-4 h-4 mr-1" /> Publish
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
              <CardDescription>Enter structural metadata and construct questions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quiz-title">Quiz Title</Label>
                  <Input 
                    id="quiz-title" 
                    placeholder="E.g. Algebra Basics Quiz" 
                    value={newQuizTitle}
                    onChange={(e) => setNewQuizTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiz-subject">Subject</Label>
                  <Select value={newQuizSubject} onValueChange={setNewQuizSubject}>
                    <SelectTrigger id="quiz-subject">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Math">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Questions Area */}
              <div className="pt-4 border-t space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Questions ({questions.length})</h3>
                  <Button onClick={addQuestion} variant="outline" size="sm" className="flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Add Question
                  </Button>
                </div>

                <div className="space-y-6">
                  {questions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-lg border relative bg-slate-50/50 dark:bg-slate-900/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">Question {idx + 1}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => setQuestions(prev => prev.filter(item => item.id !== q.id))}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>Question Statement</Label>
                        <Input 
                          placeholder="Type your question..." 
                          value={q.text}
                          onChange={(e) => handleQuestionTextChange(q.id, e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Options (Tick the correct answer)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {q.options.map((opt: string, optIdx: number) => (
                            <div key={optIdx} className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                name={`correct-${q.id}`} 
                                checked={q.answer === optIdx}
                                onChange={() => handleAnswerSelect(q.id, optIdx)}
                                className="h-4 w-4 text-primary focus:ring-primary"
                              />
                              <Input 
                                placeholder={`Option ${optIdx + 1}`} 
                                value={opt}
                                onChange={(e) => handleOptionChange(q.id, optIdx, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button onClick={handleCreateQuiz}>Save Quiz Draft</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="grading">
          <Card>
            <CardHeader>
              <CardTitle>Grading Submission Logs</CardTitle>
              <CardDescription>View all recent quiz completions and score details.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Quiz Name</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Earned Score</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Suresh Silva</TableCell>
                    <TableCell>Algebra Midterm</TableCell>
                    <TableCell>May 23, 2026</TableCell>
                    <TableCell className="font-semibold text-green-600">92%</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Review Answers</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Asha Perera</TableCell>
                    <TableCell>Thermodynamics MCQ</TableCell>
                    <TableCell>May 22, 2026</TableCell>
                    <TableCell className="font-semibold text-orange-600">65%</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Review Answers</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
