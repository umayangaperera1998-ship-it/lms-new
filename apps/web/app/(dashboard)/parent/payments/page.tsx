'use client';

import { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  mockChildren, 
  mockPayments 
} from '@/lib/mockParentData';

export default function PaymentsPage() {
  const [selectedChildId, setSelectedChildId] = useState<string>('all');
  
  const selectedChildName = selectedChildId !== 'all' 
    ? mockChildren.find(c => c.id === selectedChildId)?.name 
    : 'All';

  const filteredPayments = mockPayments.filter(p => 
    selectedChildName === 'All' ? true : p.child === selectedChildName
  );

  const pendingPayments = filteredPayments.filter(p => p.status === 'PENDING');
  const paidPayments = filteredPayments.filter(p => p.status === 'PAID');
  
  const totalPendingAmount = pendingPayments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Payments & Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage class fees, download receipts, and view payment history.</p>
        </div>
        
        <Select value={selectedChildId} onValueChange={setSelectedChildId}>
          <SelectTrigger className="w-[200px] bg-white dark:bg-slate-950">
            <SelectValue placeholder="Filter by child" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Children</SelectItem>
            {mockChildren.map((child) => (
              <SelectItem key={child.id} value={child.id}>
                {child.avatar} {child.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Summary Card */}
        <Card className="md:col-span-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-700 dark:text-orange-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Pending Dues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                  LKR {totalPendingAmount.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mt-1">
                  You have {pendingPayments.length} unpaid invoice(s).
                </p>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto">
                <CreditCard className="w-4 h-4 mr-2" /> Pay All Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-3 text-slate-500" />
              Download Statement
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Receipt className="w-4 h-4 mr-3 text-slate-500" />
              Auto-Pay Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>Recent transactions and pending invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200 dark:border-slate-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Child</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.date}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell className="text-muted-foreground">{payment.child}</TableCell>
                      <TableCell className="font-semibold">LKR {payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        {payment.status === 'PAID' ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900">
                            <Clock className="w-3 h-3 mr-1" /> Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {payment.status === 'PENDING' && (
                          <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Pay
                          </Button>
                        )}
                        {payment.status === 'PAID' && (
                          <Button size="sm" variant="ghost" className="text-slate-500">
                            Receipt
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
