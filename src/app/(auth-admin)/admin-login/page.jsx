'use client';
import LoginForm from '@/components/admin/admin-auth/LoginForm';
import { useContext, useEffect, useState } from 'react';
import { fetchAdmins } from '@/lib/adminService';
import { useAppContext } from '@/context-api/appContext';
export default function LoginPage() {
  const { adminExists, setAdminExists } = useContext(useAppContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      async function checkAdmin() {
      try {
        setLoading(true);
        const res = await fetchAdmins();
        if (res.length > 0) {
          // If there are existing admins, redirect to login
          setAdminExists(true);
          setLoading(false);
          // toast.error('An admin already exists. Please log in.');
          
        }
      } catch (error) {
        setLoading(false);
        console.error('Error checking admin:', error);
      }
    };
  
    checkAdmin();
    }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
        <LoginForm/>
      {/* <AuthForm mode="login" /> */}
    </div>
  );
}
