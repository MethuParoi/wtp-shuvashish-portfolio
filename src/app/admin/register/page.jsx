'use client';
import AuthForm from '../../../components/admin/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthForm mode="register" />
    </div>
  );
}
