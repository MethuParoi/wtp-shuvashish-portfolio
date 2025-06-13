import BlogCard from './BlogCard';

export default function BlogGrid({ blogs }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map(blog => (
        <BlogCard key={blog.$id} blog={blog} />
      ))}
    </div>
  );
}
