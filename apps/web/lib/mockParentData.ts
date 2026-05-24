// Mock data for the Parent Dashboard

export interface Child {
  id: string;
  name: string;
  grade: string;
  avatar: string;
  attendanceTotal: number; // percentage
  averageScore: number; // percentage
  upcomingClasses: number;
}

export const mockChildren: Child[] = [
  {
    id: "child-1",
    name: "Dinuka Perera",
    grade: "Grade 10",
    avatar: "👨‍🎓",
    attendanceTotal: 92,
    averageScore: 85,
    upcomingClasses: 3,
  },
  {
    id: "child-2",
    name: "Senuri Perera",
    grade: "Grade 8",
    avatar: "👩‍🎓",
    attendanceTotal: 98,
    averageScore: 94,
    upcomingClasses: 2,
  },
];

export const mockUpcomingClasses = [
  { id: "c1", childId: "child-1", subject: "Mathematics", time: "Today, 3:30 PM", teacher: "Mr. Silva" },
  { id: "c2", childId: "child-1", subject: "Science", time: "Tomorrow, 4:00 PM", teacher: "Mrs. Fernando" },
  { id: "c3", childId: "child-2", subject: "English", time: "Today, 5:00 PM", teacher: "Ms. Alwis" },
];

export const mockRecentActivities = [
  { id: "a1", childId: "child-1", type: "QUIZ", title: "Math Quiz Completed", desc: "Scored 88%", date: "2 hours ago" },
  { id: "a2", childId: "child-2", type: "ATTENDANCE", title: "Attended Science Class", desc: "Present", date: "Yesterday" },
  { id: "a3", childId: "child-1", type: "PAYMENT", title: "Term Fee Paid", desc: "LKR 5,000", date: "3 days ago" },
];

export const mockAttendanceTrends = [
  { month: "Jan", "Dinuka Perera": 95, "Senuri Perera": 98 },
  { month: "Feb", "Dinuka Perera": 88, "Senuri Perera": 100 },
  { month: "Mar", "Dinuka Perera": 92, "Senuri Perera": 96 },
  { month: "Apr", "Dinuka Perera": 94, "Senuri Perera": 98 },
  { month: "May", "Dinuka Perera": 91, "Senuri Perera": 99 },
];

export const mockSubjectProgress = [
  { subject: "Mathematics", score: 85, classAverage: 72 },
  { subject: "Science", score: 92, classAverage: 78 },
  { subject: "English", score: 78, classAverage: 75 },
  { subject: "History", score: 88, classAverage: 80 },
];

export const mockPayments = [
  { id: "p1", child: "Dinuka Perera", description: "Term 2 Fee (Math)", amount: 3500, status: "PAID", date: "2024-05-10" },
  { id: "p2", child: "Senuri Perera", description: "Term 2 Fee (Science)", amount: 3500, status: "PENDING", date: "2024-05-20" },
  { id: "p3", child: "Dinuka Perera", description: "Workshop Material", amount: 1200, status: "PENDING", date: "2024-05-25" },
  { id: "p4", child: "Senuri Perera", description: "Term 1 Fee", amount: 3500, status: "PAID", date: "2024-01-15" },
];

export const mockNotifications = [
  { id: "n1", type: "PAYMENT", title: "Payment Due", message: "Term 2 Science fee for Senuri is due.", time: "1 hour ago", read: false },
  { id: "n2", type: "ACADEMIC", title: "New Result", message: "Dinuka scored 88% in Math Quiz.", time: "5 hours ago", read: false },
  { id: "n3", type: "SYSTEM", title: "Holiday Notice", message: "Institute will be closed on Poya day.", time: "1 day ago", read: true },
];
