"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";
import { UserRole } from "@lms/types";
import { cn } from "@lms/utils";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  FolderOpen,
  LineChart,
  MessageSquare,
  User,
  Users,
  Settings,
  CreditCard,
  Bell,
  Wallet,
  Receipt,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  role: UserRole;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const getNavItems = (role: UserRole) => {
  switch (role) {
    case UserRole.STUDENT:
      return [
        { title: "Dashboard", href: "/student", icon: LayoutDashboard },
        { title: "My Classes", href: "/student/classes", icon: BookOpen },
        { title: "Attendance", href: "/student/attendance", icon: CalendarCheck },
        { title: "Quizzes", href: "/student/quizzes", icon: ClipboardList },
        { title: "Materials", href: "/student/materials", icon: FolderOpen },
        { title: "Progress", href: "/student/progress", icon: LineChart },
        { title: "Messages", href: "/student/messages", icon: MessageSquare },
        { title: "Profile", href: "/student/profile", icon: User },
      ];
    case UserRole.TEACHER:
      return [
        { title: "Dashboard", href: "/teacher", icon: LayoutDashboard },
        { title: "My Classes", href: "/teacher/classes", icon: BookOpen },
        { title: "Students", href: "/teacher/students", icon: Users },
        { title: "Attendance", href: "/teacher/attendance", icon: CalendarCheck },
        { title: "Quizzes", href: "/teacher/quizzes", icon: ClipboardList },
        { title: "Materials", href: "/teacher/materials", icon: FolderOpen },
        { title: "Analytics", href: "/teacher/analytics", icon: LineChart },
        { title: "Earnings", href: "/teacher/earnings", icon: Wallet },
        { title: "Expenses", href: "/teacher/expenses", icon: Receipt },
        { title: "Profile", href: "/teacher/profile", icon: User },
      ];
    case UserRole.PARENT:
      return [
        { title: "Dashboard", href: "/parent", icon: LayoutDashboard },
        { title: "My Children", href: "/parent/children", icon: Users },
        { title: "Attendance", href: "/parent/attendance", icon: CalendarCheck },
        { title: "Progress", href: "/parent/progress", icon: LineChart },
        { title: "Payments", href: "/parent/payments", icon: CreditCard },
        { title: "Notifications", href: "/parent/notifications", icon: Bell },
      ];
    case UserRole.INSTITUTE_ADMIN:
    case UserRole.SUPER_ADMIN:
      return [
        { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { title: "Students", href: "/admin/students", icon: Users },
        { title: "Classes", href: "/admin/classes", icon: BookOpen },
        { title: "Settings", href: "/admin/settings", icon: Settings },
      ];
    default:
      return [];
  }
};

export function Sidebar({ role, isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = getNavItems(role);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-[260px] transform bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 shadow-[1px_0_20px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex md:flex-col",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400 tracking-tight">
            LMS Platform
          </span>
        </div>
        <button
          className="ml-auto md:hidden text-slate-500 hover:text-slate-800"
          onClick={onMobileClose}
        >
          {/* Close Icon for mobile could go here */}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 no-scrollbar">

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isBaseRoute = ['/teacher', '/student', '/parent', '/admin'].includes(item.href);
            const isActive = isBaseRoute 
              ? pathname === item.href 
              : (pathname === item.href || pathname.startsWith(`${item.href}/`));
              
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/15 to-purple-500/5 text-indigo-700 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-100"
                )}
                onClick={() => onMobileClose && onMobileClose()}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r-full" />
                )}
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 shrink-0 transition-transform duration-200",
                    isActive 
                      ? "text-indigo-600 dark:text-indigo-400" 
                      : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:scale-110"
                  )}
                  aria-hidden="true"
                />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <button 
          className="w-full group flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-xl text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 transition-colors duration-200"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Log Out
        </button>
      </div>
    </div>
  );
}
