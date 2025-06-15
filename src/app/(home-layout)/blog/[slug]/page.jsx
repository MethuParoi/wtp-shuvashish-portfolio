"use client";
import { useEffect, useState } from 'react';
import { fetchBlogBySlug } from '../../../../lib/fetchBlog';
import Loader from '@/components/ui/Loader/Loader';

export default function BlogDetailPage({ params }) {
  // const blog = await fetchBlogBySlug(params.slug);
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  
    // Fetch blogs from the server
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top on page load
          const loadBlogs = async () => {
            setLoading(true);
            try {
              // const resolvedParams = await params;
              // const slug = resolvedParams?.projectSlug;
              const blog = await fetchBlogBySlug(params.slug);
              setBlog(blog);
              setLoading(false);
            } catch (err) {
              console.error("Error loading blog:", err);
              setError("Unable to load blog at the moment.");
            }
          };
      
          loadBlogs();
        }, []);
  
    if (!loading && !blog) {
      return (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Blog Found</h2>
            <p className="text-gray-600">It seems there are no blog available at the moment.</p>
          </div>
        </section>
      );
    }
    if (loading) {
      return (
        <section className="py-16 bg-gray-50 container mx-auto px-4 max-w-7xl">
          <Loader/>
        </section>
      );
    }


  return (
    <article className="container mx-auto px-4 py-12 max-w-5xl">
      <img
        src={blog.featuredImage || '/placeholder.jpg'}
        alt={blog.title}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <div className="flex items-center mb-4 text-gray-500 text-sm">
        <span>By {blog.author}</span>
        {blog.publishedAt && (
          <span className="ml-4">
            {new Date(blog.publishedAt).toLocaleDateString()}
          </span>
        )}
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
