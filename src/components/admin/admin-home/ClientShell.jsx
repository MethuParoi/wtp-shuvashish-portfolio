// src/app/admin/ClientShell.jsx
"use client";                  // ← must be first line
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
// import { useSidebarState } from '../../hooks/useSidebarState';

export default function ClientShell({ children }) {
//   const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();
const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}/>
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
