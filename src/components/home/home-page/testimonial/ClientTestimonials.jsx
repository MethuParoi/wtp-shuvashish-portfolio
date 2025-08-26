"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ma-Az Bin Mahbub",
    program: "Sustainability Management and Technologies (M.Sc.)",
    university: "Technical University of Applied Sciences Ingolstadt",
    country: "Germany",
    image: "/testimonials/mahbub.jpg",
    rating: 5,
    text: "CareerRoam’s expert mentorship gave me the clarity and confidence to pursue a sustainability-focused master’s in Germany. From course shortlisting to statement of purpose, every step was made easier. I couldn’t have asked for better support!",
    year: "2027",
  },
  {
    id: 2,
    name: "Md Afif Rahman Shoron",
    program: "M.Sc. in Computer Science",
    university: "University of Passau",
    country: "Germany",
    image: "/testimonials/afif.jpg",
    rating: 5,
    text: "The entire admission journey felt smoother with CareerRoam by my side. They guided me through every detail — from selecting the right university to preparing for the visa. Now I’m thriving in a top CS program in Germany!",
    year: "2027",
  },
  {
    id: 3,
    name: "Mehidi Hasan",
    program: "Sustainability Management and Technologies (M.Sc.)",
    university: "Technical University of Applied Sciences Ingolstadt",
    country: "Germany",
    image: "/testimonials/mehedi.jpg",
    rating: 5,
    text: "Thanks to CareerRoam’s detailed guidance and structured timeline, I successfully made it to my dream master’s program in sustainability. Their mentorship truly shaped my European education journey.",
    year: "2027",
  },
  {
    id: 4,
    name: "Koushik Paul",
    program: "Bachelor in Engineering and Management",
    university: "Technical University of Applied Sciences Ingolstadt",
    country: "Germany",
    image: "/testimonials/koushik.jpg",
    rating: 5,
    text: "CareerRoam helped me transition smoothly from my home country to Germany. Their expert advice on course selection and practical tips for student life in Europe were invaluable!",
    year: "2027",
  },
  {
    id: 5,
    name: "Saikat Hossain",
    program: "M.Sc. in International Information Systems",
    university: "FAU Erlangen-Nürnberg",
    country: "Germany",
    image: "/testimonials/saikat.jpg",
    rating: 5,
    text: "CareerRoam’s guidance made my study abroad journey stress-free. From helping me shortlist the right programs to refining my SOP and preparing for the visa, their support was invaluable. Now I’m confidently pursuing my master’s in Germany.",
    year: "2027",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(400);
  const [gap, setGap] = useState(24);

  useEffect(() => {
    const updateItemWidth = () => {
      const width = window.innerWidth; // Get the current window width
      setItemWidth(width < 768 ? 320 : 400);
      setGap(width < 768 ? 16 : 24);
    };

    updateItemWidth(); // Set initial width
    window.addEventListener("resize", updateItemWidth); // Update width on resize

    return () => {
      window.removeEventListener("resize", updateItemWidth); // Cleanup event listener
    };
  }, []);
  const totalWidth = itemWidth + gap;

  // Create infinite loop by duplicating testimonials
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  // Auto-scroll continuously to the right
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;

        // Reset to start of second set when reaching end of second set
        if (newIndex >= testimonials.length * 2) {
          // Temporarily disable transition for instant reset
          setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex(testimonials.length);
            // Re-enable transition after reset
            setTimeout(() => setIsTransitioning(true), 50);
          }, 500);
          return newIndex;
        }

        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex >= testimonials.length * 2) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(testimonials.length);
          setTimeout(() => setIsTransitioning(true), 50);
        }, 500);
      }
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= testimonials.length) {
        setIsTransitioning(false);
        const newIndex = testimonials.length * 2 - 1;
        setCurrentIndex(newIndex);
        setTimeout(() => setIsTransitioning(true), 50);
        return newIndex;
      }
      return prev - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(testimonials.length + index);
  };

  return (
    <section className="bg-dark-navy py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ color: "var(--color-news-heading)" }}
          >
            What client says
          </h2>
          <p
            className="mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--color-news-subtitle)" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquid
            incidunt, tempora quia iusto ad voluptates voluptatibus suscipit.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            className=""
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Infinite Scroll Container */}

            <div
              ref={carouselRef}
              className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
              style={{
                transform: `translateX(-${currentIndex * totalWidth}px)`,
                gap: `${gap}px`,
              }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${Math.floor(index / testimonials.length)}`}
                  className="flex-shrink-0"
                  style={{ width: `${itemWidth}px` }}
                >
                  <div className="group hover-lift relative h-80 overflow-hidden rounded-3xl border border-blue-600 bg-transparent p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                    {/* Background Gradient - matching site theme */}
                    <div className="from-primary-50 to-secondary-50 absolute inset-0 bg-gradient-to-br opacity-30"></div>

                    {/* Quote Icon */}
                    <Quote className="group-hover:text-secondary-400 absolute top-4 right-4 h-8 w-8 text-gray-200 transition-colors duration-300" />

                    <div className="relative z-10 flex h-full flex-col">
                      {/* Student Info */}
                      <div className="mb-4 flex items-center">
                        <div className="relative">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 text-sm font-semibold text-white shadow-md">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="bg-primary-500 absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white">
                            <svg
                              className="h-2 w-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-bold text-gray-200">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm font-medium text-gray-300">
                            {testimonial.program}
                          </p>
                          <p className="text-xs text-gray-400">
                            {testimonial.university}, {testimonial.country}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="mb-4 flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-current text-yellow-500"
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="flex-1 text-sm leading-relaxed text-gray-200 italic">
                        "{testimonial.text}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls - Dots and Buttons */}
      <div className="mt-8 flex items-center justify-center space-x-6">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="hover:border-secondary-300 group cursor-pointer rounded-xl border border-white/50 bg-blue-400 p-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-blue-500 hover:shadow-xl"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="group-hover:text-secondary-600 h-5 w-5 text-gray-600 transition-colors duration-300" />
        </button>

        {/* Dots Indicator */}
        <div className="hidden space-x-2 md:flex">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex % testimonials.length === index
                  ? "w-6 bg-blue-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="hover:border-secondary-300 group cursor-pointer rounded-xl border border-white/50 bg-blue-400 p-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-blue-500 hover:shadow-xl"
          aria-label="Next testimonial"
        >
          <ChevronRight className="group-hover:text-secondary-600 h-5 w-5 text-gray-600 transition-colors duration-300" />
        </button>
      </div>

      {/* Call to Action */}
      {/* <div className="mt-12 text-center">
        <p className="mb-6 text-gray-600">
          Ready to write your own success story?
        </p>
        <button
          onClick={() =>
            window.open(
              "https://calendar.app.google/5yoj2E5Yuj9Jhzmt6",
              "_blank",
            )
          }
          className="from-secondary-600 to-accent-600 hover:from-secondary-700 hover:to-accent-700 transform cursor-pointer rounded-2xl bg-gradient-to-r px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
        >
          Start Your Journey Today
        </button>
      </div> */}
    </section>
  );
}
