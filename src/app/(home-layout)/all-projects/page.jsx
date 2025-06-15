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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Projects Found</h2>
            <p className="text-gray-600">It seems there are no projects available at the moment.</p>
          </div>
        </section>
      );
    }
    if (loading) {
      return (
        <section className="py-16 bg-gray-50 container mx-auto px-4 max-w-7xl">
          <Loader/>
        </section>
      );
    }

    return (
      <section className="py-16 bg-gray-50 container mx-auto px-4 max-w-7xl">
        <div className="">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              All Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore my latest work and creative projects. Each project represents a unique challenge and solution.
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
