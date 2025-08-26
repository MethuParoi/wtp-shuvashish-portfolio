"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewsCard = ({ newsItem, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const {
    id,
    slug,
    publishedAt = "April 17, 2024",
    title = "Simple Ways To Optimize Your Website For SEO",
    featuredImage = "/news-placeholder.jpg",
    readMoreText = "Read More",
    link = "#",
  } = newsItem;

  // Format publishedAt if it's an ISO string
  let formattedDate = publishedAt;
  if (/^\d{4}-\d{2}-\d{2}T/.test(publishedAt)) {
    formattedDate = publishedAt.slice(0, 10);
  }
  // Arrow Icon for Read More button
  const ArrowIcon = () => (
    <svg
      className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 ${className} `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="relative h-80 w-full lg:h-96">
        <img
          src={featuredImage}
          alt={title}
          className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
        />

        {/* Default Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        ></div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"} `}
          style={{
            background:
              "linear-gradient(to bottom, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.6) 100%)",
          }}
        ></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* publishedAt */}
        <div className="mb-4">
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ${isHovered ? "scale-110" : ""} `}
            style={{
              backgroundColor: "var(--color-news-card-date)",
              color: "#000000",
            }}
          >
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`mb-6 text-xl leading-tight font-bold transition-all duration-300 md:text-2xl lg:text-3xl ${isHovered ? "translate-y-[-4px] transform" : ""} `}
          style={{ color: "var(--color-news-card-title)" }}
        >
          {title}
        </h3>

        {/* Read More Button */}
        <button
          className={`group inline-flex cursor-pointer items-center self-start rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 ${isHovered ? "translate-y-[-4px] transform" : ""} `}
          style={{
            backgroundColor: isHovered
              ? "var(--color-news-read-more-hover)"
              : "var(--color-news-read-more-hover)",
            color: "var(--color-news-read-more-text)",
          }}
          onClick={() => router.push(`/blog/${slug}`)}
        >
          <span className="">{readMoreText}</span>
          <ArrowIcon />
        </button>
      </div>

      {/* Glow Effect on Hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
    </div>
  );
};

export default NewsCard;
