// components/LatestNews.js
import React from "react";
import NewsCard from "./NewsCard";

const LatestNews = ({
  title = "Latest News",
  subtitle = "Lorem ipsum dolor sit amet consectetur. In nulla nunc arcu velit consectetur massa mauris molestiae hac.",
  newsItems = [
    {
      id: 1,
      date: "April 17, 2024",
      title: "Simple Ways To Optimize Your Website For SEO",
      image: "/news-couple-laptop.jpg", // Couple working on laptop
      readMoreText: "Read More",
      link: "/news/seo-optimization-tips",
    },
    {
      id: 2,
      date: "April 17, 2024",
      title: "Simple Ways To Optimize Your Website For SEO",
      image: "/news-analytics-dashboard.jpg", // Analytics dashboard with charts
      readMoreText: "Read More",
      link: "/news/website-analytics-guide",
    },
    {
      id: 3,
      date: "April 17, 2024",
      title: "Simple Ways To Optimize Your Website For SEO",
      image: "/news-team-video-call.jpg", // Team video conference call
      readMoreText: "Read More",
      link: "/news/remote-team-collaboration",
    },
  ],
  className = "",
}) => {
  return (
    <section
      className={`relative overflow-hidden pb-16 ${className}`}
      style={{ backgroundColor: "var(--color-news-section-bg)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          {newsItems.map((newsItem, index) => (
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
};

export default LatestNews;
