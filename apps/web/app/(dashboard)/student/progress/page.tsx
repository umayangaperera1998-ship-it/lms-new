"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const gpaData = [
  { name: 'Month 1', gpa: 3.2 },
  { name: 'Month 2', gpa: 3.4 },
  { name: 'Month 3', gpa: 3.3 },
  { name: 'Month 4', gpa: 3.6 },
  { name: 'Month 5', gpa: 3.8 },
];

const subjectData = [
  { subject: 'Math', score: 85, fullMark: 100 },
  { subject: 'Physics', score: 65, fullMark: 100 },
  { subject: 'Chemistry', score: 90, fullMark: 100 },
  { subject: 'ICT', score: 75, fullMark: 100 },
  { subject: 'English', score: 88, fullMark: 100 },
];

export default function StudentProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Academic Progress</h1>
        <p className="text-muted-foreground mt-1">Track your overall performance and subject-wise growth.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">Overall GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">3.8</div>
            <p className="text-xs text-primary-foreground/70 mt-1">Excellent standing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Strongest Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Chemistry</div>
            <p className="text-xs text-muted-foreground mt-1">90% Average Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Area for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">Physics</div>
            <p className="text-xs text-muted-foreground mt-1">65% Average Score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>GPA Growth Trend</CardTitle>
            <CardDescription>Your performance over the last 5 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gpaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 4.0]} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area type="monotone" dataKey="gpa" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGpa)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Radar chart showing strengths and weaknesses.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Subject Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {subjectData.map((sub, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{sub.subject}</span>
                <span>{sub.score}%</span>
              </div>
              <Progress 
                value={sub.score} 
                className={`h-2 ${sub.score < 70 ? '[&>div]:bg-orange-500' : sub.score >= 85 ? '[&>div]:bg-green-500' : ''}`} 
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
