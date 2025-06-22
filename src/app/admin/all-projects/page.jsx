import ProjectsTable from "@/components/admin/projects/ProjectsTable";
import { redirect } from 'next/navigation';
import { cookies } from "next/headers";


export default function AdminProjectsPage() {
  const role = cookies().get('role')?.value;
      if (role !== 'admin') {
        redirect('/admin-login');
      }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects Management</h1>
        <p className="text-gray-600">Manage all your portfolio projects from this dashboard.</p>
      </div>
      
      <ProjectsTable />
    </div>
  );
}
