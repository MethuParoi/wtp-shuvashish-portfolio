"use client";
import React from "react";

const CompanyGrowthStats = ({
  title = "Our Company Growth",
  subtitle = "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra.",
  stats = [
    {
      id: 1,
      number: "3,460+",
      label: "Satisfied Clients",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      size: "medium",
    },
    {
      id: 2,
      number: "8,550+",
      label: "Successful Campaigns",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      size: "medium",
    },
    {
      id: 3,
      number: "1,286+",
      label: "Brands Joined",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      size: "medium",
    },
    {
      id: 4,
      number: "2,283+",
      label: "Brands Joined",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget etiam eu mauris gravida. Egestas ullamcorper dictum auctor hendrerit viverra. Tempus etiam laoreet pretium aliquam blandit. Diam lectus volutpat eu id purus odio.",
      size: "medium",
    },
  ],
  learnMoreText = "Learn More",
  watchVideoText = "Watch Video",
  className = "",
}) => {
  // Play Icon for Watch Video button
  const PlayIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  // Abstract Swirl Background Component
  const AbstractSwirlBackground = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient definitions */}
          <radialGradient id="purpleGradient" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--color-swirl-purple)"
              stopOpacity="0.6"
            />
            <stop
              offset="100%"
              stopColor="var(--color-swirl-purple)"
              stopOpacity="0.1"
            />
          </radialGradient>
          <radialGradient id="pinkGradient" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--color-swirl-pink)"
              stopOpacity="0.5"
            />
            <stop
              offset="100%"
              stopColor="var(--color-swirl-pink)"
              stopOpacity="0.1"
            />
          </radialGradient>
          <radialGradient id="blueGradient" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--color-swirl-blue)"
              stopOpacity="0.4"
            />
            <stop
              offset="100%"
              stopColor="var(--color-swirl-blue)"
              stopOpacity="0.1"
            />
          </radialGradient>
        </defs>

        {/* Main swirl shapes */}
        <path
          d="M200 400 Q400 100 600 400 T1000 400"
          stroke="url(#purpleGradient)"
          strokeWidth="120"
          fill="none"
          opacity="0.4"
          className="animate-pulse"
        />

        <path
          d="M100 500 Q500 200 800 500 T1100 300"
          stroke="url(#pinkGradient)"
          strokeWidth="100"
          fill="none"
          opacity="0.3"
          className="animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <path
          d="M300 600 Q600 300 900 600 T1200 400"
          stroke="url(#blueGradient)"
          strokeWidth="80"
          fill="none"
          opacity="0.2"
          className="animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Additional flowing elements */}
        <ellipse
          cx="200"
          cy="200"
          rx="100"
          ry="200"
          fill="url(#purpleGradient)"
          opacity="0.2"
          className="animate-float"
        />

        <ellipse
          cx="1000"
          cy="600"
          rx="150"
          ry="100"
          fill="url(#pinkGradient)"
          opacity="0.3"
          className="animate-float-reverse"
        />
      </svg>
    </div>
  );

  // Number Counter Animation Effect (simplified)
  const AnimatedNumber = ({ number }) => (
    <span className="animate-fade-in inline-block">{number}</span>
  );

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-24 lg:py-32 ${className}`}
      style={{ backgroundColor: "var(--color-growth-section-bg)" }}
    >
      {/* Abstract Swirl Background */}
      <AbstractSwirlBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ color: "var(--color-growth-heading)" }}
          >
            {title}
          </h2>
          <p
            className="mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--color-growth-subtitle)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => {
            const isLarge = stat.size === "large";

            return (
              <div
                key={stat.id}
                className={`group border-opacity-30 relative rounded-2xl border p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl md:p-8 lg:rounded-3xl ${
                  isLarge
                    ? "min-h-[320px] md:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-[400px]"
                    : "min-h-[280px] md:min-h-[300px]"
                } `}
                style={{
                  backgroundColor: "var(--color-stat-card-bg)",
                  borderColor: "var(--color-stat-card-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-stat-card-hover)";
                  e.currentTarget.style.borderColor =
                    "var(--color-swirl-purple)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-stat-card-bg)";
                  e.currentTarget.style.borderColor =
                    "var(--color-stat-card-border)";
                }}
              >
                {/* Card Content */}
                <div className="relative z-10 flex h-full flex-col justify-between">
                  {/* Stat Number and Label */}
                  <div className="mb-6">
                    <div
                      className={`mb-3 font-bold ${
                        isLarge
                          ? "text-4xl md:text-5xl lg:text-6xl"
                          : "text-3xl md:text-4xl lg:text-5xl"
                      }`}
                      style={{ color: "var(--color-growth-stat-number)" }}
                    >
                      <AnimatedNumber number={stat.number} />
                    </div>

                    <h3
                      className={`font-semibold ${
                        isLarge ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                      }`}
                      style={{ color: "var(--color-growth-stat-label)" }}
                    >
                      {stat.label}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="line-clamp-6 text-sm leading-relaxed opacity-80 md:text-base"
                    style={{ color: "var(--color-growth-description)" }}
                  >
                    {stat.description}
                  </p>
                </div>

                {/* Gradient Glow Effect on Hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:rounded-3xl"></div>

                {/* Border Glow Animation */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-30 lg:rounded-3xl">
                  <div
                    className="absolute inset-0 rounded-2xl lg:rounded-3xl"
                    style={{
                      background:
                        "linear-gradient(45deg, var(--color-swirl-purple), var(--color-swirl-pink), var(--color-swirl-blue), var(--color-swirl-purple))",
                      padding: "1px",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "exclude",
                      maskComposite: "exclude",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex cursor-pointer flex-col items-center justify-center gap-6 sm:flex-row">
          {/* Learn More Button */}
          <button
            className="rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:px-10 md:py-5"
            style={{
              backgroundColor: "var(--color-btn-learn-more)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-btn-learn-more-hover)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(139, 92, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-btn-learn-more)";
              e.currentTarget.style.boxShadow =
                "0 10px 20px rgba(0, 0, 0, 0.2)";
            }}
          >
            {learnMoreText}
          </button>

          {/* Watch Video Button */}
          {/* <button
            className="group inline-flex items-center space-x-4 rounded-full border-2 px-6 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 md:px-8 md:py-5"
            style={{
              backgroundColor: "var(--color-btn-watch-video)",
              color: "var(--color-btn-watch-video-text)",
              borderColor: "var(--color-btn-watch-video-border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-btn-watch-video-border)";
              e.currentTarget.style.color = "var(--color-growth-section-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-btn-watch-video)";
              e.currentTarget.style.color = "var(--color-btn-watch-video-text)";
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-current transition-all duration-300">
              <PlayIcon />
            </div>
            <span>{watchVideoText}</span>
          </button> */}
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-180deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default CompanyGrowthStats;
