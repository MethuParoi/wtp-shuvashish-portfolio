"use client";
import { Button } from '@/components/ui/Button';
import { fetchProjects } from '../../../lib/fetchProject';
import ProjectGrid from '../project/ProjectGrid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProjectsSection() {
  const router = useRouter();
   const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const loadProjects = async () => {
        try {
          const data = await fetchProjects(4); 
          setProjects(data);
        } catch (err) {
          console.error("Error loading projects:", err);
          setError("Unable to load projects at the moment.");
        }
      };
  
      loadProjects();
    }, []);
    

    return (
      <section className="py-16 bg-gray-50 container mx-auto px-4 max-w-7xl">
        <div className="">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore my latest work and creative projects. Each project represents a unique challenge and solution.
            </p>
          </div>

          {/* Projects Grid */}
          <ProjectGrid projects={projects} />

          {/* View All Projects Button */}
          {projects.length > 0 && (
            <div className="flex justify-center">
            <Button
              onClick={() => router.push("/all-projects")}
              className="self-center"
              variant="default"
              size="default"
            >
              View All Projects
            </Button>
          </div>
          )}
        </div>
      </section>
    );
  
}
