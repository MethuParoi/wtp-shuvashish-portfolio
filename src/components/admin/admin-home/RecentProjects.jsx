'use client';

import { useRouter } from 'next/navigation';
import ProjectStatusBadge from './ProjectStatusBadge';


export default function RecentProjects({type, content, status = "New"}) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{type === "project" ? "Recent Projects" : "Recent Blogs"}</h2>
        <button onClick={() => {
          router.push(type === "project" ? "/admin/all-projects" : "/admin/all-blogs");
        }} className="text-sm cursor-pointer text-secondary hover:text-secondary-hover font-medium">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {content.slice(0, 3).map((content) => (
          <div key={content.id} className="flex items-center justify-between p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">{content.title}</h3>
              <p className={`text-sm text-gray-600 line-clamp-1 ${type === "blog" ? "hidden" : ""}`}>{content.content}</p>
            </div>
            <div className="flex items-center space-x-4">
              <ProjectStatusBadge status={status} />
              <span className="text-xs text-gray-500">{new Date(content.createdAt).toISOString().split('T')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
