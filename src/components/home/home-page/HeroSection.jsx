"use client";
import React, { useState } from "react";

const DigitalMarketingHero = ({
  mainTitle = "ELEVATE YOUR BUSINESS",
  subtitle = "with Our Cutting-Edge Digital Marketing",
  auditPlaceholder = "Audit your website",
  primaryButtonText = "Audit",
  getStartedText = "Get Started",
  watchVideoText = "Watch Video",
  phoneNumber = "123-45678-90",
  email = "info@name.com",
  heroImage = "/hero/hero-women.png", // Woman with hat and phone
  phoneImage = "/hero/phone.png", // Phone showing app/website
  className = "",
}) => {
  const [auditInput, setAuditInput] = useState("");

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

  // Floating Shapes Component
  const FloatingShapes = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large gradient circles */}
      <div
        className="absolute top-10 right-20 h-32 w-32 rounded-full opacity-80"
        style={{
          background:
            "linear-gradient(135deg, var(--color-vibrant-purple), var(--color-vibrant-pink))",
        }}
      ></div>

      <div
        className="absolute right-40 bottom-32 h-24 w-24 rounded-full opacity-70"
        style={{
          background:
            "linear-gradient(135deg, var(--color-vibrant-cyan), var(--color-vibrant-green))",
        }}
      ></div>

      {/* Small accent shapes */}
      <div
        className="absolute top-32 right-60 h-4 w-4 rounded-full"
        style={{ backgroundColor: "var(--color-vibrant-yellow)" }}
      ></div>

      <div
        className="absolute top-20 right-80 h-2 w-2 rounded-full"
        style={{ backgroundColor: "var(--color-vibrant-orange)" }}
      ></div>

      {/* Chart/Graph element */}
      <div className="absolute top-40 right-16 flex h-16 w-16 items-center justify-center rounded-lg bg-yellow-400">
        <div className="relative h-8 w-8 rounded-full bg-yellow-500">
          <div
            className="absolute -top-1 -right-1 h-4 w-4 bg-orange-400"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${className}`}
      style={{ backgroundColor: "var(--color-dark-blue)" }}
    >
      {/* Floating Background Shapes */}
      <FloatingShapes />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid min-h-screen grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading with Gradient */}
            <div className="space-y-4">
              <h1 className="text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-vibrant-cyan), var(--color-vibrant-green))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ELEVATE
                </span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-vibrant-cyan), var(--color-vibrant-green))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  YOUR
                </span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-vibrant-cyan), var(--color-vibrant-green))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  BUSINESS
                </span>
              </h1>

              <p className="text-xl font-medium text-white md:text-2xl">
                {subtitle}
              </p>
            </div>

            {/* Audit Input Section */}
            <div className="space-y-6">
              <div className="flex max-w-lg flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={auditPlaceholder}
                    value={auditInput}
                    onChange={(e) => setAuditInput(e.target.value)}
                    className="w-full rounded-full border border-gray-700 bg-gray-800 px-6 py-4 text-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <button
                  className="transform rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-vibrant-purple), var(--color-vibrant-pink))",
                  }}
                >
                  {primaryButtonText}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-start gap-6 sm:flex-row">
                <button
                  className="flex items-center space-x-3 text-lg font-semibold transition-all hover:scale-105"
                  style={{ color: "var(--color-vibrant-cyan)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--color-vibrant-cyan)" }}
                  >
                    <svg
                      className="h-6 w-6 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                  <span>{getStartedText}</span>
                </button>

                <button
                  className="flex items-center space-x-3 text-lg font-semibold transition-all hover:scale-105"
                  style={{ color: "var(--color-vibrant-yellow)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2"
                    style={{ borderColor: "var(--color-vibrant-yellow)" }}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span>{watchVideoText}</span>
                </button>
              </div>
            </div>

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
                  {phoneNumber}
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
                  {email}
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4 pt-4">
              {[
                { icon: "facebook", color: "var(--color-vibrant-cyan)" },
                { icon: "instagram", color: "var(--color-vibrant-cyan)" },
                { icon: "twitter", color: "var(--color-vibrant-cyan)" },
                { icon: "linkedin", color: "var(--color-vibrant-cyan)" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-12 w-12 transform items-center justify-center rounded-full transition-all hover:scale-110"
                  style={{ backgroundColor: social.color }}
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative flex items-center justify-center">
            {/* Main Circular Background */}
            <div
              className="relative h-80 w-80 rounded-full md:h-96 md:w-96"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-vibrant-cyan), var(--color-gradient-blue))",
              }}
            >
              {/* Yellow accent shape */}
              <div
                className="absolute -top-4 -right-4 h-32 w-16 rounded-full"
                style={{ backgroundColor: "var(--color-vibrant-yellow)" }}
              ></div>

              {/* Woman Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={heroImage}
                  alt="Digital Marketing Professional"
                  className="h-80 w-64 rounded-full object-cover grayscale md:h-96 md:w-72"
                />
              </div>

              {/* Marketing Badge */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    DIGITAL MARKETING
                  </span>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="absolute top-1/2 -right-12 -translate-y-1/2 transform">
              <div
                className="h-64 w-32 rounded-3xl p-2 shadow-2xl"
                style={{ backgroundColor: "var(--color-vibrant-green)" }}
              >
                <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                  <img
                    src={phoneImage}
                    alt="Mobile App"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* SEO Badge on phone */}
                <div
                  className="absolute -top-2 -left-4 rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--color-vibrant-pink)" }}
                >
                  SEO
                </div>

                {/* Rating stars */}
                <div className="absolute -top-4 -right-8 rounded-lg bg-yellow-400 p-2">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-3 w-3 text-yellow-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketingHero;
