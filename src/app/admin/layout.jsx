'use client';

import { useState } from 'react';
import Header from '../../components/admin/admin-home/Header';
import Sidebar from '../../components/admin/admin-home/Sidebar';
import StatsCard from '../../components/admin/admin-home/StatsCard';
import RecentProjects from '../../components/admin/admin-home/RecentProjects';
import QuickActions from '../../components/admin/admin-home/QuickActions';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const statsData = [
    {
      title: "Total Projects",
      value: "150",
      icon: "projects",
      trend: "+12%",
      trendDirection: "up"
    },
    {
      title: "Total Blog Posts",
      value: "32",
      icon: "blogs",
      trend: "+8%",
      trendDirection: "up"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 ">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
          <div className="p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your portfolio.</p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {statsData.map((stat, index) => (
                  <StatsCard key={index} {...stat} />
                ))}
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
        </main>
      </div>
    </div>
  );
}




