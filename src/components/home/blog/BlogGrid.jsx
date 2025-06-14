"use client";
import BlogCard from './BlogCard';
import FeaturedBlogCard from './FeaturedCard';
import { usePathname } from 'next/navigation';

export default function BlogGrid({ blogs = [] }) {
  const pathname = usePathname();
  if (!blogs || !Array.isArray(blogs)) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-gray-500 text-lg">No stories available</p>
          <p className="text-gray-400 text-sm mt-2">Check back later for new content!</p>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-gray-500 text-lg">No blog posts found</p>
          <p className="text-gray-400 text-sm mt-2">Be the first to share a story!</p>
        </div>
      </div>
    );
  }

  // Separate featured blog (first one) from the rest
  const [featuredBlog, ...otherBlogs] = blogs;

  return (
    <div className="space-y-8">
      

      {/* Other Blogs Grid */}
      {otherBlogs.length > 0 && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {/* home page blog grid */}
          {/* Featured Blog */}
          {featuredBlog && pathname != '/all-blogs' && (
            <div>
              <FeaturedBlogCard blog={featuredBlog} />
            </div>
          )}
          <div className={`flex flex-col gap-5 ${pathname === '/all-blogs' ? "hidden" : ""}`}>
            {pathname != '/all-blogs' && otherBlogs.map(blog => (
            <BlogCard key={blog.$id} blog={blog} />
          ))}
          </div>
          {/* all blog page blog grid */}
          {pathname === '/all-blogs' && blogs.map(blog => (
            <FeaturedBlogCard key={blog.$id} blog={blog} />
          ))}
        </div>
      )}
      
    </div>
  );
}
