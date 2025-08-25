"use client";
import React from "react";

const ProfessionalSEOAgency = ({
  title = "We Are Professional SEO Agency",
  subtitle = "Lorem ipsum dolor sit amet consectetur. In nulla nunc arcu velit consectetur massa mauris molestiae hac. Hac arcu amet nullam pellentesque. Urna eu suspendisse felis sodales sit non.",
  features = [
    {
      id: 1,
      number: "01",
      title: "Unique produktiskills",
      description: "",
    },
    {
      id: 2,
      number: "02",
      title: "Lorem prodit brand creetur",
      description: "",
    },
    {
      id: 3,
      number: "03",
      title: "In lorem erat brand creetur",
      description: "",
    },
  ],
  learnMoreText = "Learn More",
  getStartedText = "Get Started",
  mainPersonImage = "/seo-agency/seo-main-person.png",
  teamImage1 = "/seo-agency/seo-team-1.jpg",
  teamImage2 = "/seo-agency/seo-team-2.jpg",
  className = "",
}) => {
  // Arrow Icon for Get Started button
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

  // Purple Wave SVG Component - Exact Match
  const PurpleWave = () => (
    <div className="pointer-events-none absolute bottom-0 left-0 w-full">
      <svg
        className="h-32 w-full"
        viewBox="0 0 800 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 Q200,20 400,60 T800,60 L800,120 L0,120 Z"
          fill="var(--color-purple-wave)"
          opacity="0.3"
        />
        <path
          d="M0,80 Q200,40 400,80 T800,80 L800,120 L0,120 Z"
          fill="var(--color-purple-wave)"
          opacity="0.2"
        />
      </svg>
    </div>
  );

  return (
    <section
      className={`relative overflow-hidden pb-10 ${className}`}
      style={{ backgroundColor: "var(--color-seo-section-bg)" }}
    >
      {/* Purple Wave Background */}
      <PurpleWave />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content - Visual Elements */}
          <div className="relative order-2 lg:order-1">
            {/* Main Visual Container */}
            <div className="relative">
              {/* Green Circle Background with Main Person */}
              <div className="relative">
                <div
                  className="relative mx-auto h-[30rem] w-80 rounded-full lg:h-[40rem] lg:w-96"
                  style={{ backgroundColor: "var(--color-green-circle)" }}
                >
                  {/* Main Person Image */}
                  <div className="absolute inset-4 overflow-hidden rounded-full">
                    <img
                      src={mainPersonImage}
                      alt="SEO Professional"
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>
                </div>

                {/* Yellow Accent Dot */}
                <div
                  className="absolute top-16 right-16 h-6 w-6 animate-pulse rounded-full lg:top-20 lg:right-20"
                  style={{ backgroundColor: "var(--color-yellow-accent)" }}
                ></div>

                {/* Team Image 1 - Top Right */}
                <div className="absolute top-8 right-0 lg:top-12 lg:-right-8">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-xl lg:h-32 lg:w-32">
                    <img
                      src={teamImage1}
                      alt="Team collaboration"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Team Image 2 - Bottom Right */}
                <div className="absolute right-8 bottom-8 lg:right-4 lg:bottom-12">
                  <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-xl lg:h-36 lg:w-36">
                    <img
                      src={teamImage2}
                      alt="Team meeting"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Small Yellow Chart/Pie Icon */}
                <div className="absolute top-24 left-8 lg:top-32 lg:left-12">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg lg:h-16 lg:w-16"
                    style={{ backgroundColor: "var(--color-yellow-accent)" }}
                  >
                    <svg
                      className="h-6 w-6 text-gray-800 lg:h-8 lg:w-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 space-y-8 lg:order-2">
            {/* Header */}
            <div className="space-y-6">
              <h2
                className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl"
                style={{ color: "var(--color-seo-heading)" }}
              >
                {title}
              </h2>

              <p
                className="text-lg leading-relaxed md:text-xl"
                style={{ color: "var(--color-seo-subtitle)" }}
              >
                {subtitle}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={feature.id} className="flex items-center space-x-4">
                  {/* Feature Number */}
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 lg:h-14 lg:w-14"
                    style={{
                      borderColor: "var(--color-feature-number-border)",
                      backgroundColor: "var(--color-feature-number-bg)",
                    }}
                  >
                    <span
                      className="text-lg font-bold lg:text-xl"
                      style={{ color: "var(--color-feature-number-text)" }}
                    >
                      {feature.number}
                    </span>
                  </div>

                  {/* Feature Title */}
                  <h3
                    className="text-xl font-semibold lg:text-2xl"
                    style={{ color: "var(--color-seo-feature-text)" }}
                  >
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-6 pt-4 sm:flex-row">
              {/* Learn More Button */}
              <button
                className="rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:px-10 md:py-5"
                style={{
                  backgroundColor: "var(--color-btn-learn-more)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-btn-learn-more-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-btn-learn-more)";
                }}
              >
                {learnMoreText}
              </button>

              {/* Get Started Button */}
              <button
                className="group inline-flex items-center space-x-3 rounded-full border-2 px-6 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 md:px-8 md:py-5"
                style={{
                  borderColor: "var(--color-btn-get-started)",
                  color: "var(--color-btn-get-started)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-btn-get-started)";
                  e.currentTarget.style.color = "var(--color-seo-section-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-btn-get-started)";
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current transition-all duration-300">
                  <ArrowIcon />
                </div>
                <span>{getStartedText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSEOAgency;
