import { Status } from './common.types';

export interface Institute {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  domain?: string;
  subdomain?: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  province?: string;
  country: string;
  status: Status;
  features: InstituteFeatures;
  subscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InstituteFeatures {
  maxStudents: number;
  maxTeachers: number;
  onlineClasses: boolean;
  quizzes: boolean;
  attendance: boolean;
  payments: boolean;
  chat: boolean;
  analytics: boolean;
  customBranding: boolean;
}

export interface CreateInstituteDto {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  province?: string;
  country?: string;
  features?: Partial<InstituteFeatures>;
}

export interface UpdateInstituteDto {
  name?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  domain?: string;
  subdomain?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  status?: Status;
  features?: Partial<InstituteFeatures>;
}

export interface InstituteBranding {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  customCss?: string;
}
