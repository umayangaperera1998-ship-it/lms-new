"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ThreeBackground from '@/components/shared/three-background';
import { BookOpen, Users, Building2, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden selection:bg-indigo-500/30">
      {/* 3D Background */}
      <ThreeBackground />

      {/* Decorative top gradient glow */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent pointer-events-none z-[2]" />

      {/* Radial glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-[2]" />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 min-h-screen">

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-2 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.1)]"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            LMS Platform v2.0 is live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight"
          >
            Enterprise Multi-Tenant <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learning Management System
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Built specifically for Sri Lankan Tuition Classes. Experience the next generation of education technology with seamless class management, interactive quizzes, and powerful analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button asChild size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.8)] transition-all duration-300">
              <Link href="/login">
                Access Portal <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-bold bg-white/5 hover:bg-white/80 border-slate-700/50 hover:border-slate-500 text-slate-200 backdrop-blur-md transition-all duration-300">
              <Link href="/signup">Create Account</Link>
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-32 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <FeatureCard
            icon={<BookOpen className="w-7 h-7 text-indigo-400" />}
            title="For Students"
            description="Access your enrolled classes, submit quizzes, and track your attendance and progress seamlessly."
            delay={0.6}
            gradient="from-indigo-500/10 to-transparent"
          />
          <FeatureCard
            icon={<Users className="w-7 h-7 text-purple-400" />}
            title="For Teachers"
            description="Manage your class schedules, upload learning materials, monitor student analytics, and track your earnings."
            delay={0.7}
            gradient="from-purple-500/10 to-transparent"
          />
          <FeatureCard
            icon={<Building2 className="w-7 h-7 text-pink-400" />}
            title="For Staff"
            description="Monitor your class schedules, upload learning materials, track student analytics, and manage your earnings."
            delay={0.8}
            gradient="from-pink-500/10 to-transparent"
          />
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 bg-slate-900/50 backdrop-blur-lg py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} LMS Platform. Built for the Future of Education.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay, gradient }: { icon: React.ReactNode; title: string; description: string; delay: number; gradient: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 hover:border-slate-600 transition-all duration-500 overflow-hidden text-left"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-950/50 flex items-center justify-center mb-6 shadow-inner border border-slate-800 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-100 mb-3 tracking-tight">{title}</h3>
        <p className="text-slate-400 leading-relaxed font-light">{description}</p>
      </div>
    </motion.div>
  );
}
