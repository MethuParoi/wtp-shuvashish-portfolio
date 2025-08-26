"use client";
import { Button } from '@/components/ui/Navigation/Button';
import { fetchProjects } from '../../../lib/fetchProject';
import ProjectGrid from '../project/ProjectGrid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader/Loader';

export default function ProjectsSection() {
  const router = useRouter();
   const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const loadProjects = async () => {
        setLoading(true);
        try {
          const data = await fetchProjects(4); 
          setProjects(data);
          setLoading(false);
        } catch (err) {
          console.error("Error loading projects:", err);
          setError("Unable to load projects at the moment.");
        }
      };
  
      loadProjects();
    }, []);

    if (loading) {
      return (
        <section className="container mx-auto max-w-7xl px-4 py-16">
          <Loader />
        </section>
      );
    }

    return (
      <section className="container mx-auto max-w-7xl px-4 pb-14">
        <div className="">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2
              className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl"
              style={{ color: "var(--color-news-heading)" }}
            >
              Featured Projects
            </h2>
            <p
              className="mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
              style={{ color: "var(--color-news-subtitle)" }}
            >
              Explore my latest work and creative projects. Each project
              represents a unique challenge and solution.
            </p>
          </div>

          {/* Projects Grid */}
          <ProjectGrid projects={projects} />

          {/* View All Projects Button */}
          {projects.length > 0 && (
            <div className="flex justify-center">
              <Button
                onClick={() => router.push("/all-projects")}
                className="mt-10 self-center"
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
