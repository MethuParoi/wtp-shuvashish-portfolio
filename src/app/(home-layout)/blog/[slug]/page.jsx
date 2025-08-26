"use client";
import { useEffect, useState } from 'react';
import { fetchBlogBySlug } from '../../../../lib/fetchBlog';
import Loader from '@/components/ui/Loader/Loader';

export default function BlogDetailPage({ params }) {
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
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-50">
              No Blog Found
            </h2>
            <p className="text-gray-100">
              It seems there are no blog available at the moment.
            </p>
          </div>
        </section>
      );
    }
    if (loading) {
      return (
        <section className="container mx-auto max-w-7xl px-4 py-16">
          <Loader />
        </section>
      );
    }

    return (
      <article className="container mx-auto max-w-5xl px-4 pt-2 pb-12">
        <img
          src={blog.featuredImage || "/placeholder.jpg"}
          alt={blog.title}
          className="mb-6 h-96 w-full rounded-lg object-fill lg:h-[30rem]"
        />
        <h1 className="mb-2 text-4xl font-bold text-gray-50">{blog.title}</h1>
        <div className="mb-4 flex items-center text-sm text-gray-300">
          <span>By {blog.author}</span>
          {blog.publishedAt && (
            <span className="ml-4">
              {new Date(blog.publishedAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <div
          className="prose mx-4 max-w-none text-gray-50 lg:mx-0"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    );
}
