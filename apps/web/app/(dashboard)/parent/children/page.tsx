'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockChildren } from '@/lib/mockParentData';
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

export default function MyChildrenPage() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">My Children</h1>
        <p className="text-muted-foreground mt-1">Manage profiles and view quick summaries for each child.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {mockChildren.map((child) => (
          <motion.div key={child.id} variants={itemVariants}>
            <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-slate-200/60 dark:border-slate-800/60 overflow-hidden group">
              <div className="h-24 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10" />
              
              <CardHeader className="relative pb-0">
                <div className="absolute -top-12 left-6">
                  <div className="w-20 h-20 bg-white dark:bg-slate-950 rounded-2xl p-1 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="w-full h-full bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-4xl">
                      {child.avatar}
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{child.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      {child.grade}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                    Active
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="mt-6 flex-1 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4" /> Attendance
                      </span>
                      <span className="font-medium">{child.attendanceTotal}%</span>
                    </div>
                    <Progress value={child.attendanceTotal} className="h-1.5" indicatorColor="bg-emerald-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <TrendingUp className="w-4 h-4" /> Average Score
                      </span>
                      <span className="font-medium">{child.averageScore}%</span>
                    </div>
                    <Progress value={child.averageScore} className="h-1.5" indicatorColor="bg-blue-500" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <BookOpen className="w-4 h-4" /> Upcoming Classes
                    </span>
                    <Badge variant="outline">{child.upcomingClasses} this week</Badge>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 bg-slate-50/50 dark:bg-slate-900/20">
                <Button variant="outline" className="w-full text-xs" asChild>
                  <Link href={`/parent/progress?child=${child.id}`}>
                    <TrendingUp className="w-3.5 h-3.5 mr-2" />
                    Progress
                  </Link>
                </Button>
                <Button variant="default" className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                  <Link href={`/parent/messages?child=${child.id}`}>
                    <MessageSquare className="w-3.5 h-3.5 mr-2" />
                    Teachers
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
