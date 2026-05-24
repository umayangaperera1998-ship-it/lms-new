export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
}

export enum AttendanceMethod {
  MANUAL = 'MANUAL',
  QR_CODE = 'QR_CODE',
  AUTO = 'AUTO',
}

export interface Attendance {
  id: string;
  classId: string;
  studentId: string;
  date: Date;
  status: AttendanceStatus;
  method: AttendanceMethod;
  markedBy: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MarkAttendanceDto {
  classId: string;
  studentId: string;
  date: Date;
  status: AttendanceStatus;
  method: AttendanceMethod;
  notes?: string;
}

export interface BulkMarkAttendanceDto {
  classId: string;
  date: Date;
  attendances: {
    studentId: string;
    status: AttendanceStatus;
  }[];
}

export interface AttendanceReport {
  studentId: string;
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
}
