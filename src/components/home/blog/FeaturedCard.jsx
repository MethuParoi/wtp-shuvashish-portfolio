'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FeaturedBlogCard({ blog, featured = false }) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    router.push(`/blog/${blog.slug}`);
  };



  return (
    <article
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {!imageError && blog.featuredImage ? (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs">Image</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <span className="text-blue-600 text-xs font-medium uppercase tracking-wide">
            {blog.tags ? blog.tags.split(',')[0].trim() : 'Article'}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
          {blog.excerpt || blog.content.substring(0, 100) + '...'}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center mr-2">
              <span className="text-gray-600 font-medium text-xs">
                {blog.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-gray-900 font-medium">{blog.author}</span>
          </div>
          
          <span className="text-gray-500">
            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </article>
  );
}
