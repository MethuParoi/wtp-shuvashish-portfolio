// app/upload/page.js
import { cookies } from 'next/headers';
import ProjectUploadForm from '../../../components/admin/projects/ProjectUploadForm';
import { redirect } from 'next/navigation';

export default function UploadPage() {
    const role = cookies().get('role')?.value;
      if (role !== 'admin') {
        redirect('/admin-login');
      }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <ProjectUploadForm />
            </div>
        </div>
    );
}
