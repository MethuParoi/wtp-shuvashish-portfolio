// app/upload/page.js
import ProjectUploadForm from '../../../components/admin/projects/ProjectUploadForm';

export default function UploadPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <ProjectUploadForm />
            </div>
        </div>
    );
}
