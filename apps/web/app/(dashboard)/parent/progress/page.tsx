'use client';

import { useState } from 'react';
import {
  TrendingUp,
  Award,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  mockChildren, 
  mockSubjectProgress 
} from '@/lib/mockParentData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export default function ProgressPage() {
  const [selectedChildId, setSelectedChildId] = useState(mockChildren[0].id);
  const selectedChild = mockChildren.find(c => c.id === selectedChildId) || mockChildren[0];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Academic Progress</h1>
          <p className="text-muted-foreground mt-1">Detailed performance analytics and teacher feedback.</p>
        </div>
        
        <Select value={selectedChildId} onValueChange={setSelectedChildId}>
          <SelectTrigger className="w-[200px] bg-white dark:bg-slate-950">
            <SelectValue placeholder="Select a child" />
          </SelectTrigger>
          <SelectContent>
            {mockChildren.map((child) => (
              <SelectItem key={child.id} value={child.id}>
                {child.avatar} {child.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Class Rank</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">Top 5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Improvement</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">+4.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Best Subject</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">Science</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Comparison Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Comparison with class average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSubjectProgress} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="score" name="Student Score" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="classAverage" name="Class Average" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Radar</CardTitle>
            <CardDescription>Multi-dimensional analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockSubjectProgress}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px' }} />
                  <Radar name="Student Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                  <Radar name="Class Average" dataKey="classAverage" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teacher Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-500" /> 
            Recent Teacher Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">Mrs. Fernando (Science)</h4>
                <p className="text-xs text-muted-foreground">Term 2 Mid-Evaluation</p>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Excellent</Badge>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              "{selectedChild.name.split(' ')[0]} has shown remarkable improvement in practical physics experiments. Continues to be a proactive participant in class discussions. Keep up the good work!"
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">Mr. Silva (Mathematics)</h4>
                <p className="text-xs text-muted-foreground">Algebra Quiz Feedback</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Good</Badge>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              "Good understanding of core concepts. Needs a bit more practice on quadratic equations to increase speed during timed quizzes. Overall solid performance."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
