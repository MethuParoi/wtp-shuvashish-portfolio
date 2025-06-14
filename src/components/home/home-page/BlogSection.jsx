import { fetchBlogsWithCursor } from '@/lib/fetchBlog';
import Link from 'next/link';
import BlogGrid from '../blog/BlogGrid';

export default async function BlogSection() {
  try {
    const blogs = await fetchBlogsWithCursor(6); // Limit to 6 blog for homepage
//   console.log('Fetched blogs:', blogs); 

    return (
      <section className="py-16 bg-gray-50 bg-gray-50 container mx-auto px-4 max-w-7xl">
        <div className="">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Blogs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore my latest articles and insights. Each blog post delves into various topics, sharing knowledge and experiences.
            </p>
          </div>

          {/* Blog Grid */}
          <BlogGrid blogs={blogs.documents} />

          {/* View All Blogs Button */}
          {blogs.documents.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/all-blogs"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                View All Blogs
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error in BlogsSection:', error);
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Blogs</h2>
          <p className="text-red-500">Error loading Blogs. Please try again later.</p>
        </div>
      </section>
    );
  }
}
