"use client";
import { useEffect, useState } from "react";
import StatsCard from "@/components/admin/admin-home/StatsCard";
import QuickActions from "@/components/admin/admin-home/QuickActions";
import RecentProjects from "@/components/admin/admin-home/RecentProjects";
import { fetchBlogs } from "@/lib/fetchBlog";
import { fetchProjects } from "@/lib/fetchProject";
import Loader from "@/components/ui/Loader/Loader";


export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      const loadData = async () => {
        setLoading(true);
        try {
          const [blogData, projectData] = await Promise.all([
          fetchBlogs(),
          fetchProjects(),
        ]); 
          setBlogs(blogData);
          setProjects(projectData);
          setLoading(false);
        } catch (err) {
          console.error("Error loading blogs:", err);
          setError("Unable to load blog posts at the moment.");
        }
      };
  
      loadData();
    }, []);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader/>
        </div>
      );
    }
  return (
    <div className="p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your portfolio.</p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

              {projects && (
                <StatsCard value={projects.length} title="Total Projects" icon="projects" trend="+12%" trendDirection="up"/>
              )}

              {blogs && (
                <StatsCard value={blogs.length} title="Total Blog Posts" icon="blogs" trend="+8%" trendDirection="up"/>
              )}
              
                  
                
            </div>
            <div>
                <QuickActions />
            </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Projects - Takes 2 columns */}
              <div className="">
                <RecentProjects />
              </div>
              
              {/* Quick Actions Sidebar */}
              <div className="">
                <RecentProjects />
              </div>
            </div>
          </div>
  )
  ;
}
