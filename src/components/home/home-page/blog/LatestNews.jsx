"use client";
import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { useRouter } from "next/navigation";
import { fetchBlogs } from "../../../../lib/fetchBlog";
import { Button } from "@/components/ui/Navigation/Button";
import Loader from "@/components/ui/Loader/Loader";

const LatestNews = ({
  title = "Latest Blogs",
  subtitle = "Lorem ipsum dolor sit amet consectetur. In nulla nunc arcu velit consectetur massa mauris molestiae hac.",

  className = "",
}) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogs(4); // Make sure this function is available client-side or fetch from an API route
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error loading blogs:", err);
        setError("Unable to load blog posts at the moment.");
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <Loader />
      </section>
    );
  }

  return (
    <section
      className={`relative overflow-hidden pb-16 ${className}`}
      style={{ backgroundColor: "var(--color-news-section-bg)" }}
    >
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ color: "var(--color-news-heading)" }}
          >
            {title}
          </h2>
          <p
            className="mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--color-news-subtitle)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* News Grid */}
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

      {/* Error Message */}
      {error && <p className="mt-6 text-center text-red-500">{error}</p>}

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
    </section>
  );
};

export default LatestNews;
