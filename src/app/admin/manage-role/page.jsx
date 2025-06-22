import AdminManagement from '@/components/admin/manage-role/AdminManagement'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
  const role = cookies().get('role')?.value;
      if (role !== 'admin') {
        redirect('/admin-login');
      }

  return (
    <div>
      <AdminManagement/>
    </div>
  )
}

export default page