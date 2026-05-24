export enum NotificationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

export enum NotificationChannel {
  IN_APP = 'IN_APP',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
}

export interface Notification {
  id: string;
  userId: string;
  instituteId?: string;
  type: NotificationType;
  title: string;
  message: string;
  channel: NotificationChannel;
  read: boolean;
  readAt?: Date;
  data?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNotificationDto {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  channel: NotificationChannel;
  data?: Record<string, any>;
}

export interface BulkNotificationDto {
  userIds: string[];
  type: NotificationType;
  title: string;
  message: string;
  channels: NotificationChannel[];
}
