import BlogCard from './BlogCard';

export default function BlogGrid({ blogs }) {
    // console.log('Rendering BlogGrid with blogs:', blogs);

    if (!Array.isArray(blogs) || blogs.length === 0) {
        return <p className='text-center my-14 text-2xl font-semibold'>No blogs available.</p>;
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map(blog => (
                <BlogCard key={blog.$id} blog={blog} />
            ))}
        </div>
    );
}