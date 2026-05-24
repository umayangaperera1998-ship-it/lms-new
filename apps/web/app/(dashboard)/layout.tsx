"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { authApi } from "@/lib/api/auth.api";
import { UserRole } from "@lms/types";

export default function RootDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  // In a real app, this would fetch from a React Context or Redux Store.
  const user = authApi.getCurrentUser();

  useEffect(() => {
    setIsClient(true);
    if (!authApi.isAuthenticated()) {
      // Mocked to allow UI viewing without backend for now.
      // In production, uncomment:
      // router.push("/login");
    }
  }, [router]);

  if (!isClient) return null;

  // Determine dashboard layout role based on current URL path prefix to ensure context matches,
  // falling back to the logged in user's role, and then to student.
  let role = user?.role as UserRole | undefined;
  
  if (pathname.startsWith("/teacher")) {
    role = UserRole.TEACHER;
  } else if (pathname.startsWith("/student")) {
    role = UserRole.STUDENT;
  } else if (pathname.startsWith("/parent")) {
    role = UserRole.PARENT;
  } else if (pathname.startsWith("/admin")) {
    role = UserRole.SUPER_ADMIN;
  }

  if (!role) {
    role = UserRole.STUDENT;
  }

  // Set default labels matching the determined role
  let defaultName = "Student Profile";
  let defaultEmail = "student@lms.local";
  
  if (role === UserRole.TEACHER) {
    defaultName = "Teacher Profile";
    defaultEmail = "teacher@lms.local";
  } else if (role === UserRole.SUPER_ADMIN || role === UserRole.INSTITUTE_ADMIN) {
    defaultName = "Admin Profile";
    defaultEmail = "admin@lms.local";
  } else if (role === UserRole.PARENT) {
    defaultName = "Parent Profile";
    defaultEmail = "parent@lms.local";
  }

  return (
    <DashboardLayout
      role={role}
      userName={user ? `${user.firstName} ${user.lastName}` : defaultName}
      userEmail={user?.email || defaultEmail}
    >
      {children}
    </DashboardLayout>
  );
}
