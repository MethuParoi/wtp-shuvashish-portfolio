import BlogsTable from '../../../components/admin/blog/manage-blog/BlogsTable';

export default function AdminBlogsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Management</h1>
        <p className="text-gray-600">Manage all your blog posts from this dashboard.</p>
      </div>
      
      <BlogsTable />
    </div>
  );
}
