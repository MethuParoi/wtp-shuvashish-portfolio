import { cookies } from 'next/headers';
import AdminProfile from '../../../components/admin/admin-profile/AdminProfile';

export default function AdminProfilePage() {
  const role = cookies().get('role')?.value;
      
  return <AdminProfile role={role}/>;
}
