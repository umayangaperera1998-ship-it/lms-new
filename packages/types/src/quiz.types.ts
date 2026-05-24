import { Status } from './common.types';

export enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE',
  ESSAY = 'ESSAY',
}

export interface Quiz {
  id: string;
  classId: string;
  instituteId: string;
  title: string;
  description?: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  startTime?: Date;
  endTime?: Date;
  status: Status;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string;
  marks: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startTime: Date;
  endTime?: Date;
  score?: number;
  totalMarks: number;
  passed: boolean;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizAnswer {
  id: string;
  attemptId: string;
  questionId: string;
  answer: string;
  isCorrect?: boolean;
  marksAwarded?: number;
  gradedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateQuizDto {
  classId: string;
  title: string;
  description?: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  startTime?: Date;
  endTime?: Date;
}

export interface SubmitQuizAnswerDto {
  attemptId: string;
  questionId: string;
  answer: string;
}
