"use client";
import Image from "next/image";
import React from "react";
import img from "../../../../public/landing-page/digital-solution.png";

const DigitalSolutionsServices = ({
  title = "We Provide Amazing Digital Solutions",
  subtitle = "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit.",
  services = [
    {
      id: 1,
      title: "Social Media Marketing",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      icon: "megaphone",
      color: "purple",
      size: "small",
    },
    {
      id: 2,
      title: "Creative Solutions",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      icon: "lightbulb",
      color: "cyan",
      size: "small",
    },
    {
      id: 3,
      title: "Boost Traffic & Sales",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      icon: "chart",
      color: "blue",
      size: "large",
      hasImage: true,
      image: "/analytics-chart.png",
    },
    {
      id: 4,
      title: "SEO Optimization",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      icon: "search",
      color: "yellow",
      size: "small",
    },
    {
      id: 5,
      title: "Brand Identity",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      icon: "trophy",
      color: "pink",
      size: "small",
    },
  ],
  className = "",
}) => {
  // Icon Components
  const ServiceIcon = ({ icon, className = "w-12 h-12 md:w-16 md:h-16" }) => {
    const icons = {
      megaphone: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
      lightbulb: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      chart: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      ),
      search: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      trophy: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    };
    return icons[icon] || icons.lightbulb;
  };

  // Arrow Icon
  const ArrowIcon = () => (
    <svg
      className="h-5 w-5"
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

  // Get card colors
  const getCardColors = (color) => {
    const colorMap = {
      purple: {
        bg: "var(--color-card-purple)",
        hover: "var(--color-card-purple-hover)",
      },
      cyan: {
        bg: "var(--color-card-cyan)",
        hover: "var(--color-card-cyan-hover)",
      },
      blue: {
        bg: "var(--color-card-blue)",
        hover: "var(--color-card-blue-hover)",
      },
      yellow: {
        bg: "var(--color-card-yellow)",
        hover: "var(--color-card-yellow-hover)",
      },
      pink: {
        bg: "var(--color-card-pink)",
        hover: "var(--color-card-pink-hover)",
      },
    };
    return colorMap[color] || colorMap.purple;
  };

  // Decorative Arrows Component
  const DecorativeArrows = () => (
    <div className="pointer-events-none absolute top-8 right-8 hidden lg:block">
      <div className="relative">
        {/* Arrow pointing to boost traffic card */}
        <svg
          className="h-20 w-32"
          viewBox="0 0 128 80"
          fill="none"
          style={{ color: "var(--color-arrow-accent)" }}
        >
          {/* Main arrow path */}
          <path
            d="M10 40 L100 10 L90 15 M100 10 L95 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M20 60 L110 30 L100 35 M110 30 L105 40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
      </div>
    </div>
  );

  return (
    <section
      className={`relative py-16 md:pt-24 lg:pt-32 ${className}`}
      style={{ backgroundColor: "var(--color-services-bg)" }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Decorative Arrows */}
        <DecorativeArrows />

        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ color: "var(--color-services-heading)" }}
          >
            {title}
          </h2>
          <p
            className="mx-auto max-w-4xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--color-services-subtitle)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Service Cards */}
          {services.map((service, index) => {
            const colors = getCardColors(service.color);
            const isLarge = service.size === "large";

            return (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl md:p-8 lg:rounded-3xl ${
                  isLarge
                    ? "min-h-[400px] lg:col-span-5 lg:row-span-2 lg:min-h-[500px]"
                    : "min-h-[280px] md:min-h-[320px] lg:col-span-3"
                } `}
                style={{ backgroundColor: colors.bg }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.bg;
                }}
              >
                {/* Card Content */}
                <div className="relative z-10 flex h-full flex-col">
                  {/* Icon */}
                  <div className="mb-6 lg:mb-8">
                    <ServiceIcon
                      icon={service.icon}
                      className={`${isLarge ? "h-16 w-16 lg:h-20 lg:w-20" : "h-12 w-12 lg:h-16 lg:w-16"} text-white`}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className={`mb-4 leading-tight font-bold ${
                      isLarge
                        ? "text-2xl lg:text-3xl xl:text-4xl"
                        : "text-xl lg:text-2xl"
                    }`}
                    style={{ color: "var(--color-services-card-text)" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`mb-8 flex-grow leading-relaxed opacity-90 ${
                      isLarge ? "text-base lg:text-lg" : "text-sm lg:text-base"
                    }`}
                    style={{ color: "var(--color-services-card-text)" }}
                  >
                    {service.description}
                  </p>

                  {/* Action Button */}
                  {isLarge ? (
                    // Get Started button for large card
                    <button className="group inline-flex items-center space-x-3 self-start rounded-full border-2 border-white px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-current">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current">
                        <ArrowIcon />
                      </div>
                      <span>Get Started</span>
                    </button>
                  ) : (
                    // View Detail button for regular cards
                    <button
                      className="self-start rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: "var(--color-btn-dark)",
                        color: "white",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--color-btn-dark-hover)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--color-btn-dark)";
                      }}
                    >
                      View Detail
                    </button>
                  )}

                  {/* Analytics Image for Boost Traffic card */}
                  {service.hasImage && (
                    <div className="right-6 bottom-20 hidden h-24 w-32 lg:absolute lg:right-[-20px] lg:bottom-[20rem] lg:block lg:h-[15rem] lg:w-[29rem]">
                      <Image
                        src={img}
                        alt="Analytics Chart"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:rounded-3xl"></div>
              </div>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="text-center">
          <button
            className="rounded-full border-2 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 md:px-12 md:py-5"
            style={{
              borderColor: "var(--color-btn-outline)",
              color: "var(--color-services-heading)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-btn-outline)";
              e.currentTarget.style.borderColor = "var(--color-btn-outline)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "var(--color-btn-outline)";
            }}
          >
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default DigitalSolutionsServices;
