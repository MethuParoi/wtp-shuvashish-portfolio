'use client';
import RegisterForm from '@/components/admin/admin-auth/RegisterForm';
import AuthForm from '../../../components/admin/admin-auth/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RegisterForm/>
      {/* <AuthForm mode="register" /> */}
    </div>
  );
}
