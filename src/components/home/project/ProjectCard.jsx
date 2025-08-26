'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProjectCard({ project }) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    // Generate slug from title if projectSlug doesn't exist
    const slug = project.projectSlug || project.title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    router.push(`/project/${slug}`);
  };

  console.log('Project Card Rendered:', project.image);

  return (
    <div
      className="group transform cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{
        background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
      }}
      onClick={handleCardClick}
    >
      {/* Project Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={100}
          height={100}
          className="h-full w-full object-cover"
          // onError={() => setImageError(true)}
        />
      </div>

      {/* Project Links */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center text-sm text-gray-300">
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {new Date(project.createdAt).toLocaleDateString()}
        </div>

        {project.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 transition-colors hover:text-blue-800"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>

      {/* Project Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 text-xl font-bold text-gray-100 transition-colors duration-300 group-hover:text-gray-300">
          {project.title}
        </h3>

        <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-300">
          {project.content.length > 120
            ? `${project.content}`
            : project.content}
        </p>
      </div>

      {/* button */}
      <div className="flex items-center justify-center pb-8">
        <button
          style={{
            background: "linear-gradient(90deg, #dca8fc 0%, #515ada 100%)",
          }}
          className="h-12 w-[80%] cursor-pointer rounded-2xl text-lg font-medium text-gray-50 hover:text-gray-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
