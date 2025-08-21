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
    <header className="bg-dark-navy sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="text-accent bg-gray-900 px-6 py-3 text-lg font-bold">
            RALPH
            <br />
            EDWARDS.
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`hover:text-secondary font-medium text-gray-700 transition-colors ${
                  item.name === "Contact"
                    ? "bg-primary hover:bg-primary-hover rounded px-4 py-2 text-gray-900"
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
          <div className="border-t py-4 md:hidden">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="hover:text-secondary block py-3 font-medium text-gray-700 transition-colors"
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