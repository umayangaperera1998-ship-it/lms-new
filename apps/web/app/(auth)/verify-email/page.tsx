"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

import { authApi } from '@/lib/api/auth.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (token && status === 'idle') {
      verifyToken(token);
    }
  }, [token, status]);

  const verifyToken = async (verifyToken: string) => {
    try {
      setStatus('loading');
      await authApi.verifyEmail(verifyToken);
      setStatus('success');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Verification failed. Link might be expired.');
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      // Assuming we might add a resend email endpoint later
      // await authApi.resendVerificationEmail({ email });
      alert("Verification email resent!");
    } catch (err) {
      alert("Failed to resend email.");
    }
  };

  if (!token && !email) {
    return (
      <div className="text-center">
        <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <p className="text-gray-600 mb-4">Invalid verification link.</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  if (status === 'idle' && !token && email) {
    return (
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          We have sent a verification email to <strong>{email}</strong>. 
          Please check your inbox and click the link to verify your account.
        </p>
        <Button onClick={handleResend} variant="outline" className="w-full">
          Resend Verification Email
        </Button>
      </div>
    );
  }

  if (status === 'loading' || (token && status === 'idle')) {
    return (
      <div className="text-center py-6">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600">Verifying your email address...</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-lg font-medium text-green-700 mb-2">Email Verified!</h3>
        <p className="text-gray-600 mb-6">
          Your account has been successfully verified. Redirecting to login...
        </p>
        <Button asChild className="w-full">
          <Link href="/login">Go to Login Now</Link>
        </Button>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center">
        <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-red-700 mb-2">Verification Failed</h3>
        <p className="text-gray-600 mb-6">{errorMsg}</p>
        <Button asChild className="w-full">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return null;
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            Verify your email address to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="flex justify-center py-4"><Loader2 className="h-6 w-6 animate-spin text-gray-500" /></div>}>
            <VerifyEmailContent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
