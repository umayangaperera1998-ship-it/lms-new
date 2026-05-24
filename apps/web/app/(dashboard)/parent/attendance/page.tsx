'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  mockChildren, 
  mockAttendanceTrends 
} from '@/lib/mockParentData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function AttendancePage() {
  const [selectedChildId, setSelectedChildId] = useState(mockChildren[0].id);
  const selectedChild = mockChildren.find(c => c.id === selectedChildId) || mockChildren[0];

  // Generate a mock calendar for the current month
  const daysInMonth = 30;
  const mockCalendar = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    // Mock logic: Weekends absent/null, mostly present, few absent
    if (day % 7 === 0 || day % 7 === 6) return 'WEEKEND';
    if (day === 14 || day === 22) return 'ABSENT';
    return 'PRESENT';
  });

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Attendance Tracker</h1>
          <p className="text-muted-foreground mt-1">Monitor daily presence and monthly trends.</p>
        </div>
        
        <div className="flex items-center gap-3">
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
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Month</CardTitle>
                <CardDescription>Daily attendance record</CardDescription>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500" /> Present</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500" /> Absent</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-xs font-semibold text-slate-500 uppercase">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* Offset for first day (Mocking starts on Wed for example) */}
              <div className="aspect-square rounded-xl opacity-0" />
              <div className="aspect-square rounded-xl opacity-0" />
              
              {mockCalendar.map((status, i) => {
                const isWeekend = status === 'WEEKEND';
                const isPresent = status === 'PRESENT';
                const isAbsent = status === 'ABSENT';
                
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.01 }}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border border-slate-100 dark:border-slate-800 transition-colors
                      ${isWeekend ? 'bg-slate-50 dark:bg-slate-900 text-slate-400' : ''}
                      ${isPresent ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900' : ''}
                      ${isAbsent ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900' : ''}
                    `}
                  >
                    <span className="text-sm font-medium">{i + 1}</span>
                    {isPresent && <CheckCircle2 className="w-4 h-4 opacity-70" />}
                    {isAbsent && <XCircle className="w-4 h-4 opacity-70" />}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="bg-gradient-to-br from-indigo-500 text-white border-none shadow-lg shadow-indigo-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between pb-4">
                <p className="font-medium text-indigo-100">Total Attendance</p>
                <CalendarIcon className="h-5 w-5 text-indigo-100" />
              </div>
              <div className="text-4xl font-bold">{selectedChild.attendanceTotal}%</div>
              <p className="text-sm text-indigo-200 mt-2">Excellent! +2% from last month.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Absence Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3 items-start p-3 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 rounded-lg text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Mathematics - 14th May</p>
                    <p className="opacity-90 mt-0.5">Absent. Please ensure notes are collected.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-3 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 rounded-lg text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Science - 22nd May</p>
                    <p className="opacity-90 mt-0.5">Absent. Missed a practical session.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Trends</CardTitle>
          <CardDescription>Monthly comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAttendanceTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorChild" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey={selectedChild.name} 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorChild)" 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
