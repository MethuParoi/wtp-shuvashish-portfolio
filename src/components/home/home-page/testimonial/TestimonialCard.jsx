// components/TestimonialCard.js
import React from "react";

const TestimonialCard = ({
  testimonial,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  className = "",
}) => {
  const {
    id,
    name = "Client Name",
    role = "Position",
    image = "/client-avatar.jpg",
    rating = 5,
    text = "Lorem ipsum dolor sit amet consectetur. Nunc risus pellentesque vehicula etiam senean aliquam. Ac quam enim faucibus id lorem. Adipiscing vel sed aliquam enim et pretium aliquam mattis nulla. Nunc faucibus id lorem.",
  } = testimonial;

  // Star Rating Component
  const StarRating = ({ rating }) => {
    return (
      <div className="mb-4 flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`h-5 w-5 ${
              index < rating ? "text-yellow-400" : "text-gray-600"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`w-full flex-shrink-0 px-3 transition-all duration-300 md:w-1/2 ${className} `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`h-full rounded-2xl border p-8 transition-all duration-300 ${
          isHovered ? "scale-105 shadow-2xl" : "hover:scale-105 hover:shadow-xl"
        } `}
        style={{
          backgroundColor: isHovered
            ? "var(--color-testimonial-card-hover)"
            : "var(--color-testimonial-card-bg)",
          borderColor: isHovered
            ? "var(--color-testimonial-card-border-hover)"
            : "var(--color-testimonial-card-border)",
        }}
      >
        {/* Client Info */}
        <div className="mb-6 flex items-center space-x-4">
          {/* Client Avatar */}
          <div className="flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="h-16 w-16 rounded-xl object-cover"
            />
          </div>

          {/* Client Details */}
          <div className="min-w-0 flex-1">
            <h4
              className="truncate text-lg font-semibold"
              style={{ color: "var(--color-testimonials-author)" }}
            >
              {name}
            </h4>
            <p
              className="truncate text-sm opacity-80"
              style={{ color: "var(--color-testimonials-role)" }}
            >
              {role}
            </p>
          </div>
        </div>

        {/* Star Rating */}
        <StarRating rating={rating} />

        {/* Testimonial Text */}
        <p
          className="text-base leading-relaxed"
          style={{ color: "var(--color-testimonials-text)" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
