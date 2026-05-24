import { Status, Subject } from './common.types';

export interface Teacher {
  id: string;
  userId: string;
  instituteId: string;
  teacherId: string;
  subjects: Subject[];
  qualifications?: string;
  experience?: number;
  bio?: string;
  status: Status;
  joinedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeacherDto {
  userId: string;
  teacherId: string;
  subjects: Subject[];
  qualifications?: string;
  experience?: number;
  bio?: string;
}

export interface UpdateTeacherDto {
  subjects?: Subject[];
  qualifications?: string;
  experience?: number;
  bio?: string;
  status?: Status;
}
