'use client';

import { useState } from 'react';

export function useSidebarState() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return { sidebarOpen, toggleSidebar, closeSidebar };
}