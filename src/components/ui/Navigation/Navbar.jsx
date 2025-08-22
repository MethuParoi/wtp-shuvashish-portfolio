"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-me" },
    { name: "Service", href: "/service" },
    // { name: "Testimonial", href: "/testimonial" },
    { name: "Blogs", href: "/blogs" },
    { name: "Get Started", href: "/contact" },
  ];

  return (
    <header className="bg-dark-navy sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div
            className="block bg-clip-text px-6 py-3 text-lg font-bold text-transparent"
            style={{
              background:
                "linear-gradient(135deg, var(--color-vibrant-cyan), var(--color-vibrant-green))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SHUVASHISH
            <br />
            BARMAN
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`font-medium text-gray-200 transition-colors hover:text-gray-400 ${
                  item.name === "Get Started"
                    ? "rounded-lg border-2 border-teal-300 bg-transparent px-4 py-2 text-teal-300 hover:bg-teal-300 hover:text-gray-600"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="bg-primary hover:bg-primary-hover rounded p-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="bg-dark-navy absolute z-50 ml-[-15px] w-full border-t py-4 md:hidden">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="ml-4 block py-3 font-medium text-gray-200 transition-colors hover:text-gray-600"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;