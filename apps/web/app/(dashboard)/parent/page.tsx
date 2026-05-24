'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar,
  CreditCard,
  Clock,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  mockChildren, 
  mockUpcomingClasses, 
  mockRecentActivities, 
  mockPayments 
} from '@/lib/mockParentData';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ParentDashboard() {
  const [selectedChildId, setSelectedChildId] = useState(mockChildren[0].id);

  const selectedChild = mockChildren.find(c => c.id === selectedChildId) || mockChildren[0];
  const pendingPayments = mockPayments.filter(p => p.status === 'PENDING' && p.child === selectedChild.name);
  const childActivities = mockRecentActivities.filter(a => a.childId === selectedChild.id);
  const childClasses = mockUpcomingClasses.filter(c => c.childId === selectedChild.id);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header & Context Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Parent Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your children's academic journey.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-2 rounded-xl border shadow-sm">
          <span className="text-sm font-medium text-muted-foreground pl-2">Viewing:</span>
          <Select value={selectedChildId} onValueChange={setSelectedChildId}>
            <SelectTrigger className="w-[200px] border-none bg-transparent focus:ring-0 focus:ring-offset-0 font-semibold text-indigo-600 dark:text-indigo-400">
              <SelectValue placeholder="Select a child" />
            </SelectTrigger>
            <SelectContent>
              {mockChildren.map((child) => (
                <SelectItem key={child.id} value={child.id} className="font-medium">
                  {child.avatar} {child.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Attendance</p>
                  <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{selectedChild.attendanceTotal}%</div>
                    <p className="text-xs text-muted-foreground mt-1">Overall present rate</p>
                  </div>
                  <Progress value={selectedChild.attendanceTotal} className="w-16 h-2" indicatorColor={selectedChild.attendanceTotal > 90 ? "bg-green-500" : "bg-yellow-500"} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Average Score</p>
                  <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{selectedChild.averageScore}%</div>
                    <p className="text-xs text-muted-foreground mt-1">Across all subjects</p>
                  </div>
                  <Progress value={selectedChild.averageScore} className="w-16 h-2" indicatorColor="bg-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Pending Fees</p>
                  <CreditCard className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    LKR {pendingPayments.reduce((acc, p) => acc + p.amount, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mt-1">
                    {pendingPayments.length} unpaid invoice(s)
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Upcoming Classes</p>
                  <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{selectedChild.upcomingClasses}</div>
                  <p className="text-xs text-muted-foreground mt-1">Scheduled for this week</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Widgets Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Classes */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Upcoming Classes</CardTitle>
                  <CardDescription>Next 7 days schedule</CardDescription>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/parent/children"><ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4 mt-2">
                  {childClasses.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground text-sm border border-dashed rounded-lg">
                      No upcoming classes found.
                    </div>
                  ) : (
                    childClasses.map((cls) => (
                      <div key={cls.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                          <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{cls.subject}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {cls.time}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">By {cls.teacher}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Recent Activities</CardTitle>
                  <CardDescription>Academic & administrative events</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4 mt-2 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
                  {childActivities.length === 0 ? (
                     <div className="text-center p-4 text-muted-foreground text-sm border border-dashed rounded-lg relative z-10 bg-white dark:bg-slate-950">
                     No recent activities.
                   </div>
                  ) : (
                    childActivities.map((act) => (
                      <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          {act.type === 'QUIZ' && <TrendingUp className="w-4 h-4 text-blue-500" />}
                          {act.type === 'ATTENDANCE' && <Calendar className="w-4 h-4 text-emerald-500" />}
                          {act.type === 'PAYMENT' && <CreditCard className="w-4 h-4 text-orange-500" />}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm">{act.title}</h4>
                            <span className="text-xs text-muted-foreground">{act.date}</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{act.desc}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
