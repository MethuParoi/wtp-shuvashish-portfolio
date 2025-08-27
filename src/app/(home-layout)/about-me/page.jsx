"use client";
import React from "react";

const AboutSection = ({
  label = "GET TO KNOW ME",
  title = "Helping startups and businesses grow with data-driven marketing",
  paragraphs = [
    "I’m Shuvashish, a results-driven Digital Marketing Specialist and Business Analyst. I help brands improve their online presence, analyze business data, and create winning growth strategies.",
    "With expertise in SEO, Social Media Marketing, Paid Advertising, and Business Analytics, I provide consultancy that turns challenges into opportunities",
    "Along with my Web Development team, I also design high-performing, SEO-friendly websites—because your brand identity starts with your website.",
  ],
  buttonText = "Get In Touch",
  authorImage = "/author-reading.jpg",
  onButtonClick = null,
  className = "",
}) => {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      // Default behavior - scroll to contact section or open contact form
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Social Media Icons
  const SocialIcon = ({ icon, color = "#00ffff" }) => {
    const iconMap = {
      facebook: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      instagram: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      twitter: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      linkedin: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    };
    return iconMap[icon] || iconMap.facebook;
  };

  return (
    <section className={`py-16 md:py-24  ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left Content */}
          <div className="order-2 space-y-8 lg:order-1">
            {/* Label */}
            <div className="space-y-6">
              <span className="text-sm font-medium tracking-widest text-gray-300 uppercase">
                {label}
              </span>

              {/* Main Heading */}
              <h2
                className="text-3xl leading-tight font-light text-gray-50 md:text-4xl lg:text-5xl xl:text-6xl"
                style={{
                  fontFamily: "Georgia, serif",
                }}
              >
                {title}
              </h2>
            </div>

            {/* Body Paragraphs */}
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-gray-50 md:text-lg"
                  style={{
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Get In Touch */}
            <div className="pt-6">
              {/* Contact Information */}
              <div className="flex flex-col gap-6 pt-8 sm:flex-row">
                <div className="flex items-center space-x-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--color-vibrant-cyan)" }}
                  >
                    <svg
                      className="h-5 w-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-lg font-medium"
                    style={{ color: "var(--color-vibrant-cyan)" }}
                  >
                    +91 7980376007
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--color-vibrant-cyan)" }}
                  >
                    <svg
                      className="h-5 w-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-lg font-medium"
                    style={{ color: "var(--color-vibrant-cyan)" }}
                  >
                    shuvashishbs.work@gmail.com
                  </span>
                </div>
              </div>
              {/* Social Media Links */}
              <div className="flex space-x-4 pt-4">
                {[
                  {
                    icon: "facebook",
                    color: "var(--color-vibrant-cyan)",
                    link: "https://www.facebook.com/Shuvashish.Barman/",
                  },
                  {
                    icon: "twitter",
                    color: "var(--color-vibrant-cyan)",
                    link: "https://x.com/shuvashishbs",
                  },
                  {
                    icon: "linkedin",
                    color: "var(--color-vibrant-cyan)",
                    link: "https://www.linkedin.com/in/shuvashish-barman/",
                  },
                ].map((social, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(social.link, "_blank")}
                    className="flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full transition-all hover:scale-110"
                    style={{ backgroundColor: social.color }}
                  >
                    <SocialIcon icon={social.icon} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Author Image */}
          <div className="relative order-1 lg:order-2">
            {/* Main Image Container */}
            <div className="group relative">
              {/* Author Image */}
              <div className="relative overflow-hidden bg-gray-200">
                <img
                  src={authorImage}
                  alt="Author reading a book"
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{
                    aspectRatio: "4/5", // Portrait aspect ratio
                    filter: "grayscale(100%) contrast(1.1)",
                  }}
                />

                {/* Subtle Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: "var(--color-about-image-overlay)",
                  }}
                ></div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              </div>

              {/* Image Border/Frame Effect */}
              <div className="pointer-events-none absolute inset-0 border border-gray-200"></div>
            </div>

            {/* Decorative Elements */}
            <div className="pointer-events-none absolute -top-4 -right-4 hidden h-8 w-8 bg-gray-100 opacity-50 lg:block"></div>
            <div className="pointer-events-none absolute -bottom-4 -left-4 hidden h-6 w-6 bg-gray-200 opacity-30 lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
