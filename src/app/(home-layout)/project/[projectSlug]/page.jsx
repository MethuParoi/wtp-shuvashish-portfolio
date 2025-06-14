
import { fetchProjectBySlug } from '../../../../lib/fetchProject';
import Link from 'next/link';

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.projectSlug;
  
  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Invalid Project URL</h1>
          <p className="text-gray-600 mb-8">The project URL is malformed.</p>
        </div>
      </div>
    );
  }
  
  const project = await fetchProjectBySlug(slug);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Project Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen w-screen bg-white overflow-x-hidden">
      {/* Hero Section with Light Gradient */}
      <div className="relative h-96 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-gray-100/60"></div>
        
        {/* Content Container with Proper Constraints */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full max-w-4xl">
            <nav className="mb-6">
              <Link
                href="/projects"
                className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Projects
              </Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 break-words">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl break-words">
              {project.content.substring(0, 200)}...
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Responsive Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Main Content Column */}
          <div className="lg:col-span-2 w-full min-w-0">
            {/* Project Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Project</h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed break-words">
                {project.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 break-words">{paragraph}</p>
                ))}
              </div>
            </section>

            

            {/* Project Image */}
            {project.image && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Preview</h2>
                <div className="rounded-lg overflow-hidden shadow-lg w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto max-w-full"
                  />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar with Constrained Width */}
          <div className="lg:col-span-1 w-full min-w-0">
            {/* project details card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 sticky top-6 w-full">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Project Details</h3>
              
              {/* Project Date */}
              <div className="mb-4">
                <dt className="text-sm font-medium text-gray-500">Created</dt>
                <dd className="text-gray-800 break-words">
                  {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </dd>
              </div>

              {/* Project Link */}
              {project.projectLink && (
                <div className="mb-6">
                  <dt className="text-sm font-medium text-gray-500 mb-2">Live Demo</dt>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg w-full justify-center"
                  >
                    View Project
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}

              {/* Technologies */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-2">Technologies</dt>
                  <div className="flex flex-wrap gap-2">
                    {project.keyFeatures.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full break-words"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <section className="my-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
                <div className="grid grid-cols-1 gap-4">
                  {project.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center  break-words">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 break-words">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
