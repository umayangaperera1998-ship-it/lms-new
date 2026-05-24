export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CARD = 'CARD',
  ONLINE = 'ONLINE',
}

export interface Payment {
  id: string;
  studentId: string;
  instituteId: string;
  classId?: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paymentDate: Date;
  dueDate?: Date;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentDto {
  studentId: string;
  classId?: string;
  amount: number;
  method: PaymentMethod;
  paymentDate: Date;
  dueDate?: Date;
  notes?: string;
}

export interface Invoice {
  id: string;
  paymentId: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate?: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax?: number;
  discount?: number;
  total: number;
  createdAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
