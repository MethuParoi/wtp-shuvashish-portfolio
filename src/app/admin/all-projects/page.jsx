import { fetchProjects } from '@/lib/fetchProject';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [projects, setProjects] = useState([]);
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);
      
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
  return (
    <div>page</div>
  )
}

export default page