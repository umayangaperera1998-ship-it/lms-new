'use client';

import { useState } from 'react';
import { 
  Bell, 
  Settings, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle,
  CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockNotifications } from '@/lib/mockParentData';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = activeTab === 'all' 
    ? mockNotifications 
    : activeTab === 'unread' 
      ? mockNotifications.filter(n => !n.read) 
      : mockNotifications.filter(n => n.type === activeTab.toUpperCase());

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
            Notifications <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400">{mockNotifications.filter(n => !n.read).length} New</Badge>
          </h1>
          <p className="text-muted-foreground mt-1">Stay updated on your children's academic activities and administrative notices.</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="text-slate-500">
            <CheckCircle2 className="w-4 h-4 mr-2" /> Mark all read
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-slate-500" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full sm:w-auto overflow-x-auto justify-start border-b rounded-none bg-transparent p-0">
              <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">All</TabsTrigger>
              <TabsTrigger value="unread" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">Unread</TabsTrigger>
              <TabsTrigger value="academic" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">Academic</TabsTrigger>
              <TabsTrigger value="payment" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">Payments</TabsTrigger>
              <TabsTrigger value="system" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">System</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                <p>No notifications found in this category.</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex gap-4 p-4 rounded-xl border transition-colors ${
                    !notification.read 
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/50' 
                      : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    notification.type === 'ACADEMIC' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' :
                    notification.type === 'PAYMENT' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {notification.type === 'ACADEMIC' && <TrendingUp className="w-5 h-5" />}
                    {notification.type === 'PAYMENT' && <CreditCard className="w-5 h-5" />}
                    {notification.type === 'SYSTEM' && <AlertCircle className="w-5 h-5" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`text-sm font-semibold ${!notification.read ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className={`text-sm mt-1 ${!notification.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                      {notification.message}
                    </p>
                  </div>
                  
                  {!notification.read && (
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
