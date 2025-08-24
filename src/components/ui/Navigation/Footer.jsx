"use client";
import React, { useState } from "react";

const Footer = ({
  brandName = "Optimistx",
  brandTagline = "digital agency",
  contactInfo = {
    address: {
      heading: "Company Name",
      text: "Plaza XYZ Street, XYZ City, XYZ",
    },
    email: {
      heading: "Email Us",
      text: "yourname@email.com",
    },
    phone: {
      heading: "Phone Number",
      text: "123-4567-890",
    },
  },
  newsletterText = "Subscribe Our newsletter",
  getStartedText = "Get Started",
  copyrightText = "Copyright © 2024 Optimistx By Evonicmedia. All Rights Reserved.",
  socialLinks = [
    { name: "Facebook", icon: "facebook", href: "https://facebook.com" },
    { name: "Instagram", icon: "instagram", href: "https://instagram.com" },
    { name: "Twitter", icon: "twitter", href: "https://twitter.com" },
    { name: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" },
  ],
  onNewsletterSubmit = null, // Function to handle newsletter subscription
  className = "",
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) {
      alert("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      if (onNewsletterSubmit) {
        await onNewsletterSubmit(newsletterEmail);
      } else {
        // Default behavior
        console.log("Newsletter subscription:", newsletterEmail);
        alert("Thank you for subscribing to our newsletter!");
        setNewsletterEmail("");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      alert("Error subscribing to newsletter. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social Media Icons
  const SocialIcon = ({ icon }) => {
    const iconMap = {
      facebook: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      instagram: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      twitter: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      linkedin: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    };
    return iconMap[icon] || iconMap.facebook;
  };

  // Contact Info Icons
  const ContactIcon = ({ type }) => {
    const iconMap = {
      home: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      email: (
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
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      phone: (
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
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    };
    return iconMap[type];
  };

  return (
    <footer
      className={`relative ${className}`}
      style={{ backgroundColor: "var(--color-footer-bg)" }}
    >
      {/* Top Border */}
      <div
        className="h-px w-full"
        style={{ backgroundColor: "var(--color-footer-border-top)" }}
      ></div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Section - Brand + Contact Info */}
          <div className="space-y-8 lg:col-span-7">
            {/* Brand Section */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span
                  className="text-3xl font-bold md:text-4xl"
                  style={{ color: "var(--color-footer-brand-primary)" }}
                >
                  Optimist
                </span>
                <span
                  className="ml-1 text-3xl font-bold md:text-4xl"
                  style={{ color: "var(--color-footer-brand-secondary)" }}
                >
                  x
                </span>
              </div>
              <span
                className="text-sm tracking-wider uppercase opacity-80"
                style={{ color: "var(--color-footer-tagline)" }}
              >
                {brandTagline}
              </span>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2"
                  style={{ borderColor: "var(--color-footer-contact-heading)" }}
                >
                  <ContactIcon type="home" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className="mb-2 text-lg font-semibold"
                    style={{ color: "var(--color-footer-contact-heading)" }}
                  >
                    {contactInfo.address.heading}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-footer-contact-text)" }}
                  >
                    {contactInfo.address.text}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2"
                  style={{ borderColor: "var(--color-footer-contact-heading)" }}
                >
                  <ContactIcon type="email" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className="mb-2 text-lg font-semibold"
                    style={{ color: "var(--color-footer-contact-heading)" }}
                  >
                    {contactInfo.email.heading}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-footer-contact-text)" }}
                  >
                    {contactInfo.email.text}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2"
                  style={{ borderColor: "var(--color-footer-contact-heading)" }}
                >
                  <ContactIcon type="phone" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className="mb-2 text-lg font-semibold"
                    style={{ color: "var(--color-footer-contact-heading)" }}
                  >
                    {contactInfo.phone.heading}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-footer-contact-text)" }}
                  >
                    {contactInfo.phone.text}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Newsletter + Social */}
          <div className="space-y-8 lg:col-span-5">
            {/* Newsletter Subscription */}
            <div className="space-y-6">
              <h4
                className="text-lg font-semibold"
                style={{ color: "var(--color-newsletter-text)" }}
              >
                {newsletterText}
              </h4>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full border-0 border-b-2 bg-transparent px-0 py-3 text-base transition-all duration-300 focus:outline-none"
                    style={{
                      color: "var(--color-newsletter-input-text)",
                      borderBottomColor: "var(--color-newsletter-border)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottomColor =
                        "var(--color-newsletter-border-focus)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottomColor =
                        "var(--color-newsletter-border)";
                    }}
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    backgroundColor: "var(--color-get-started-bg)",
                    color: "var(--color-get-started-text)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor =
                        "var(--color-get-started-bg-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor =
                        "var(--color-get-started-bg)";
                    }
                  }}
                >
                  {isSubmitting ? "Subscribing..." : getStartedText}
                </button>
              </form>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                  style={{ color: "var(--color-social-icon)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      "var(--color-social-icon-hover)";
                    e.currentTarget.style.backgroundColor =
                      "var(--color-social-bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-social-icon)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  aria-label={social.name}
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="text-center">
            <p
              className="text-sm"
              style={{ color: "var(--color-footer-copyright)" }}
            >
              {copyrightText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
