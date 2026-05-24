import { Grade, Status } from './common.types';

export interface Student {
  id: string;
  userId: string;
  instituteId: string;
  grade: Grade;
  studentId: string;
  dateOfBirth?: Date;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  emergencyContact?: string;
  status: Status;
  enrollmentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStudentDto {
  userId: string;
  grade: Grade;
  studentId: string;
  dateOfBirth?: Date;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  emergencyContact?: string;
}

export interface UpdateStudentDto {
  grade?: Grade;
  dateOfBirth?: Date;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  emergencyContact?: string;
  status?: Status;
}

export interface StudentProgress {
  studentId: string;
  attendancePercentage: number;
  averageQuizScore: number;
  totalClassesEnrolled: number;
  completedQuizzes: number;
  achievementsCount: number;
}
