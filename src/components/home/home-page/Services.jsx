"use client";
import React from "react";

const Services = ({
  title = "My Services",
  description = "I offer a comprehensive suite of digital marketing and web development services designed to elevate your brand's online presence and drive business growth.",
  steps = [
    {
      number: "01",
      title: "Digital Marketing Strategy ",
      description:
        "Boost your online visibility with tailored SEO strategies, social media marketing, PPC campaigns, and email marketing—designed to increase traffic, engagement, and ROI.",
      hasLightning: true,
    },
    {
      number: "02",
      title: "Business Analysis & Insights",
      description:
        "Get data-driven solutions with market research, competitor analysis, SQL-based reporting, and business process improvement for smarter decision-making.",
    },
    {
      number: "03",
      title: "Consultancy & Advisory",
      description:
        "I provide branding consultancy, digital transformation advisory, and growth strategy consulting for both startups and established businesses.",
    },
    {
      number: "04",
      title: "Website & Branding Solutions",
      description:
        "My Web Development team builds custom websites, e-commerce platforms that are UI/UX optimized, mobile-responsive, SEO-ready and performance-driven.",
    },
  ],
  className = "",
}) => {
  // Arrow Icon Component
  const ArrowIcon = () => (
    <svg
      className="h-6 w-6"
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

  // Video Icon Component
  const VideoIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.5 8.516L10.002 5.621V19.38L15.5 16.484c.808-.545 1.5-.955 1.5-1.97V10.486c0-1.015-.692-1.425-1.5-1.97z" />
      <path d="M8.002 19.38c1.318 0 2.263-.955 2.263-2.263V6.884c0-1.308-.945-2.263-2.263-2.263s-2.263.955-2.263 2.263v10.233c0 1.308.945 2.263 2.263 2.263z" />
    </svg>
  );

  // Lightning Bolt Component
  const LightningBolt = () => (
    <div className="absolute top-1/2 -left-12 hidden -translate-y-1/2 transform lg:block">
      <svg
        className="h-24 w-16"
        viewBox="0 0 64 96"
        fill="none"
        style={{ color: "var(--color-lightning)" }}
      >
        <path
          d="M25 2L15 35H30L20 70L50 25H35L45 2H25Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M28 2L18 35H33L23 70L53 25H38L48 2H28Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );

  return (
    <section
      className={`relative py-16 md:py-24 ${className}`}
      style={{ backgroundColor: "var(--color-dark-navy)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2
            className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl"
            style={{ color: "var(--color-text-primary-dark)" }}
          >
            {title}
          </h2>
          <p
            className="mx-auto max-w-4xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--color-text-secondary-dark)" }}
          >
            {description}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* Lightning Bolt (only for first card) */}
              {step.hasLightning && <LightningBolt />}

              {/* Step Card */}
              <div
                className="relative h-full overflow-hidden rounded-2xl border-2 p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "var(--color-card-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--color-card-border-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--color-card-border)";
                }}
              >
                {/* Step Number */}
                <div className="mb-6">
                  <span
                    className="text-6xl font-bold opacity-80 md:text-7xl"
                    style={{
                      color: "var(--color-step-number)",
                      WebkitTextStroke: "2px var(--color-step-number)",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-8 space-y-4">
                  <h3
                    className="text-xl font-bold md:text-2xl"
                    style={{ color: "var(--color-text-primary-dark)" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed md:text-base"
                    style={{ color: "var(--color-text-tertiary-dark)" }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Action Icons */}
                <div className="mt-auto flex items-center space-x-4">
                  {/* Arrow Button */}
                  <button
                    className="group flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-110"
                    style={{
                      borderColor: "var(--color-icon-cyan)",
                      color: "var(--color-icon-cyan)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-icon-cyan)";
                      e.currentTarget.style.color = "var(--color-dark-navy)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--color-icon-cyan)";
                    }}
                  >
                    <ArrowIcon />
                  </button>

                  {/* Video Button */}
                  {/* <button
                    className="group flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-110"
                    style={{
                      borderColor: "var(--color-icon-video)",
                      color: "var(--color-icon-video)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-icon-video)";
                      e.currentTarget.style.color = "var(--color-dark-navy)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--color-icon-video)";
                    }}
                  >
                    <VideoIcon />
                  </button> */}
                </div>

                {/* Hover Glow Effect */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
