"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  BookOpen,
  AlertCircle,
  Users,
  Download,
  Printer,
  Mail,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Plus,
  ChevronDown,
  ChevronUp,
  Send,
  MoreVertical,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to format currency in LKR
const formatLKR = (amount: number) => {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Initial Mock Data
const initialEarningsData = {
  totalEarnings: 2450000, // LKR lifetime
  thisMonth: 145000,
  lastMonth: 134000,
  percentageChange: 8.2,
  activeClassesCount: 6,
  totalStudentsCount: 320,
  pendingAmount: 28000,
  pendingStudentsCount: 8,
  averagePerStudent: 4531,

  monthlyBreakdown: [
    { month: "Jun 2025", amount: 110000, classes: 4, students: 250, status: "Paid" },
    { month: "Jul 2025", amount: 115000, classes: 4, students: 260, status: "Paid" },
    { month: "Aug 2025", amount: 120000, classes: 5, students: 275, status: "Paid" },
    { month: "Sep 2025", amount: 118000, classes: 5, students: 270, status: "Paid" },
    { month: "Oct 2025", amount: 125000, classes: 5, students: 280, status: "Paid" },
    { month: "Nov 2025", amount: 130000, classes: 5, students: 290, status: "Paid" },
    { month: "Dec 2025", amount: 128000, classes: 5, students: 285, status: "Paid" },
    { month: "Jan 2026", amount: 135000, classes: 6, students: 300, status: "Paid" },
    { month: "Feb 2026", amount: 138000, classes: 6, students: 305, status: "Paid" },
    { month: "Mar 2026", amount: 142000, classes: 6, students: 310, status: "Paid" },
    { month: "Apr 2026", amount: 134000, classes: 6, students: 300, status: "Paid" },
    { month: "May 2026", amount: 145000, classes: 6, students: 320, status: "Pending" },
  ],

  classes: [
    {
      id: 1,
      name: "Advanced Mathematics O/L 2026",
      subject: "Mathematics",
      grade: "Grade 11",
      status: "Active",
      studentsCount: 120,
      feePerStudent: 4000,
      totalEarnings: 480000,
      collectionRate: 95,
      students: [
        {
          id: "STU-0891",
          name: "Kamal Perera",
          email: "kamal.p@gmail.com",
          phone: "+94 77 123 4567",
          photo: "",
          monthlyFee: 4000,
          status: "Paid",
          lastPaymentDate: "2026-05-12",
          paymentMethod: "Bank Transfer",
          totalPaid: 48000,
        },
        {
          id: "STU-1042",
          name: "Nimal Fernando",
          email: "nimal.f@yahoo.com",
          phone: "+94 71 987 6543",
          photo: "",
          monthlyFee: 4000,
          status: "Pending",
          lastPaymentDate: "2026-04-10",
          paymentMethod: "Cash",
          totalPaid: 44000,
        },
        {
          id: "STU-1123",
          name: "Ruwan Jayasinghe",
          email: "ruwan.j@hotmail.com",
          phone: "+94 76 555 1234",
          photo: "",
          monthlyFee: 4000,
          status: "Overdue",
          lastPaymentDate: "2026-03-08",
          paymentMethod: "Bank Transfer",
          totalPaid: 40000,
        },
        {
          id: "STU-1284",
          name: "Sajith Silva",
          email: "sajith.s@gmail.com",
          phone: "+94 70 333 4444",
          photo: "",
          monthlyFee: 4000,
          status: "Paid",
          lastPaymentDate: "2026-05-14",
          paymentMethod: "Card",
          totalPaid: 48000,
        },
        {
          id: "STU-1301",
          name: "Dilini Cooray",
          email: "dilini.c@gmail.com",
          phone: "+94 77 666 7777",
          photo: "",
          monthlyFee: 4000,
          status: "Paid",
          lastPaymentDate: "2026-05-15",
          paymentMethod: "Bank Transfer",
          totalPaid: 48000,
        },
      ],
    },
    {
      id: 2,
      name: "Pure Mathematics A/L 2027",
      subject: "Mathematics",
      grade: "Grade 12",
      status: "Active",
      studentsCount: 85,
      feePerStudent: 5000,
      totalEarnings: 425000,
      collectionRate: 91,
      students: [
        {
          id: "STU-2019",
          name: "Amara Wickramasuriya",
          email: "amara.w@gmail.com",
          phone: "+94 72 444 8888",
          photo: "",
          monthlyFee: 5000,
          status: "Paid",
          lastPaymentDate: "2026-05-10",
          paymentMethod: "Card",
          totalPaid: 25000,
        },
        {
          id: "STU-2182",
          name: "Kasun Rajapakse",
          email: "kasun.r@outlook.com",
          phone: "+94 77 222 9999",
          photo: "",
          monthlyFee: 5000,
          status: "Pending",
          lastPaymentDate: "2026-04-18",
          paymentMethod: "Cash",
          totalPaid: 20000,
        },
        {
          id: "STU-2341",
          name: "Piyumi Gunawardena",
          email: "piyumi.g@gmail.com",
          phone: "+94 71 888 1111",
          photo: "",
          monthlyFee: 5000,
          status: "Paid",
          lastPaymentDate: "2026-05-11",
          paymentMethod: "Bank Transfer",
          totalPaid: 25000,
        },
      ],
    },
    {
      id: 3,
      name: "Grade 10 Mathematics Revision",
      subject: "Mathematics",
      grade: "Grade 10",
      status: "Active",
      studentsCount: 65,
      feePerStudent: 3500,
      totalEarnings: 227500,
      collectionRate: 96,
      students: [
        {
          id: "STU-3122",
          name: "Dineth Alwis",
          email: "dineth.a@gmail.com",
          phone: "+94 77 888 2222",
          photo: "",
          monthlyFee: 3500,
          status: "Paid",
          lastPaymentDate: "2026-05-16",
          paymentMethod: "Cash",
          totalPaid: 35000,
        },
        {
          id: "STU-3240",
          name: "Samanthi Perera",
          email: "samanthi.p@yahoo.com",
          phone: "+94 76 999 3333",
          photo: "",
          monthlyFee: 3500,
          status: "Paid",
          lastPaymentDate: "2026-05-15",
          paymentMethod: "Bank Transfer",
          totalPaid: 35000,
        },
      ],
    },
    {
      id: 4,
      name: "Cambridge IGCSE Mathematics",
      subject: "Mathematics",
      grade: "O/L",
      status: "Active",
      studentsCount: 30,
      feePerStudent: 6000,
      totalEarnings: 180000,
      collectionRate: 100,
      students: [
        {
          id: "STU-4022",
          name: "Ethan de Silva",
          email: "ethan.ds@gmail.com",
          phone: "+94 77 777 9999",
          photo: "",
          monthlyFee: 6000,
          status: "Paid",
          lastPaymentDate: "2026-05-12",
          paymentMethod: "Card",
          totalPaid: 60000,
        },
      ],
    },
    {
      id: 5,
      name: "Applied Mathematics Seminar",
      subject: "Mathematics",
      grade: "Grade 13",
      status: "Completed",
      studentsCount: 20,
      feePerStudent: 4500,
      totalEarnings: 90000,
      collectionRate: 100,
      students: [
        {
          id: "STU-5012",
          name: "Vihan Mendis",
          email: "vihan.m@gmail.com",
          phone: "+94 77 555 8888",
          photo: "",
          monthlyFee: 4500,
          status: "Paid",
          lastPaymentDate: "2026-04-20",
          paymentMethod: "Bank Transfer",
          totalPaid: 9000,
        },
      ],
    },
  ],

  recentTransactions: [
    {
      id: "TXN-79401",
      date: "2026-05-20 10:30 AM",
      studentName: "Kamal Perera",
      studentId: "STU-0891",
      className: "Advanced Mathematics O/L",
      amount: 4000,
      method: "Bank Transfer",
      status: "Paid",
    },
    {
      id: "TXN-79382",
      date: "2026-05-19 04:15 PM",
      studentName: "Amara Wickramasuriya",
      studentId: "STU-2019",
      className: "Pure Mathematics A/L",
      amount: 5000,
      method: "Card",
      status: "Paid",
    },
    {
      id: "TXN-79354",
      date: "2026-05-18 09:20 AM",
      studentName: "Ethan de Silva",
      studentId: "STU-4022",
      className: "Cambridge IGCSE Mathematics",
      amount: 6000,
      method: "Card",
      status: "Paid",
    },
    {
      id: "TXN-79311",
      date: "2026-05-16 02:40 PM",
      studentName: "Dineth Alwis",
      studentId: "STU-3122",
      className: "Grade 10 Mathematics Revision",
      amount: 3500,
      method: "Cash",
      status: "Paid",
    },
    {
      id: "TXN-79299",
      date: "2026-05-15 11:10 AM",
      studentName: "Samanthi Perera",
      studentId: "STU-3240",
      className: "Grade 10 Mathematics Revision",
      amount: 3500,
      method: "Bank Transfer",
      status: "Paid",
    },
    {
      id: "TXN-79255",
      date: "2026-05-15 09:00 AM",
      studentName: "Dilini Cooray",
      studentId: "STU-1301",
      className: "Advanced Mathematics O/L",
      amount: 4000,
      method: "Bank Transfer",
      status: "Paid",
    },
    {
      id: "TXN-79212",
      date: "2026-05-14 05:30 PM",
      studentName: "Sajith Silva",
      studentId: "STU-1284",
      className: "Advanced Mathematics O/L",
      amount: 4000,
      method: "Card",
      status: "Paid",
    },
    {
      id: "TXN-79188",
      date: "2026-05-12 01:25 PM",
      studentName: "Kamal Perera",
      studentId: "STU-0891",
      className: "Advanced Mathematics O/L",
      amount: 4000,
      method: "Bank Transfer",
      status: "Paid",
    },
    {
      id: "TXN-79095",
      date: "2026-05-11 11:15 AM",
      studentName: "Piyumi Gunawardena",
      studentId: "STU-2341",
      className: "Pure Mathematics A/L",
      amount: 5000,
      method: "Bank Transfer",
      status: "Paid",
    },
  ],
};

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export default function TeacherEarningsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [earningsData, setEarningsData] = useState(initialEarningsData);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassFilter, setSelectedClassFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("3months");
  const [expandedClassId, setExpandedClassId] = useState<number | null>(null);

  // Dialog notifications / feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Interactive Actions
  const handleMarkAsPaid = (classId: number, studentId: string) => {
    const updatedClasses = earningsData.classes.map((cls) => {
      if (cls.id !== classId) return cls;
      
      let amountCollectedToAdd = 0;
      const updatedStudents = cls.students.map((stud) => {
        if (stud.id !== studentId) return stud;
        if (stud.status !== "Paid") {
          amountCollectedToAdd = stud.monthlyFee;
          return {
            ...stud,
            status: "Paid" as const,
            lastPaymentDate: new Date().toISOString().split("T")[0],
            paymentMethod: "Bank Transfer",
            totalPaid: stud.totalPaid + stud.monthlyFee,
          };
        }
        return stud;
      });

      const totalPaidStudents = updatedStudents.filter((s) => s.status === "Paid").length;
      const newCollectionRate = Math.round((totalPaidStudents / updatedStudents.length) * 100);

      return {
        ...cls,
        collectionRate: newCollectionRate,
        totalEarnings: cls.totalEarnings + amountCollectedToAdd,
        students: updatedStudents,
      };
    });

    // Update global summaries
    const collectedFee = updatedClasses.find(c => c.id === classId)?.students.find(s => s.id === studentId)?.monthlyFee || 0;
    
    setEarningsData((prev) => ({
      ...prev,
      totalEarnings: prev.totalEarnings + collectedFee,
      thisMonth: prev.thisMonth + collectedFee,
      pendingAmount: Math.max(0, prev.pendingAmount - collectedFee),
      pendingStudentsCount: Math.max(0, prev.pendingStudentsCount - 1),
      classes: updatedClasses,
      // Add a transaction
      recentTransactions: [
        {
          id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
          date: new Date().toLocaleString(),
          studentName: prev.classes.find(c => c.id === classId)?.students.find(s => s.id === studentId)?.name || "Student",
          studentId: studentId,
          className: prev.classes.find(c => c.id === classId)?.name.split(" ")[0] || "Mathematics",
          amount: collectedFee,
          method: "Bank Transfer",
          status: "Paid",
        },
        ...prev.recentTransactions,
      ],
    }));

    triggerToast(`Payment marked as PAID for student ${studentId}!`);
  };

  const handleSendReminder = (studentName: string) => {
    triggerToast(`Payment reminder SMS & Email sent to ${studentName} successfully.`);
  };

  const handleSendBulkReminders = () => {
    triggerToast("Bulk payment reminders sent to all pending students!");
  };

  const handleExport = (format: "PDF" | "Excel" | "CSV") => {
    triggerToast(`Generating and exporting earnings report in ${format} format...`);
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculations based on filters
  const filteredClasses = useMemo(() => {
    return earningsData.classes.filter((cls) => {
      const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
        cls.grade.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesClass = selectedClassFilter === "all" || cls.id.toString() === selectedClassFilter;
      const matchesStatus = selectedStatusFilter === "all" || 
        (selectedStatusFilter === "active" && cls.status === "Active") ||
        (selectedStatusFilter === "completed" && cls.status === "Completed");

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [earningsData.classes, searchTerm, selectedClassFilter, selectedStatusFilter]);

  // Analytics derivations
  const pieChartData = useMemo(() => {
    return earningsData.classes.map((cls) => ({
      name: cls.name.length > 20 ? cls.name.substring(0, 18) + "..." : cls.name,
      value: cls.totalEarnings,
    }));
  }, [earningsData.classes]);

  const donutChartData = useMemo(() => {
    let paid = 0;
    let pending = 0;
    let overdue = 0;

    earningsData.classes.forEach((cls) => {
      cls.students.forEach((stud) => {
        if (stud.status === "Paid") paid += stud.monthlyFee;
        else if (stud.status === "Pending") pending += stud.monthlyFee;
        else if (stud.status === "Overdue") overdue += stud.monthlyFee;
      });
    });

    return [
      { name: "Paid", value: paid },
      { name: "Pending", value: pending },
      { name: "Overdue", value: overdue },
    ];
  }, [earningsData.classes]);

  const totalDonutValue = useMemo(() => {
    return donutChartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [donutChartData]);

  if (!isMounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center space-y-4">
          <Clock className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-lg font-medium text-muted-foreground animate-pulse">Loading earnings dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 relative print:bg-white print:p-0">
      {/* Toast Alert overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-lg shadow-xl font-medium max-w-sm"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page header and top actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-5 print:hidden">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Earnings & Payments
          </h1>
          <p className="text-muted-foreground mt-1">
            Track student subscriptions, class-wise income collection, and payouts.
          </p>
        </div>
        
        {/* Top Right Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="PDF" onValueChange={(val) => handleExport(val as "PDF" | "Excel" | "CSV")}>
            <SelectTrigger className="w-[140px] bg-background/50 backdrop-blur border shadow-sm">
              <Download className="w-4 h-4 mr-2 text-primary" />
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PDF">Export PDF</SelectItem>
              <SelectItem value="Excel">Export Excel</SelectItem>
              <SelectItem value="CSV">Export CSV</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleSendBulkReminders}
            variant="outline"
            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20 shadow-sm"
          >
            <Mail className="w-4 h-4 mr-2" />
            Remind Pending
          </Button>

          <Button
            onClick={handlePrint}
            variant="outline"
            className="bg-background/50 border shadow-sm"
          >
            <Printer className="w-4 h-4 mr-2 text-slate-500" />
            Print
          </Button>
        </div>
      </div>

      {/* 1. TOP SUMMARY CARD (HERO SECTION) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Total Lifetime Earnings - Hero Card */}
        <Card className="lg:col-span-2 overflow-hidden relative border bg-gradient-to-br from-indigo-900 via-indigo-950 to-blue-900 text-white shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-indigo-200 font-semibold text-sm uppercase tracking-wider">Lifetime Earnings</span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <CardTitle className="text-4xl lg:text-5xl font-black mt-2 tracking-tight">
              {formatLKR(earningsData.totalEarnings)}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-2 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <ArrowUp className="w-3.5 h-3.5 mr-1" />
                {earningsData.percentageChange}% MoM
              </div>
              <p className="text-sm text-indigo-200">
                +LKR 11,000 increase from last month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:col-span-2 gap-4">
          {/* Stat 1: This Month */}
          <Card className="shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">This Month</p>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {formatLKR(earningsData.thisMonth)}
                </p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center font-medium">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  Increasing trend
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          {/* Stat 2: Active Classes */}
          <Card className="shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">Active Classes</p>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {earningsData.activeClassesCount} Classes
                </p>
                <p className="text-[10px] text-muted-foreground font-medium">
                  Across {earningsData.totalStudentsCount} enrolled students
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          {/* Stat 3: Pending Payments */}
          <Card className="shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">Pending Payments</p>
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                  {formatLKR(earningsData.pendingAmount)}
                </p>
                <p className="text-[10px] text-amber-500 font-medium">
                  {earningsData.pendingStudentsCount} students with dues
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          {/* Stat 4: Average Per Student */}
          <Card className="shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">Avg per Student</p>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {formatLKR(earningsData.averagePerStudent)}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium">
                  Average subscription charge
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 7. FILTERS & SEARCH PANEL (STICKY CONTROL BAR) */}
      <Card className="shadow-sm border bg-background/60 backdrop-blur print:hidden">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search class name, subject or grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background/50 border"
            />
          </div>

          {/* Multi-Filters Grid */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Class filter dropdown */}
            <div className="flex items-center gap-2">
              <Label className="text-xs font-semibold text-muted-foreground">Class:</Label>
              <Select value={selectedClassFilter} onValueChange={setSelectedClassFilter}>
                <SelectTrigger className="w-[180px] bg-background/50 border">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {earningsData.classes.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name.split(" ")[0]} {c.name.includes("O/L") ? "O/L" : c.name.includes("A/L") ? "A/L" : "Revision"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status filter dropdown */}
            <div className="flex items-center gap-2">
              <Label className="text-xs font-semibold text-muted-foreground">Status:</Label>
              <Select value={selectedStatusFilter} onValueChange={setSelectedStatusFilter}>
                <SelectTrigger className="w-[140px] bg-background/50 border">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Button */}
            {(searchTerm || selectedClassFilter !== "all" || selectedStatusFilter !== "all") && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedClassFilter("all");
                  setSelectedStatusFilter("all");
                }}
                className="text-primary text-xs h-9 px-2 hover:bg-slate-100"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 2. MONTHLY BREAKDOWN CHARTS & TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Bar Chart - Monthly Breakdowns */}
        <Card className="lg:col-span-2 shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              <span>Monthly Earnings Trend</span>
              <Badge variant="outline" className="text-xs bg-primary/5 text-primary">Last 12 Months</Badge>
            </CardTitle>
            <CardDescription>Visual breakdown of fee revenue collected per month.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData.monthlyBreakdown} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis tickLine={false} tickFormatter={(val) => `LKR ${val / 1000}k`} tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(value) => [formatLKR(Number(value)), "Amount Collected"]}
                  contentStyle={{ backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px", border: "none" }}
                />
                <Bar dataKey="amount" fill="url(#barColor)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Earnings Table */}
        <Card className="shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition overflow-hidden">
          <CardHeader className="pb-1">
            <CardTitle className="text-lg font-bold">Monthly Collections</CardTitle>
            <CardDescription>Tabular registry of recent monthly receipts.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 max-h-[340px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-muted-foreground uppercase sticky top-0 z-10 border-b">
                <tr>
                  <th className="px-4 py-3">Month</th>
                  <th className="px-4 py-3 text-right">Earned</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {earningsData.monthlyBreakdown.slice().reverse().map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition">
                    <td className="px-4 py-3.5 font-medium">{item.month}</td>
                    <td className="px-4 py-3.5 text-right font-semibold text-slate-800 dark:text-slate-200">
                      {formatLKR(item.amount)}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Badge className={
                        item.status === "Paid"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 border-none"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/15 border-none"
                      }>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* 3. CLASS-WISE EARNINGS SECTION */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center justify-between">
          <span>Class Earnings Summary</span>
          <span className="text-xs text-muted-foreground font-normal">Showing {filteredClasses.length} of {earningsData.classes.length} classes</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((cls) => (
            <Card key={cls.id} className="shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition overflow-hidden">
              {/* Card Header */}
              <CardHeader className="bg-slate-50/50 dark:bg-slate-900/20 border-b pb-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">{cls.name}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="secondary" className="text-[10px] py-0 px-2 font-semibold">
                        {cls.subject}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] py-0 px-2 font-semibold border-slate-300">
                        {cls.grade}
                      </Badge>
                      <Badge className={
                        cls.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none text-[10px] py-0 px-2"
                          : "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-none text-[10px] py-0 px-2"
                      }>
                        {cls.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Circular Collection Rate Progress Graphic */}
                  <div className="relative flex items-center justify-center w-14 h-14 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200 dark:text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-indigo-600 dark:text-indigo-400"
                        strokeWidth="3.5"
                        strokeDasharray={`${cls.collectionRate}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-[10px] font-black text-slate-800 dark:text-slate-200">
                      {cls.collectionRate}%
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Card Body Stats */}
              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="border-r last:border-none py-1">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">Students</p>
                    <p className="text-base font-bold text-slate-700 dark:text-slate-200 mt-0.5">{cls.studentsCount}</p>
                  </div>
                  <div className="border-r last:border-none py-1">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">Class Fee</p>
                    <p className="text-base font-bold text-slate-700 dark:text-slate-200 mt-0.5">{formatLKR(cls.feePerStudent)}</p>
                  </div>
                  <div className="last:border-none py-1">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">Collected</p>
                    <p className="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {formatLKR(cls.totalEarnings)}
                    </p>
                  </div>
                </div>

                {/* Progress bar mapping */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Fee collection rate</span>
                    <span className="font-semibold">{cls.collectionRate}% complete</span>
                  </div>
                  <Progress value={cls.collectionRate} className="h-1.5 bg-slate-100" />
                </div>

                {/* Expanded Table Trigger Action */}
                <div className="flex items-center justify-between pt-2 border-t gap-2 flex-wrap">
                  <Button
                    onClick={() => setExpandedClassId(expandedClassId === cls.id ? null : cls.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-background border hover:bg-slate-50 text-xs font-semibold shadow-sm"
                  >
                    {expandedClassId === cls.id ? (
                      <>
                        Hide Payments
                        <ChevronUp className="w-3.5 h-3.5 ml-1.5 text-slate-500" />
                      </>
                    ) : (
                      <>
                        View Student Payments
                        <ChevronDown className="w-3.5 h-3.5 ml-1.5 text-slate-500" />
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => triggerToast(`Edit fee drawer opened for ${cls.name}`)}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-slate-100 text-xs text-muted-foreground"
                  >
                    Edit Fee
                  </Button>
                </div>
              </CardContent>

              {/* 4. EXPANDABLE STUDENT-WISE PAYMENT TABLE */}
              <AnimatePresence>
                {expandedClassId === cls.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t bg-slate-50/50 dark:bg-slate-900/10"
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
                        <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                          Student Fees Status Registry
                        </h4>
                        
                        {/* Send reminders to all pending inside this specific class */}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const pendingCount = cls.students.filter(s => s.status !== "Paid").length;
                            if (pendingCount > 0) {
                              triggerToast(`Reminder emails and SMS sent to ${pendingCount} pending students of ${cls.name}!`);
                            } else {
                              triggerToast("All students have paid for this class!");
                            }
                          }}
                          className="h-8 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/5 hover:bg-amber-500/10"
                        >
                          <Send className="w-3 h-3 mr-1.5" />
                          Remind Dues ({cls.students.filter(s => s.status !== "Paid").length})
                        </Button>
                      </div>

                      <div className="overflow-x-auto border rounded-lg bg-background shadow-inner max-h-[300px]">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-50 dark:bg-slate-900 text-[10px] font-bold text-muted-foreground uppercase border-b sticky top-0 z-10">
                            <tr>
                              <th className="px-3 py-2">Student Name</th>
                              <th className="px-3 py-2 text-center">Status</th>
                              <th className="px-3 py-2 text-right">Fee</th>
                              <th className="px-3 py-2 text-center">Paid Method</th>
                              <th className="px-3 py-2 text-right">Total Paid</th>
                              <th className="px-3 py-2 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {cls.students.map((stud) => (
                              <tr key={stud.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition">
                                <td className="px-3 py-2.5">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="w-7 h-7">
                                      <AvatarFallback className="text-[10px] bg-indigo-100 text-indigo-700 font-bold">
                                        {stud.name.split(" ").map(n => n[0]).join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-semibold text-slate-800 dark:text-slate-200">{stud.name}</p>
                                      <p className="text-[9px] text-muted-foreground">{stud.id}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 py-2.5 text-center">
                                  <Badge className={
                                    stud.status === "Paid"
                                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-[9px] px-1.5 py-0"
                                      : stud.status === "Pending"
                                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none font-bold text-[9px] px-1.5 py-0"
                                      : "bg-red-500/10 text-red-600 dark:text-red-400 border-none font-bold text-[9px] px-1.5 py-0"
                                  }>
                                    {stud.status}
                                  </Badge>
                                </td>
                                <td className="px-3 py-2.5 text-right font-medium">{formatLKR(stud.monthlyFee)}</td>
                                <td className="px-3 py-2.5 text-center text-slate-500">{stud.paymentMethod || "—"}</td>
                                <td className="px-3 py-2.5 text-right font-semibold">{formatLKR(stud.totalPaid)}</td>
                                <td className="px-3 py-2.5 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    {stud.status !== "Paid" ? (
                                      <>
                                        <Button
                                          onClick={() => handleMarkAsPaid(cls.id, stud.id)}
                                          size="sm"
                                          variant="ghost"
                                          className="h-7 px-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                        >
                                          <Check className="w-3.5 h-3.5" />
                                          <span className="sr-only">Mark Paid</span>
                                        </Button>
                                        <Button
                                          onClick={() => handleSendReminder(stud.name)}
                                          size="sm"
                                          variant="ghost"
                                          className="h-7 px-1.5 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                        >
                                          <Mail className="w-3.5 h-3.5" />
                                          <span className="sr-only">Remind</span>
                                        </Button>
                                      </>
                                    ) : (
                                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. PAYMENT HISTORY TIMELINE & 6. ANALYTICS SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Recent Transactions Timeline */}
        <Card className="lg:col-span-1 shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Timeline of payment receipts.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 px-4 pb-2">
            <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-6">
              {earningsData.recentTransactions.map((txn) => (
                <div key={txn.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900 group-hover:scale-125 transition" />
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {txn.studentName}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{txn.date.split(" ")[0]}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{txn.className}</p>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <Badge variant="outline" className="text-[9px] py-0 px-1 border-slate-200 text-slate-600 bg-slate-50 dark:bg-slate-950 font-medium">
                        {txn.method}
                      </Badge>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        +{formatLKR(txn.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => triggerToast("Loading more transaction history logs...")}
              variant="ghost"
              className="w-full text-xs text-primary font-bold hover:bg-slate-100 mt-4 border-t pt-3"
            >
              Load More History
            </Button>
          </CardContent>
        </Card>

        {/* Right Side: Analytics Charts (Donut Breakdown & Line Compare) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Earnings comparison chart MoM Line Chart */}
          <Card className="shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Earnings Comparison trend</CardTitle>
              <CardDescription>Visual comparison curve showing revenue over time.</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData.monthlyBreakdown} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 9 }} />
                  <YAxis tickLine={false} tickFormatter={(val) => `LKR ${val / 1000}k`} tick={{ fontSize: 9 }} />
                  <Tooltip
                    formatter={(value) => [formatLKR(Number(value)), "Revenue"]}
                    contentStyle={{ backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px", border: "none" }}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} activeDot={{ r: 6 }} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Two Small Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart: Distribution by Class */}
            <Card className="shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-bold">Class Distribution</CardTitle>
                <CardDescription className="text-[11px]">Percentage distribution by class.</CardDescription>
              </CardHeader>
              <CardContent className="h-[160px] flex items-center justify-center p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={45}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatLKR(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Custom Legend */}
                <div className="flex flex-col gap-1 text-[9px] w-[110px] overflow-hidden">
                  {pieChartData.map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="truncate text-slate-600 dark:text-slate-300 font-medium">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Donut Chart: Payment Status Breakdown */}
            <Card className="shadow-sm border bg-background/40 backdrop-blur hover:shadow-md transition">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-bold">Payment Collection Status</CardTitle>
                <CardDescription className="text-[11px]">Donut ratio mapping paid vs pending balances.</CardDescription>
              </CardHeader>
              <CardContent className="h-[160px] flex items-center justify-center p-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={50}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      <Cell fill="#10B981" /> {/* Paid */}
                      <Cell fill="#F59E0B" /> {/* Pending */}
                      <Cell fill="#EF4444" /> {/* Overdue */}
                    </Pie>
                    <Tooltip formatter={(value) => formatLKR(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>

                {/* Custom Legend */}
                <div className="flex flex-col gap-1.5 text-[10px] w-[90px] flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Paid</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Pending</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Overdue</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
