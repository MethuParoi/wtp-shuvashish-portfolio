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
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
      onClick={handleCardClick}
    >
      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden">
        
          <Image
            src={project.image}
            alt={project.title}
            width={100}
            height={100}
            className="h-full w-full object-cover "
            // onError={() => setImageError(true)}
          />
        
        
        {/* Overlay with hover effect */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg">
              View Details
            </button>
          </div>
        </div> */}
      </div> 

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
          {project.content.length > 120 
            ? `${project.content.substring(0, 120)}...` 
            : project.content
          }
        </p>

        {/* Key Features */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.keyFeatures.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200"
                >
                  {feature}
                </span>
              ))}
              {project.keyFeatures.length > 3 && (
                <span className="inline-block bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">
                  +{project.keyFeatures.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Project Links */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
          
          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
