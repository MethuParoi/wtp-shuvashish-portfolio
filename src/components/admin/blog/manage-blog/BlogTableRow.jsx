'use client';

import { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function BlogTableRow({ blog, serialNumber, onView, onEdit, onDelete, role }) {
  const [imageError, setImageError] = useState(false);

  const truncateTitle = (title, maxLength = 30) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: '2-digit',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {serialNumber}
      </td>
      
      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
        <div className="h-10 w-12 sm:h-12 sm:w-16 rounded-lg overflow-hidden bg-neutral-100">
          {!imageError && blog.featuredImage ? (
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
              <span className="text-xs text-gray-400">No Image</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-3 lg:px-6 py-4">
        <div className="text-sm font-medium text-gray-900 max-w-[150px] md:max-w-[250px] lg:max-w-xs">
          <span className="block md:hidden" title={blog.title}>
            {truncateTitle(blog.title, 20)}
          </span>
          <span className="hidden md:block lg:hidden" title={blog.title}>
            {truncateTitle(blog.title, 35)}
          </span>
          <span className="hidden lg:block">
            {blog.title}
          </span>
        </div>
      </td>
      
      <td className="px-3 lg:px-6 py-4">
        <div className="text-sm text-gray-600">
          {blog.author}
        </div>
      </td>
      
      {/* Published Date column - hidden on mobile and tablet */}
      <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {blog.publishedAt ? formatDate(blog.publishedAt) : 'Not published'}
      </td>
      
      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          blog.isPublished 
            ? 'bg-accent text-gray-900' 
            : 'bg-neutral-200 text-gray-700'
        }`}>
          {blog.isPublished ? 'Published' : 'Draft'}
        </span>
      </td>
      
      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-1 sm:space-x-2">
          <button
            onClick={onView}
            className="p-1.5 sm:p-2 text-secondary hover:text-secondary-hover hover:bg-secondary-50 rounded-lg transition-colors"
            title="View Blog"
          >
            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          
          <button
            onClick={onEdit}
            className="p-1.5 sm:p-2 text-primary hover:text-primary-hover hover:bg-primary-50 rounded-lg transition-colors"
            title="Edit Blog"
          >
            <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          
          <button
          disabled={role !== 'admin'}
            className={`p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded ${
            role !== 'admin' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onDelete}
            
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
