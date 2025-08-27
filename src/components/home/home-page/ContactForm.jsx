"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactForm = ({
  title = "LET'S TALK",
  subtitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  namePlaceholder = "Your Name",
  emailPlaceholder = "Email",
  phonePlaceholder = "Phone Number",
  messagePlaceholder = "Write your message here",
  submitButtonText = "Send Message",
  onSubmit = null, // Function to handle form submission
  className = "",
}) => {
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    const data = {
      access_key: process.env.NEXT_PUBLIC_WEB3_FORMS_ACCESS_KEY,
      subject: "Contact Form Submission || Portfolio",
      form_Name: "Contact Form || Portfolio",
      name: formData.name,
      email: formData.email,
      phone: `${formData.phone}`,
      message: formData.message,
    };

    try {
      const loadingToast = toast.loading("Sending your message...");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     if (onSubmit) {
  //       // Call the provided submit function
  //       await onSubmit(formData);
  //     } else {
  //       // Default behavior - log the data
  //       console.log("Form Data:", formData);

  //       // Simulate API call
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       alert("Message sent successfully!");

  //       // Reset form
  //       setFormData({
  //         name: "",
  //         email: "",
  //         phone: "",
  //         message: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("Error sending message. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // Diagonal Lines Background Pattern
  const DiagonalLinesBackground = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="diagonal-lines-1"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100"
              stroke="var(--color-pattern-line-1)"
              strokeWidth="1"
            />
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="100"
              stroke="var(--color-pattern-line-1)"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="0"
              x2="40"
              y2="100"
              stroke="var(--color-pattern-line-1)"
              strokeWidth="1"
            />
            <line
              x1="60"
              y1="0"
              x2="60"
              y2="100"
              stroke="var(--color-pattern-line-1)"
              strokeWidth="1"
            />
            <line
              x1="80"
              y1="0"
              x2="80"
              y2="100"
              stroke="var(--color-pattern-line-1)"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="diagonal-lines-2"
            patternUnits="userSpaceOnUse"
            width="80"
            height="80"
            patternTransform="rotate(-45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="80"
              stroke="var(--color-pattern-line-2)"
              strokeWidth="1"
            />
            <line
              x1="16"
              y1="0"
              x2="16"
              y2="80"
              stroke="var(--color-pattern-line-2)"
              strokeWidth="1"
            />
            <line
              x1="32"
              y1="0"
              x2="32"
              y2="80"
              stroke="var(--color-pattern-line-2)"
              strokeWidth="1"
            />
            <line
              x1="48"
              y1="0"
              x2="48"
              y2="80"
              stroke="var(--color-pattern-line-2)"
              strokeWidth="1"
            />
            <line
              x1="64"
              y1="0"
              x2="64"
              y2="80"
              stroke="var(--color-pattern-line-2)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* First set of diagonal lines */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#diagonal-lines-1)"
          opacity="0.6"
        />

        {/* Second set of diagonal lines */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#diagonal-lines-2)"
          opacity="0.4"
        />

        {/* Additional larger lines for depth */}
        <g opacity="0.3">
          <line
            x1="0"
            y1="0"
            x2="1200"
            y2="400"
            stroke="var(--color-pattern-line-1)"
            strokeWidth="2"
          />
          <line
            x1="0"
            y1="200"
            x2="1200"
            y2="600"
            stroke="var(--color-pattern-line-1)"
            strokeWidth="2"
          />
          <line
            x1="0"
            y1="400"
            x2="1200"
            y2="800"
            stroke="var(--color-pattern-line-1)"
            strokeWidth="2"
          />
        </g>

        <g opacity="0.2">
          <line
            x1="1200"
            y1="0"
            x2="0"
            y2="300"
            stroke="var(--color-pattern-line-2)"
            strokeWidth="2"
          />
          <line
            x1="1200"
            y1="300"
            x2="0"
            y2="600"
            stroke="var(--color-pattern-line-2)"
            strokeWidth="2"
          />
          <line
            x1="1200"
            y1="600"
            x2="0"
            y2="800"
            stroke="var(--color-pattern-line-2)"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-24 lg:py-32 ${className}`}
      style={{ backgroundColor: "var(--color-contact-section-bg)" }}
    >
      {/* Diagonal Lines Background */}
      <DiagonalLinesBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h2
            className="mb-6 text-4xl leading-tight font-bold tracking-wider md:text-5xl lg:text-6xl xl:text-7xl"
            style={{ color: "var(--color-contact-heading)" }}
          >
            {title}
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--color-contact-subtitle)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Name Input */}
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={namePlaceholder}
                className={`placeholder-opacity-70 w-full border-0 border-b-2 bg-transparent px-0 py-4 text-lg transition-all duration-300 focus:outline-none ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-600 focus:border-cyan-400"
                } `}
                style={{
                  color: "var(--color-form-input-text)",
                  borderBottomColor: errors.name
                    ? "#ef4444"
                    : "var(--color-form-input-border)",
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor =
                    "var(--color-form-input-border-focus)";
                }}
                onBlur={(e) => {
                  if (!errors.name) {
                    e.target.style.borderBottomColor =
                      "var(--color-form-input-border)";
                  }
                }}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={emailPlaceholder}
                className={`placeholder-opacity-70 w-full border-0 border-b-2 bg-transparent px-0 py-4 text-lg transition-all duration-300 focus:outline-none ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-600 focus:border-cyan-400"
                } `}
                style={{
                  color: "var(--color-form-input-text)",
                  borderBottomColor: errors.email
                    ? "#ef4444"
                    : "var(--color-form-input-border)",
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor =
                    "var(--color-form-input-border-focus)";
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderBottomColor =
                      "var(--color-form-input-border)";
                  }
                }}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={phonePlaceholder}
              className={`placeholder-opacity-70 w-full border-0 border-b-2 bg-transparent px-0 py-4 text-lg transition-all duration-300 focus:outline-none ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-600 focus:border-cyan-400"
              } `}
              style={{
                color: "var(--color-form-input-text)",
                borderBottomColor: errors.phone
                  ? "#ef4444"
                  : "var(--color-form-input-border)",
              }}
              onFocus={(e) => {
                e.target.style.borderBottomColor =
                  "var(--color-form-input-border-focus)";
              }}
              onBlur={(e) => {
                if (!errors.phone) {
                  e.target.style.borderBottomColor =
                    "var(--color-form-input-border)";
                }
              }}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* Message Textarea */}
          <div className="space-y-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={messagePlaceholder}
              rows={2}
              className={`placeholder-opacity-70 w-full resize-none border-0 border-b-2 bg-transparent px-0 py-4 text-lg transition-all duration-300 focus:outline-none ${
                errors.message
                  ? "border-red-500"
                  : "border-gray-600 focus:border-cyan-400"
              } `}
              style={{
                color: "var(--color-form-input-text)",
                borderBottomColor: errors.message
                  ? "#ef4444"
                  : "var(--color-form-input-border)",
              }}
              onFocus={(e) => {
                e.target.style.borderBottomColor =
                  "var(--color-form-input-border-focus)";
              }}
              onBlur={(e) => {
                if (!errors.message) {
                  e.target.style.borderBottomColor =
                    "var(--color-form-input-border)";
                }
              }}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full cursor-pointer rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 ${isSubmitting ? "cursor-wait" : "hover:shadow-xl"} `}
              style={{
                backgroundColor: "var(--color-form-submit-bg)",
                color: "var(--color-form-submit-text)",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor =
                    "var(--color-form-submit-bg-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor =
                    "var(--color-form-submit-bg)";
                }
              }}
            >
              {isSubmitting ? "Sending..." : submitButtonText}
            </button>
          </div>
        </form>

        {/* Form Data Display (for development - remove in production) */}
        {/* {process.env.NODE_ENV === "development" && (
          <div className="mt-8 rounded-lg bg-gray-800 p-4">
            <h4 className="mb-2 font-semibold text-white">
              Form Data (Development Only):
            </h4>
            <pre className="overflow-auto text-sm text-gray-300">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default ContactForm;
