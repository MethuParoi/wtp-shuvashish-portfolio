"use client";
import React, { useState, useEffect, useRef } from "react";
import TestimonialCard from "./TestimonialCard";

const ClientTestimonials = ({
  title = "What client says",
  subtitle = "Lorem ipsum dolor sit amet consectetur. In nulla nunc arcu velit consectetur massa mauris molestiae hac.",
  testimonials = [
    {
      id: 1,
      name: "Sofia Adam",
      role: "Graphic Designer",
      image: "/testimonial-sofia.jpg",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur. Nunc risus pellentesque vehicula etiam senean aliquam. Ac quam enim faucibus id lorem. Adipiscing vel sed aliquam enim et pretium aliquam mattis nulla. Nunc faucibus id lorem.",
    },
    {
      id: 2,
      name: "Indra Mullana",
      role: "Graphic Designer",
      image: "/testimonial-indra.jpg",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur. Nunc risus pellentesque vehicula etiam senean aliquam. Ac quam enim faucibus id lorem. Adipiscing vel sed aliquam enim et pretium aliquam mattis nulla. Nunc faucibus id lorem.",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Marketing Director",
      image: "/testimonial-sarah.jpg",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur. Nunc risus pellentesque vehicula etiam senean aliquam. Ac quam enim faucibus id lorem. Adipiscing vel sed aliquam enim et pretium aliquam mattis nulla. Nunc faucibus id lorem.",
    },
    {
      id: 4,
      name: "Mike Chen",
      role: "CEO & Founder",
      image: "/testimonial-mike.jpg",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur. Nunc risus pellentesque vehicula etiam senean aliquam. Ac quam enim faucibus id lorem. Adipiscing vel sed aliquam enim et pretium aliquam mattis nulla. Nunc faucibus id lorem.",
    },
    {
      id: 5,
      name: "Emma Wilson",
      role: "Product Manager",
      image: "/testimonial-emma.jpg",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur. Nunc risus pellentesque vehicula etiam senean aliquam. Ac quam enim faucibus id lorem. Adipiscing vel sed aliquam enim et pretium aliquam mattis nulla. Nunc faucibus id lorem.",
    },
  ],
  autoSlideInterval = 2000, // 2 seconds
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered && testimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const itemsPerView = isMobile ? 1 : 2;
          const maxIndex = testimonials.length - itemsPerView;
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, autoSlideInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, testimonials.length, autoSlideInterval, isMobile]);

  // Handle card hover
  const handleCardMouseEnter = (cardId) => {
    setHoveredCardId(cardId);
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setHoveredCardId(null);
    setIsHovered(false);
  };

  // Calculate transform for carousel
  const getTransformValue = () => {
    const cardWidth = isMobile ? 100 : 50; // Percentage width per card
    return `translateX(-${currentIndex * cardWidth}%)`;
  };

  // Create extended testimonials array for seamless loop
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials.slice(0, isMobile ? 1 : 2), // Add extra items for seamless loop
  ];

  return (
    <section
      className={`relative overflow-hidden py-20 ${className}`}
      style={{ backgroundColor: "var(--color-testimonials-section-bg)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ color: "var(--color-testimonials-heading)" }}
          >
            {title}
          </h2>
          <p
            className="mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--color-testimonials-subtitle)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div ref={containerRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: getTransformValue(),
                width: `${extendedTestimonials.length * (isMobile ? 100 : 50)}%`,
              }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  isHovered={hoveredCardId === testimonial.id}
                  onMouseEnter={() => handleCardMouseEnter(testimonial.id)}
                  onMouseLeave={handleCardMouseLeave}
                />
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({
              length: testimonials.length - (isMobile ? 0 : 1),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "scale-125 bg-blue-500"
                    : "bg-gray-600 hover:bg-gray-500"
                } `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
