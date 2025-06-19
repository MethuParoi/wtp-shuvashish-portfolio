import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientShell from '../../components/admin/admin-home/ClientShell';

export default function DashboardLayout({ children }) {
  const adminCookie = cookies().get('admin')?.value;
  if (!adminCookie) {
    redirect('/admin-login');
  }

  // pass through to your client UI wrapper
  return <ClientShell>{children}</ClientShell>;
}



