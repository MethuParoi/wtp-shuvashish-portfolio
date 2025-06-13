import BlogUploadForm from '../../../components/admin/blog/BlogUploadForm';

export default function CreateBlogPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <BlogUploadForm />
            </div>
        </div>
    );
}
