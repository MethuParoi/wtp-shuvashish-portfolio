'use client';

import { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function ProjectTableRow({ project, serialNumber, onView, onEdit, onDelete }) {
  const [imageError, setImageError] = useState(false);

  const truncateContent = (content, maxLength = 60) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const truncateTitle = (title, maxLength = 25) => {
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
          {!imageError && project.image ? (
            <img
              src={project.image}
              alt={project.title}
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
        <div className="text-sm font-medium text-gray-900 max-w-[120px] md:max-w-[200px] lg:max-w-xs">
          <span className="block md:hidden" title={project.title}>
            {truncateTitle(project.title, 20)}
          </span>
          <span className="hidden md:block lg:hidden" title={project.title}>
            {truncateTitle(project.title, 30)}
          </span>
          <span className="hidden lg:block">
            {project.title}
          </span>
        </div>
      </td>
      
      {/* Content column - hidden on smaller screens */}
      <td className="hidden lg:table-cell px-6 py-4">
        <div className="text-sm text-gray-600 max-w-md">
          {truncateContent(project.content)}
        </div>
      </td>
      
      {/* Created Date column - hidden on mobile and tablet */}
      <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(project.createdAt)}
      </td>
      
      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-gray-900">
          Active
        </span>
      </td>
      
      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-1 sm:space-x-2">
          <button
            onClick={onView}
            className="p-1.5 sm:p-2 text-secondary hover:text-secondary-hover hover:bg-secondary-50 rounded-lg transition-colors"
            title="View Project"
          >
            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          
          <button
            onClick={onEdit}
            className="p-1.5 sm:p-2 text-primary hover:text-primary-hover hover:bg-primary-50 rounded-lg transition-colors"
            title="Edit Project"
          >
            <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          
          <button
            onClick={onDelete}
            className="p-1.5 sm:p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Project"
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
