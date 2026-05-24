'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = authApi.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    await authApi.logout();
    router.push('/auth/login');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName} {user?.lastName}!
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>👥 Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Total students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>👨‍🏫 Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Total teachers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📚 Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>💰 Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Rs. 0</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-950 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">🎯 Admin Dashboard Ready!</h2>
        <p className="text-muted-foreground">
          Authentication and authorization are working perfectly. Full admin features coming next!
        </p>
        <div className="mt-4">
          <p className="text-sm font-medium">Your Role: {user?.role}</p>
          <p className="text-sm font-medium">Institute: {user?.instituteName || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
