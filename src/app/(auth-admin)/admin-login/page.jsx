'use client';
import LoginForm from '@/components/admin/admin-auth/LoginForm';
export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
        <LoginForm/>
      {/* <AuthForm mode="login" /> */}
    </div>
  );
}
