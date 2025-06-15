"use client";
import { fetchBlogs } from '@/lib/fetchBlog';
import BlogGrid from '../../../components/home/blog/BlogGrid';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader/Loader';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  try {
    // Fetch blogs from the server
    useEffect(() => {
          const loadBlogs = async () => {
            setLoading(true);
            try {
              const data = await fetchBlogs(); 
              setBlogs(data);
              setLoading(false);
            } catch (err) {
              console.error("Error loading blogs:", err);
              setError("Unable to load blogs at the moment.");
            }
          };
      
          loadBlogs();
        }, []);
  
    if (!loading && blogs.length === 0) {
      return (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Blogs Found</h2>
            <p className="text-gray-600">It seems there are no blog posts available at the moment.</p>
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
      <section className="py-16 bg-gray-50 container mx-auto px-4 max-w-7xl">
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
          <BlogGrid blogs={blogs} />

          
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

