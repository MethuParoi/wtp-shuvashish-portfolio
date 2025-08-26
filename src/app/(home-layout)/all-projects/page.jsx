"use client";
import { fetchProjects } from '../../../lib/fetchProject';
import ProjectGrid from '../../../components/home/project/ProjectGrid';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader/Loader';

export default function ProjectsSection() {
  try {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
  
    // Fetch blogs from the server
    useEffect(() => {
          const loadProjects = async () => {
            setLoading(true);
            try {
              const data = await fetchProjects(); 
              setProjects(data);
              setLoading(false);
            } catch (err) {
              console.error("Error loading projects:", err);
              setError("Unable to load projects at the moment.");
            }
          };
      
          loadProjects();
        }, []);
  
    if (!loading && projects.length === 0) {
      return (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-100">
              No Projects Found
            </h2>
            <p className="text-gray-200">
              It seems there are no projects available at the moment.
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

    return (
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <div className="">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-50 md:text-4xl">
              All Projects
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-200">
              Explore my latest work and creative projects. Each project
              represents a unique challenge and solution.
            </p>
          </div>

          {/* Projects Grid */}
          <ProjectGrid projects={projects} />
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error in ProjectsSection:', error);
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Projects</h2>
          <p className="text-red-500">Error loading projects. Please try again later.</p>
        </div>
      </section>
    );
  }
}
