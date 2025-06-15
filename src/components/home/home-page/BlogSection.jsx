"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Navigation/Button";
import { useRouter } from "next/navigation";
import BlogGrid from "../../home/blog/BlogGrid";
import { fetchBlogs } from "../../../lib/fetchBlog"; // must be client-safe or call via API

export default function BlogSection() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs(4); // Make sure this function is available client-side or fetch from an API route
        setBlogs(data);
      } catch (err) {
        console.error("Error loading blogs:", err);
        setError("Unable to load blog posts at the moment.");
      }
    };

    loadBlogs();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-secondary-hover font-medium text-sm uppercase tracking-wide mb-2">
            Our Blog
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stories & Ideas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore breathtaking landscapes, iconic landmarks, and hidden gems around the globe
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 && !error && (
          <div className="mb-10">
            <BlogGrid blogs={blogs} />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-6">{error}</p>
        )}

        {/* View All Button */}
        {blogs.length > 0 && !error && (
          <div className="flex justify-center">
            <Button
              onClick={() => router.push("/all-blogs")}
              className="self-center"
              variant="default"
              size="default"
            >
              View All Blogs
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

