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
  const [role, setRole] = useState(""); 
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

    //identify if admin or moderator
    useEffect(() => {
      const roleCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('role='));
      if (roleCookie) {
        const value = roleCookie.split('=')[1];
        setRole(value); // Only "admin" or "moderator"
      }
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
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ${role === "moderator" ? "lg:px-20 xl:px-42" : ""}`}>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 `}>

              {role !== "moderator" && projects && (
                <StatsCard value={projects.length} title="Total Projects" icon="projects" trend="+12%" trendDirection="up"/>
              )}

              {blogs && (
                <StatsCard value={blogs.length} title="Total Blog Posts" icon="blogs" trend="+8%" trendDirection="up"/>
              )}
              
                  
                
            </div>
            <div>
                <QuickActions role={role}/>
            </div>
          </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Projects - Takes 2 columns */}
              <div className={`${role === "moderator" ? "hidden" : ""}`}>
                
                <RecentProjects type="project" content={projects}/>
              </div>
              
              {/* Quick Actions Sidebar */}
              <div className={`${role === "moderator" ? "lg:col-span-2" : ""}`}>
                <RecentProjects type="blog" content={blogs}/>
              </div>
            </div>
          </div>
  )
  ;
}
