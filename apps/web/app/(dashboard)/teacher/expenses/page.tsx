"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  TrendingDown, TrendingUp, DollarSign, Lock, AlertCircle, Grid, Building2, 
  Users, Gift, Megaphone, BookOpen, Zap, Car, Coffee, Wrench, Laptop, Phone, 
  MoreHorizontal, Plus, Download, Printer, Search, CheckCircle, Clock, Calendar, 
  Mail, ChevronDown, ChevronUp, FileText, Activity, CircleDollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

// Mock Data
const mockExpensesData = {
  thisMonth: {
    total: 89500,
    lastMonth: 79800,
    percentageChange: 12.1,
    ytdTotal: 892450,
    averageMonthly: 74371,
  },
  
  quickStats: {
    fixedExpenses: 65000,
    variableExpenses: 24500,
    largestExpense: {
      category: "Hall Rent",
      amount: 45000,
    },
    totalCategories: 12,
    activeCategories: 10,
  },
  
  categories: [
    {
      id: 1,
      name: "Hall Rent",
      icon: "Building2",
      type: "Fixed",
      color: "#3B82F6",
      thisMonth: 45000,
      totalAllTime: 540000,
      transactionCount: 12,
      trend: 0,
      lastSixMonths: [45000, 45000, 45000, 45000, 45000, 45000],
    },
    {
      id: 2,
      name: "Staff Salaries",
      icon: "Users",
      type: "Fixed",
      color: "#8B5CF6",
      thisMonth: 15000,
      totalAllTime: 180000,
      transactionCount: 24,
      trend: 5.2,
      lastSixMonths: [14000, 14000, 15000, 15000, 14500, 15000],
    },
    {
      id: 3,
      name: "Marketing",
      icon: "Megaphone",
      type: "Variable",
      color: "#EF4444",
      thisMonth: 8500,
      totalAllTime: 95000,
      transactionCount: 45,
      trend: 45.3,
      lastSixMonths: [5000, 6000, 5500, 7000, 6500, 8500],
    },
    {
      id: 4,
      name: "Materials",
      icon: "BookOpen",
      type: "Variable",
      color: "#10B981",
      thisMonth: 12000,
      totalAllTime: 110000,
      transactionCount: 30,
      trend: -10.5,
      lastSixMonths: [10000, 12000, 15000, 13000, 14000, 12000],
    },
    {
      id: 5,
      name: "Utilities",
      icon: "Zap",
      type: "Fixed",
      color: "#F59E0B",
      thisMonth: 5000,
      totalAllTime: 60000,
      transactionCount: 12,
      trend: 2.1,
      lastSixMonths: [4800, 4900, 5000, 5100, 4900, 5000],
    },
    {
      id: 6,
      name: "Transportation",
      icon: "Car",
      type: "Variable",
      color: "#6366F1",
      thisMonth: 4000,
      totalAllTime: 35000,
      transactionCount: 20,
      trend: 15.0,
      lastSixMonths: [2500, 3000, 2800, 3500, 3800, 4000],
    }
  ],
  
  expenses: [
    {
      id: "EXP001",
      date: "2026-05-20",
      category: "Hall Rent",
      categoryIcon: "Building2",
      description: "Monthly hall rent - June 2026",
      amount: 45000,
      paymentMethod: "Bank Transfer",
      allocatedClasses: ["Advanced Mathematics O/L", "Physics A/L"],
      receipt: "rent-may-2026.pdf",
    },
    {
      id: "EXP002",
      date: "2026-05-18",
      category: "Marketing",
      categoryIcon: "Megaphone",
      description: "Facebook ads campaign - May batch",
      amount: 8500,
      paymentMethod: "Card",
      allocatedClasses: ["All Classes"],
      receipt: null,
    },
    {
      id: "EXP003",
      date: "2026-05-15",
      category: "Staff Salaries",
      categoryIcon: "Users",
      description: "Assistant Salary - May",
      amount: 15000,
      paymentMethod: "Bank Transfer",
      allocatedClasses: ["All Classes"],
      receipt: "salary-slip.pdf",
    },
    {
      id: "EXP004",
      date: "2026-05-10",
      category: "Materials",
      categoryIcon: "BookOpen",
      description: "Printed notes for Grade 12",
      amount: 12000,
      paymentMethod: "Cash",
      allocatedClasses: ["Pure Mathematics A/L"],
      receipt: "print-invoice.jpg",
    },
    {
      id: "EXP005",
      date: "2026-05-05",
      category: "Utilities",
      categoryIcon: "Zap",
      description: "Electricity & Internet",
      amount: 5000,
      paymentMethod: "Card",
      allocatedClasses: ["All Classes"],
      receipt: "utility-bill.pdf",
    },
    {
      id: "EXP006",
      date: "2026-05-02",
      category: "Transportation",
      categoryIcon: "Car",
      description: "Fuel for class visits",
      amount: 4000,
      paymentMethod: "Cash",
      allocatedClasses: ["Not Allocated"],
      receipt: null,
    }
  ],
  
  monthlyExpenses: [
    { month: "Jan 2026", amount: 72000, fixed: 60000, variable: 12000 },
    { month: "Feb 2026", amount: 68000, fixed: 60000, variable: 8000 },
    { month: "Mar 2026", amount: 75000, fixed: 60000, variable: 15000 },
    { month: "Apr 2026", amount: 79800, fixed: 65000, variable: 14800 },
    { month: "May 2026", amount: 89500, fixed: 65000, variable: 24500 },
  ],
  
  classWiseExpenses: [
    {
      classId: 1,
      className: "Advanced Mathematics O/L 2026",
      subject: "Mathematics",
      grade: "Grade 11",
      totalExpenses: 32500,
      breakdown: { hallRent: 15000, materials: 8500, marketing: 5000, other: 4000 },
      earnings: 96000,
      profitMargin: 66.1,
      costPerStudent: 271,
    },
    {
      classId: 2,
      className: "Pure Mathematics A/L 2027",
      subject: "Mathematics",
      grade: "Grade 12",
      totalExpenses: 45000,
      breakdown: { hallRent: 20000, materials: 15000, marketing: 6000, other: 4000 },
      earnings: 120000,
      profitMargin: 62.5,
      costPerStudent: 529,
    }
  ],

  profitLoss: {
    earnings: 145000,
    expenses: 89500,
    netProfit: 55500,
    margin: 38.3
  }
};

const COLORS = ["#3B82F6", "#8B5CF6", "#EF4444", "#10B981", "#F59E0B", "#6366F1"];

const formatLKR = (amount: number) => {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper for dynamic icons
const getIcon = (name: string) => {
  switch(name) {
    case "Building2": return <Building2 className="w-5 h-5" />;
    case "Users": return <Users className="w-5 h-5" />;
    case "Megaphone": return <Megaphone className="w-5 h-5" />;
    case "BookOpen": return <BookOpen className="w-5 h-5" />;
    case "Zap": return <Zap className="w-5 h-5" />;
    case "Car": return <Car className="w-5 h-5" />;
    default: return <MoreHorizontal className="w-5 h-5" />;
  }
};

export default function TeacherExpensesPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredExpenses = useMemo(() => {
    return mockExpensesData.expenses.filter(e => {
      const matchSearch = e.description.toLowerCase().includes(searchTerm.toLowerCase()) || e.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === "all" || e.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, categoryFilter]);

  if (!isMounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Clock className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 print:bg-white print:p-0">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-red-600 text-white px-5 py-3 rounded-lg shadow-xl font-medium"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 print:hidden">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 via-orange-600 to-rose-600 bg-clip-text text-transparent dark:from-red-400 dark:to-orange-400">
            Expenses Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Track business-related costs, hall rents, and marketing budgets.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={() => triggerToast("Generating report...")} variant="outline" className="bg-background/50 backdrop-blur shadow-sm border">
            <Download className="w-4 h-4 mr-2 text-primary" />
            Export
          </Button>
          <Button onClick={() => triggerToast("Add expense dialog opened!")} className="bg-red-600 hover:bg-red-700 text-white shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* 1. TOP SUMMARY CARD (HERO SECTION) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-2 relative overflow-hidden border bg-gradient-to-br from-red-900 via-rose-950 to-orange-950 text-white shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent pointer-events-none" />
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-red-200 font-semibold text-sm uppercase tracking-wider">This Month's Expenses</span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <CardTitle className="text-4xl lg:text-5xl font-black mt-2 tracking-tight">
              {formatLKR(mockExpensesData.thisMonth.total)}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-2 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-red-200">
              <div className="flex items-center px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 font-semibold text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                {mockExpensesData.thisMonth.percentageChange}% from last month
              </div>
              <div className="flex items-center gap-4">
                <span>YTD: <strong>{formatLKR(mockExpensesData.thisMonth.ytdTotal)}</strong></span>
                <span className="hidden sm:inline text-red-400">|</span>
                <span>Avg: <strong>{formatLKR(mockExpensesData.thisMonth.averageMonthly)}</strong>/mo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:col-span-2 gap-4">
          <Card className="shadow-sm border bg-background/40 backdrop-blur">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">Fixed Expenses</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatLKR(mockExpensesData.quickStats.fixedExpenses)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border bg-background/40 backdrop-blur">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">Variable Expenses</p>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{formatLKR(mockExpensesData.quickStats.variableExpenses)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border bg-background/40 backdrop-blur">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">Largest Expense</p>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{mockExpensesData.quickStats.largestExpense.category}</p>
                <p className="text-[10px] text-red-500 font-semibold">{formatLKR(mockExpensesData.quickStats.largestExpense.amount)}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border bg-background/40 backdrop-blur">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">Categories</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{mockExpensesData.quickStats.activeCategories} Active</p>
                <p className="text-[10px] text-muted-foreground font-medium">Out of {mockExpensesData.quickStats.totalCategories} total</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Grid className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 2. CHARTS SECTION (Monthly breakdown & P&L) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border bg-background/40 backdrop-blur">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Monthly Expenses</CardTitle>
              <CardDescription>Bar chart indicating historical spending.</CardDescription>
            </div>
            <Badge variant="outline">Last 5 Months</Badge>
          </CardHeader>
          <CardContent className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockExpensesData.monthlyExpenses} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis tickLine={false} tickFormatter={(val) => `LKR ${val / 1000}k`} tick={{ fontSize: 10 }} />
                <RechartsTooltip formatter={(value) => [formatLKR(Number(value)), "Expense"]} cursor={{fill: 'transparent'}} />
                <Bar dataKey="amount" fill="#EF4444" radius={[4, 4, 0, 0]}>
                  {mockExpensesData.monthlyExpenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.amount > 75000 ? "#EF4444" : "#F59E0B"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* P&L Summary Card */}
        <Card className="shadow-sm border bg-background/40 backdrop-blur flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-emerald-500" />
              Profit & Loss
            </CardTitle>
            <CardDescription>This Month's Summary</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-slate-600 dark:text-slate-400">Earnings</span>
              <span className="font-bold text-emerald-600">{formatLKR(mockExpensesData.profitLoss.earnings)}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b pb-4">
              <span className="font-medium text-slate-600 dark:text-slate-400">Expenses</span>
              <span className="font-bold text-red-600">-{formatLKR(mockExpensesData.profitLoss.expenses)}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
              <span className="font-bold text-slate-800 dark:text-slate-200">Net Profit</span>
              <span className="font-black text-xl text-emerald-600 dark:text-emerald-400">
                {formatLKR(mockExpensesData.profitLoss.netProfit)}
              </span>
            </div>
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Profit Margin</span>
                <span className="font-bold text-emerald-600">{mockExpensesData.profitLoss.margin}%</span>
              </div>
              <Progress value={mockExpensesData.profitLoss.margin} className="h-2 bg-slate-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. CATEGORIES GRID */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Expenses by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockExpensesData.categories.map((cat, i) => (
            <Card key={cat.id} className="shadow-sm border hover:shadow-md transition bg-background/40">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: cat.color }}>
                      {getIcon(cat.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{cat.name}</h3>
                      <Badge variant="secondary" className="text-[9px] py-0 px-1 mt-0.5">{cat.type}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600 text-sm">{formatLKR(cat.thisMonth)}</p>
                    <p className="text-[10px] text-muted-foreground">{cat.transactionCount} txns</p>
                  </div>
                </div>
                
                {/* Mini chart */}
                <div className="h-[40px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cat.lastSixMonths.map((v, i) => ({ val: v, i }))}>
                      <Line type="monotone" dataKey="val" stroke={cat.color} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. EXPENSES TABLE WITH FILTERS */}
      <Card className="shadow-sm border bg-background/60 backdrop-blur">
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold">Transaction Registry</CardTitle>
              <CardDescription>Detailed log of all recorded expenses.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background/50 h-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockExpensesData.categories.map(c => (
                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-muted-foreground uppercase border-b">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Allocated To</th>
                  <th className="px-4 py-3 text-center">Receipt</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredExpenses.length > 0 ? filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition">
                    <td className="px-4 py-3 font-medium text-slate-600">{exp.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="text-muted-foreground">{getIcon(exp.categoryIcon)}</div>
                        <span className="font-semibold">{exp.category}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{exp.description}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {exp.allocatedClasses.map((cls, idx) => (
                          <Badge key={idx} variant="outline" className="text-[10px] bg-slate-50">{cls}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {exp.receipt ? (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700">
                          <FileText className="w-4 h-4" />
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-red-600">{formatLKR(exp.amount)}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No expenses found matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* 5. CLASS-WISE EXPENSES SECTION */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Class Profitability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockExpensesData.classWiseExpenses.map((cls) => (
            <Card key={cls.classId} className="shadow-sm border bg-background/40 backdrop-blur">
              <CardHeader className="pb-3 border-b bg-slate-50/50 dark:bg-slate-900/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">{cls.className}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">{cls.subject}</Badge>
                      <Badge variant="outline" className="text-[10px]">{cls.grade}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Margin</p>
                    <p className="text-xl font-black text-emerald-600">{cls.profitMargin}%</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Class Earnings</p>
                    <p className="font-bold text-emerald-700 dark:text-emerald-400">{formatLKR(cls.earnings)}</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-100 dark:border-red-900">
                    <p className="text-[10px] font-bold text-red-600 uppercase mb-1">Allocated Costs</p>
                    <p className="font-bold text-red-700 dark:text-red-400">{formatLKR(cls.totalExpenses)}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Expense Breakdown</p>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500" style={{ width: `${(cls.breakdown.hallRent / cls.totalExpenses) * 100}%` }} title="Hall Rent" />
                    <div className="bg-green-500" style={{ width: `${(cls.breakdown.materials / cls.totalExpenses) * 100}%` }} title="Materials" />
                    <div className="bg-red-500" style={{ width: `${(cls.breakdown.marketing / cls.totalExpenses) * 100}%` }} title="Marketing" />
                    <div className="bg-purple-500" style={{ width: `${(cls.breakdown.other / cls.totalExpenses) * 100}%` }} title="Other" />
                  </div>
                  <div className="flex gap-3 text-[9px] text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /> Rent</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Materials</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Marketing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
    </div>
  );
}
