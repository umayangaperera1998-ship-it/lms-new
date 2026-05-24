import { Grade, Subject, ClassMode, Status } from './common.types';

export interface Class {
  id: string;
  instituteId: string;
  name: string;
  description?: string;
  grade: Grade;
  subject: Subject;
  mode: ClassMode;
  capacity: number;
  fee: number;
  schedule?: string;
  startDate: Date;
  endDate?: Date;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClassDto {
  name: string;
  description?: string;
  grade: Grade;
  subject: Subject;
  mode: ClassMode;
  capacity: number;
  fee: number;
  schedule?: string;
  startDate: Date;
  endDate?: Date;
}

export interface UpdateClassDto {
  name?: string;
  description?: string;
  capacity?: number;
  fee?: number;
  schedule?: string;
  endDate?: Date;
  status?: Status;
}

export interface ClassSchedule {
  classId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  roomNumber?: string;
  meetingLink?: string;
}
