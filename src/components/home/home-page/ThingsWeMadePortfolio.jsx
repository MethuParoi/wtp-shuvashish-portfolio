"use client";
import React, { useState } from "react";

const ThingsWeMadePortfolio = ({
  title = "Things we Made",
  subtitle = "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra.",
  projects = [
    {
      id: 1,
      image: "/portfolio-creative-woman.jpg",
      title: "Creative Design",
      category: "Branding",
      type: "large",
      position: "top-left",
    },
    {
      id: 2,
      image: "/portfolio-business-call.jpg",
      title: "Business Communication",
      category: "Marketing",
      type: "medium",
      position: "top-center",
    },
    {
      id: 3,
      image: "/portfolio-creative-tools.jpg",
      title: "Creative Tools",
      category: "Design",
      type: "medium",
      position: "top-right",
    },
    {
      id: 4,
      image: "/portfolio-beauty-product.jpg",
      title: "Beauty Product",
      category: "Photography",
      type: "large",
      position: "bottom-left",
    },
  ],
  ctaTitle = "Got any projects in mind? Don't hesitate to get in touch with us!",
  ctaButtonText = "Get Started",
  viewAllText = "View All Projects",
  className = "",
}) => {
  // Arrow Icon for buttons
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

  // Geometric Decoration Component - Exact Match
  const GeometricDecoration = () => (
    <div className="pointer-events-none absolute top-8 left-8 z-0 lg:top-16 lg:left-16">
      <svg
        className="h-40 w-40 lg:h-48 lg:w-48"
        viewBox="0 0 200 200"
        fill="none"
      >
        {/* Main angular shapes matching the reference exactly */}
        <path
          d="M40 80 L80 20 L120 60 L100 100 L60 120 Z"
          stroke="#8b5cf6"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M80 20 L140 40 L160 80 L120 60 Z"
          stroke="#8b5cf6"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M100 100 L140 120 L120 160 L80 140 Z"
          stroke="#8b5cf6"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M20 120 L60 120 L40 160 L0 160 Z"
          stroke="#8b5cf6"
          strokeWidth="2"
          fill="none"
        />

        {/* Additional geometric lines */}
        <line
          x1="160"
          y1="80"
          x2="180"
          y2="60"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        <line
          x1="140"
          y1="120"
          x2="160"
          y2="140"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        <line
          x1="40"
          y1="160"
          x2="20"
          y2="180"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
      </svg>
    </div>
  );

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-24 lg:py-32 ${className}`}
      style={{ backgroundColor: "var(--color-portfolio-section-bg)" }}
    >
      {/* Geometric Decoration */}
      <GeometricDecoration />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl xl:text-7xl"
            style={{ color: "var(--color-portfolio-heading)" }}
          >
            {title}
          </h2>
          <p
            className="mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--color-portfolio-subtitle)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Portfolio Grid - Exact Layout Match */}
        <div className="mb-12">
          {/* Desktop Layout */}
          <div className="hidden h-[800px] gap-6 lg:grid lg:grid-cols-12 lg:grid-rows-2">
            {/* Creative Woman - Top Left Large */}
            <div className="group relative col-span-5 row-span-1 cursor-pointer overflow-hidden rounded-3xl">
              <div className="relative h-full w-full">
                <img
                  src={projects.image}
                  alt={projects.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: "var(--color-project-card-overlay)",
                  }}
                ></div>

                <div className="absolute inset-0 bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/20"></div>

                <div className="absolute bottom-8 left-8">
                  <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-medium tracking-wider text-white uppercase backdrop-blur-sm">
                    {projects.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {projects.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Business Call - Top Center */}
            <div className="group relative col-span-4 row-span-1 cursor-pointer overflow-hidden rounded-3xl">
              <div className="relative h-full w-full">
                <img
                  src={projects.image}
                  alt={projects.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: "var(--color-project-card-overlay)",
                  }}
                ></div>

                <div className="absolute inset-0 bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/20"></div>

                <div className="absolute bottom-8 left-8">
                  <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-medium tracking-wider text-white uppercase backdrop-blur-sm">
                    {projects.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {projects.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Creative Tools - Top Right */}
            <div className="group relative col-span-3 row-span-1 cursor-pointer overflow-hidden rounded-3xl">
              <div className="relative h-full w-full">
                <img
                  src={projects.image}
                  alt={projects.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: "var(--color-project-card-overlay)",
                  }}
                ></div>

                <div className="absolute inset-0 bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/20"></div>

                <div className="absolute bottom-8 left-8">
                  <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-medium tracking-wider text-white uppercase backdrop-blur-sm">
                    {projects.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {projects.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Beauty Product - Bottom Left */}
            <div className="group relative col-span-5 row-span-1 cursor-pointer overflow-hidden rounded-3xl">
              <div className="relative h-full w-full">
                <img
                  src={projects.image}
                  alt={projects.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: "var(--color-project-card-overlay)",
                  }}
                ></div>

                <div className="absolute inset-0 bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/20"></div>

                <div className="absolute bottom-8 left-8">
                  <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-medium tracking-wider text-white uppercase backdrop-blur-sm">
                    {projects.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {projects.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* CTA Card - Bottom Right */}
            <div className="group col-span-7 row-span-1 cursor-pointer">
              <div
                className="relative flex h-full w-full flex-col items-center justify-center rounded-3xl p-12 text-center transition-all duration-500 hover:scale-105"
                style={{ backgroundColor: "var(--color-cta-card-bg)" }}
              >
                <div className="max-w-md space-y-8">
                  <h3
                    className="text-3xl leading-tight font-bold lg:text-4xl"
                    style={{ color: "var(--color-portfolio-cta-text)" }}
                  >
                    {ctaTitle}
                  </h3>

                  <button
                    className="inline-flex items-center space-x-3 rounded-full border-2 px-8 py-5 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-white hover:text-purple-600"
                    style={{
                      borderColor: "var(--color-cta-button-border)",
                      color: "var(--color-cta-button-text)",
                      backgroundColor: "var(--color-cta-button-bg)",
                    }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current">
                      <ArrowIcon />
                    </div>
                    <span>{ctaButtonText}</span>
                  </button>
                </div>

                {/* Background decorative elements */}
                <div className="pointer-events-none absolute inset-0 opacity-10">
                  <div className="absolute top-8 right-8 h-16 w-16 rounded-full border border-white"></div>
                  <div className="absolute bottom-12 left-12 h-8 w-8 border border-white"></div>
                  <div className="absolute top-1/3 left-8 h-4 w-4 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="space-y-6 lg:hidden">
            {/* Mobile Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl md:h-96 md:rounded-3xl"
                >
                  <div className="relative h-full w-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundColor: "var(--color-project-card-overlay)",
                      }}
                    ></div>

                    <div className="absolute inset-0 bg-purple-500/0 transition-all duration-300 group-hover:bg-purple-500/20"></div>

                    <div className="absolute bottom-6 left-6">
                      <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-wider text-white uppercase backdrop-blur-sm">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-white md:text-2xl">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile CTA Card */}
            <div className="md:col-span-2">
              <div
                className="relative flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 md:min-h-[350px] md:rounded-3xl md:p-12"
                style={{ backgroundColor: "var(--color-cta-card-bg)" }}
              >
                <div className="space-y-6 md:space-y-8">
                  <h3
                    className="text-2xl leading-tight font-bold md:text-3xl"
                    style={{ color: "var(--color-portfolio-cta-text)" }}
                  >
                    {ctaTitle}
                  </h3>

                  <button
                    className="inline-flex items-center space-x-3 rounded-full border-2 px-6 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:bg-white hover:text-purple-600 md:px-8 md:py-5 md:text-lg"
                    style={{
                      borderColor: "var(--color-cta-button-border)",
                      color: "var(--color-cta-button-text)",
                      backgroundColor: "var(--color-cta-button-bg)",
                    }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current">
                      <ArrowIcon />
                    </div>
                    <span>{ctaButtonText}</span>
                  </button>
                </div>

                {/* Background decorative elements */}
                <div className="pointer-events-none absolute inset-0 opacity-10">
                  <div className="absolute top-6 right-6 h-12 w-12 rounded-full border border-white"></div>
                  <div className="absolute bottom-8 left-8 h-6 w-6 border border-white"></div>
                  <div className="absolute top-1/3 left-6 h-3 w-3 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <button
            className="rounded-full border-2 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 md:px-12 md:py-5"
            style={{
              borderColor: "var(--color-view-all-border)",
              color: "var(--color-view-all-text)",
              backgroundColor: "var(--color-view-all-bg)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-view-all-hover)";
              e.currentTarget.style.borderColor = "var(--color-view-all-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-view-all-bg)";
              e.currentTarget.style.borderColor =
                "var(--color-view-all-border)";
            }}
          >
            {viewAllText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ThingsWeMadePortfolio;
