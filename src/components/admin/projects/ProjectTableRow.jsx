'use client';

import { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function ProjectTableRow({ project, serialNumber, onView, onEdit, onDelete }) {
  const [imageError, setImageError] = useState(false);

  const truncateContent = (content, maxLength = 80) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {serialNumber}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-12 w-16 rounded-lg overflow-hidden bg-neutral-100">
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
      
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900 max-w-xs">
          {project.title}
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="text-sm text-gray-600 max-w-md">
          {truncateContent(project.content)}
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(project.createdAt)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-gray-900">
          Active
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={onView}
            className="p-2 text-secondary hover:text-secondary-hover hover:bg-secondary-50 rounded-lg transition-colors"
            title="View Project"
          >
            <Eye className="h-4 w-4" />
          </button>
          
          <button
            onClick={onEdit}
            className="p-2 text-primary hover:text-primary-hover hover:bg-primary-50 rounded-lg transition-colors"
            title="Edit Project"
          >
            <Edit className="h-4 w-4" />
          </button>
          
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Project"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
