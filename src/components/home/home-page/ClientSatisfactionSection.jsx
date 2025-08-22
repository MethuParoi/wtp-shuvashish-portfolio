"use client";
import Image from "next/image";
import React from "react";

const ClientSatisfactionSection = ({
  mainHeading = "Our main goal to satisfied local clients",
  accentText = "Ad nec unum copiosae. Sea ex everti labores, ad option iuvaret qui muva.",
  bodyText = "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio. Aliquam tincidunt sed est at ultrices. Nibh a egestas scelerisque mauris porta. Leo leo in duis pulvinar magnis venenatis faucibus malesuada.",
  tags = [
    "Thinking",
    "Analyzing",
    "Dependable",
    "Development",
    "Searching Solution",
  ],

  getStartedText = "Get Started",
  learnMoreText = "Learn More",
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

  // Animated Wave SVG Component
  const AnimatedWave = () => (
    <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden">
      <svg
        className="relative h-32 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main wave path */}
        <path
          d="M0,60 C150,90 300,30 450,60 C600,90 750,30 900,60 C1050,90 1200,30 1200,60 L1200,120 L0,120 Z"
          fill="none"
          stroke="var(--color-wave-purple)"
          strokeWidth="3"
          filter="url(#glow)"
          className="animate-wave"
        />

        {/* Secondary wave for depth */}
        <path
          d="M0,80 C150,50 300,110 450,80 C600,50 750,110 900,80 C1050,50 1200,110 1200,80 L1200,120 L0,120 Z"
          fill="none"
          stroke="var(--color-wave-purple)"
          strokeWidth="2"
          opacity="0.6"
          filter="url(#glow)"
          className="animate-wave-reverse"
        />
      </svg>
    </div>
  );

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-24 lg:py-32 ${className}`}
      style={{ backgroundColor: "var(--color-section-bg)" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="order-2 space-y-8 lg:order-1">
            {/* Main Heading */}
            <div className="space-y-6">
              <h2
                className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl"
                style={{ color: "var(--color-heading-primary)" }}
              >
                {mainHeading}
              </h2>

              {/* Accent Text */}
              <p
                className="text-lg leading-relaxed font-medium md:text-xl lg:text-2xl"
                style={{ color: "var(--color-heading-accent)" }}
              >
                {accentText}
              </p>
            </div>

            {/* Body Text */}
            <p
              className="max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--color-text-body)" }}
            >
              {bodyText}
            </p>

            {/* Tags/Skills */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="cursor-default rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 md:px-6 md:py-3 md:text-base"
                  style={{
                    borderColor: "var(--color-tag-border)",
                    color: "var(--color-tag-text)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "var(--color-tag-hover)";
                    e.target.style.backgroundColor = "var(--color-tag-hover)";
                    e.target.style.color = "var(--color-heading-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "var(--color-tag-border)";
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "var(--color-tag-text)";
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row md:gap-6">
              {/* Get Started Button */}
              <button
                className="group inline-flex items-center justify-center space-x-3 rounded-full border-2 px-6 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 md:px-8 md:py-5 md:text-lg"
                style={{
                  borderColor: "var(--color-btn-get-started)",
                  color: "var(--color-btn-get-started)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-btn-get-started)";
                  e.currentTarget.style.color = "var(--color-section-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-btn-get-started)";
                }}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300"
                  style={{ borderColor: "currentColor" }}
                >
                  <ArrowIcon />
                </div>
                <span>{getStartedText}</span>
              </button>

              {/* Learn More Button */}
              <button
                className="rounded-full px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:px-8 md:py-5 md:text-lg"
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
            </div>
          </div>

          {/* Right Content - Team Image */}
          <div className="relative order-1 lg:order-2">
            {/* Main Image Container */}
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl md:rounded-3xl">
              <Image
                src="/landing-page/main-goal.jpg"
                alt="Team collaboration"
                width={1200}
                height={480}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-80 lg:h-96 xl:h-[480px]"
              />

              {/* Image Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 h-8 w-8 animate-pulse rounded-full bg-purple-500 opacity-80"></div>
              <div
                className="absolute -bottom-6 -left-6 h-12 w-12 animate-bounce rounded-full bg-cyan-400 opacity-60"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -inset-4 -z-10">
              {/* Background Glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-20 blur-2xl"
                style={{ backgroundColor: "var(--color-wave-purple)" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Wave Decoration */}
      <AnimatedWave />

      {/* Custom CSS for wave animations */}
      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: translateX(0px) translateZ(0);
          }
          50% {
            transform: translateX(-25px) translateZ(0);
          }
        }

        @keyframes wave-reverse {
          0%,
          100% {
            transform: translateX(0px) translateZ(0);
          }
          50% {
            transform: translateX(25px) translateZ(0);
          }
        }

        .animate-wave {
          animation: wave 4s ease-in-out infinite;
        }

        .animate-wave-reverse {
          animation: wave-reverse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientSatisfactionSection;
