"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-me" },
    { name: "Education", href: "/education" },
    { name: "Testimonial", href: "/testimonial" },
    { name: "Article", href: "/article" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="bg-gray-900 text-white px-6 py-3 font-bold text-lg">
            RALPH
            <br />
            EDWARDS.
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`text-gray-700 hover:text-secondary font-medium transition-colors ${
                  item.name === "Contact"
                    ? "bg-primary hover:bg-primary-hover text-gray-900 px-4 py-2 rounded"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 bg-primary hover:bg-primary-hover rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
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
          <div className="md:hidden py-4 border-t">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block py-3 text-gray-700 hover:text-secondary font-medium transition-colors"
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