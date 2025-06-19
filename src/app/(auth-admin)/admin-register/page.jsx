'use client';
import RegisterForm from '@/components/admin/admin-auth/RegisterForm';


import { useAppContext } from '@/context-api/appContext';
import { useContext } from 'react';

export default function RegisterPage() {
  const { adminExists } = useContext(useAppContext);
  
  if(adminExists) {
    window.location.href = '/admin-login';
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RegisterForm/>
      {/* <AuthForm mode="register" /> */}
    </div>
  );
}
