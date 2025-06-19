'use client';
import RegisterForm from '@/components/admin/admin-auth/RegisterForm';


import { useAppContext } from '@/context-api/appContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterPage() {
  const { adminExists } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (adminExists) {
      // client‑side replace, no full reload
      router.replace('/admin-login');
    }
  }, [adminExists, router]);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RegisterForm/>
      {/* <AuthForm mode="register" /> */}
    </div>
  );
}
