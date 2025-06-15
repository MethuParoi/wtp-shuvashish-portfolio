// components/dashboard/RecentProjects.jsx
'use client';

import ProjectStatusBadge from './ProjectStatusBadge';

const recentProjects = [
  {
    id: 1,
    title: "Modern Website Design",
    client: "Tech Solutions Inc.",
    status: "Completed",
    lastUpdated: "2 hours ago"
  },
  {
    id: 2,
    title: "E-commerce Platform Development",
    client: "Fashion Hub",
    status: "In Progress",
    lastUpdated: "1 day ago"
  },
  {
    id: 3,
    title: "Mobile App UI/UX",
    client: "HealthFirst",
    status: "New",
    lastUpdated: "3 days ago"
  }
];

export default function RecentProjects() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
        <button className="text-sm text-secondary hover:text-secondary-hover font-medium">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {recentProjects.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">{project.title}</h3>
              <p className="text-sm text-gray-600">Client: {project.client}</p>
            </div>
            <div className="flex items-center space-x-4">
              <ProjectStatusBadge status={project.status} />
              <span className="text-xs text-gray-500">{project.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
