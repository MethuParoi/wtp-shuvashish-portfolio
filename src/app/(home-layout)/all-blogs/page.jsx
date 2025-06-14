import { fetchBlogsWithCursor } from '@/lib/fetchBlog';
import BlogGrid from '../../../components/home/blog/BlogGrid';

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
              All Blogs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore my latest articles and insights. Each blog post delves into various topics, sharing knowledge and experiences.
            </p>
          </div>

          {/* Blog Grid */}
          <BlogGrid blogs={blogs.documents} />

          
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
