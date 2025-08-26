"use client";
import { useEffect, useState } from 'react';
import { fetchProjectBySlug } from '../../../../lib/fetchProject';
import Link from 'next/link';
import Loader from '@/components/ui/Loader/Loader';

export default function ProjectDetailPage({ params }) {
  const [project, setProject] = useState();
  const [loading, setLoading] = useState(false);

  // Fetch blogs from the server
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const resolvedParams = await params;
        const slug = resolvedParams?.projectSlug;
        const project = await fetchProjectBySlug(slug);
        setProject(project);
        setLoading(false);
      } catch (err) {
        console.error("Error loading projects:", err);
        setError("Unable to load projects at the moment.");
      }
    };

    loadProjects();
  }, []);

  if (!loading && !project) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-100">
            No Project Found
          </h2>
          <p className="text-gray-200">
            It seems there are no project available at the moment.
          </p>
        </div>
      </section>
    );
  }
  if (loading) {
    return (
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <Loader />
      </section>
    );
  }

  // if (!slug) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-4xl font-bold text-gray-800 mb-4">Invalid Project URL</h1>
  //         <p className="text-gray-600 mb-8">The project URL is malformed.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <article className="min-h-screen w-screen overflow-x-hidden">
      {/* Hero Section with Light Gradient */}
      <div className="relative h-96 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700/70 to-gray-900/90"></div>

        {/* Content Container with Proper Constraints */}
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-around px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="mb-6">
              <Link
                href="/all-projects"
                className="inline-flex items-center text-gray-100 transition-colors hover:text-gray-900"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Projects
              </Link>
            </nav>
            <h1 className="mb-4 text-4xl font-bold break-words text-gray-50 md:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-xl break-words text-gray-200">
              {project.content.substring(0, 200)}...
            </p>
          </div>

          {/* project details card */}
          <div
            className="sticky top-6 w-96 rounded-lg p-6"
            style={{
              background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
            }}
          >
            <h3 className="mb-4 text-lg font-bold text-gray-800">
              Project Details
            </h3>

            {/* Project Date */}
            <div className="mb-4">
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="break-words text-gray-800">
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </dd>
            </div>

            {/* Project Link */}
            {project.projectLink && (
              <div className="mb-6">
                <dt className="mb-2 text-sm font-medium text-gray-500">
                  Live Demo
                </dt>
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 font-medium text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
                >
                  View Project
                  <svg
                    className="ml-2 h-4 w-4"
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
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content with Responsive Container */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content Column */}
          <div className="w-full min-w-0 lg:col-span-2">
            {/* Project Description */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-100">
                About This Project
              </h2>
              <div className="prose max-w-none leading-relaxed break-words text-gray-50">
                {project.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 break-words">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <section className="my-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-100">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {project.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center break-words">
                      <svg
                        className="mt-1 mr-3 h-5 w-5 flex-shrink-0 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="break-words text-gray-50">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar with Constrained Width */}
          <div className="w-full min-w-0 lg:col-span-2">
            {/* Project Image */}
            {project.image && (
              <section className="mb-8">
                <div className="w-full overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-auto w-full max-w-full"
                  />
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
