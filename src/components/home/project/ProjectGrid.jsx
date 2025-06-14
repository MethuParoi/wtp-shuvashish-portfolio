import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects = [] }) {
  if (!projects || !Array.isArray(projects)) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No projects available at the moment.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="max-w-md mx-auto">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-gray-500">No projects found.</p>
          <p className="text-sm text-gray-400 mt-2">Check back later for new projects!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map(project => (
        <ProjectCard key={project.$id} project={project} />
      ))}
    </div>
  );
}
