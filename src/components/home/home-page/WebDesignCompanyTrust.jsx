"use client";
import React from "react";

const WebDesignCompanyTrust = ({
  title = "Web Design Company That You Can Trust",
  subtitle = "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra.",
  features = [
    {
      id: 1,
      title: "Competitive Rates",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      type: "dark",
    },
    {
      id: 2,
      title: "Premium Development",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      type: "featured",
    },
    {
      id: 3,
      title: "No Contract Needed",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      type: "dark",
    },
  ],
  teamImage = "/landing-page/developer-company.jpg",
  getStartedText = "Get Started",
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

  // Star Shape Component
  const StarShape = () => (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  // Floating Decorative Elements
  const FloatingElements = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large Gradient Orb - Top Right */}
      <div
        className="absolute top-12 right-20 h-24 w-24 animate-pulse rounded-full opacity-80"
        style={{
          background: "var(--color-floating-orb-1)",
        }}
      ></div>

      {/* Small Yellow Dot */}
      <div
        className="absolute top-32 right-32 h-3 w-3 animate-bounce rounded-full"
        style={{
          backgroundColor: "var(--color-floating-orb-2)",
          animationDelay: "0.5s",
        }}
      ></div>

      {/* Pink Star - Bottom of Team Image */}
      <div
        className="animate-spin-slow absolute right-1/3 bottom-20"
        style={{ color: "var(--color-star-accent)" }}
      >
        <StarShape />
      </div>

      {/* Additional small decorative dots */}
      <div
        className="absolute top-1/4 right-12 h-2 w-2 rounded-full opacity-60"
        style={{ backgroundColor: "var(--color-floating-orb-2)" }}
      ></div>
    </div>
  );

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-16 lg:py-16 ${className}`}
      style={{ backgroundColor: "var(--color-trust-section-bg)" }}
    >
      {/* Floating Decorative Elements */}
      <FloatingElements />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="order-2 space-y-8 lg:order-1">
            {/* Header */}
            <div className="space-y-6">
              <h2
                className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl"
                style={{ color: "var(--color-trust-heading)" }}
              >
                {title}
              </h2>

              <p
                className="text-lg leading-relaxed md:text-xl"
                style={{ color: "var(--color-trust-subtitle)" }}
              >
                {subtitle}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group rounded-2xl p-6 transition-all duration-300 hover:scale-105 md:p-8 ${
                    feature.type === "featured"
                      ? "shadow-2xl hover:shadow-blue-500/20"
                      : "border hover:shadow-xl"
                  } `}
                  style={{
                    backgroundColor:
                      feature.type === "featured"
                        ? "var(--color-card-blue)"
                        : "var(--color-card-dark)",
                    borderColor:
                      feature.type === "featured"
                        ? "transparent"
                        : "var(--color-card-dark-border)",
                  }}
                  onMouseEnter={(e) => {
                    if (feature.type === "featured") {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-card-blue-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (feature.type === "featured") {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-card-blue)";
                    }
                  }}
                >
                  <h3
                    className="mb-4 text-xl font-bold md:text-2xl"
                    style={{ color: "var(--color-trust-card-text)" }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed opacity-90 md:text-base"
                    style={{ color: "var(--color-trust-card-subtitle)" }}
                  >
                    {feature.description}
                  </p>

                  {/* Featured card gradient overlay */}
                  {feature.type === "featured" && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-card-purple), transparent)",
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Get Started Button */}
            <div className="pt-4">
              <button
                className="group inline-flex items-center space-x-3 rounded-full border-2 px-6 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 md:px-8 md:py-5 md:text-lg"
                style={{
                  borderColor: "var(--color-btn-get-started-cyan)",
                  color: "var(--color-btn-get-started-cyan)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-btn-get-started-cyan)";
                  e.currentTarget.style.color = "var(--color-trust-section-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color =
                    "var(--color-btn-get-started-cyan)";
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current transition-all duration-300">
                  <ArrowIcon />
                </div>
                <span>{getStartedText}</span>
              </button>
            </div>
          </div>

          {/* Right Content - Team Image */}
          <div className="relative order-1 lg:order-2">
            {/* Main Image Container */}
            <div className="relative">
              {/* Team Meeting Image */}
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={teamImage}
                  alt="Professional team meeting"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-80 lg:h-96 xl:h-[500px]"
                />

                {/* Image Overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>

              {/* Floating Image Elements */}
              <div className="absolute -right-4 -bottom-4 h-16 w-16 animate-pulse rounded-full bg-purple-500 opacity-80"></div>
              <div
                className="absolute -top-4 -left-4 h-8 w-8 animate-bounce rounded-full bg-cyan-400 opacity-70"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Background Glow Effect */}
            <div className="absolute -inset-8 -z-10">
              <div
                className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-card-blue), var(--color-card-purple))",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for slow spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default WebDesignCompanyTrust;
