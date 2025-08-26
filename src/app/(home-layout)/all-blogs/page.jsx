"use client";
import { fetchBlogs } from '@/lib/fetchBlog';
import BlogGrid from '../../../components/home/blog/BlogGrid';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader/Loader';
import NewsCard from "@/components/home/home-page/blog/NewsCard";

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
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-50">
              No Blogs Found
            </h2>
            <p className="text-gray-100">
              It seems there are no blog posts available at the moment.
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
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <div className="">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-50 md:text-4xl">
              All Blogs
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-100">
              Explore my latest articles and insights. Each blog post delves
              into various topics, sharing knowledge and experiences.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {blogs?.map((newsItem, index) => (
              <NewsCard
                key={newsItem.id}
                newsItem={newsItem}
                className={` ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""} ${index === 1 ? "lg:col-span-1" : ""} ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""} `}
              />
            ))}
          </div>
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

