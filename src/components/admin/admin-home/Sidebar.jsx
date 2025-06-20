'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  Settings,
  Edit,
  Plus,
  LogOut,
  X,
  User
} from 'lucide-react';
import { toast } from 'react-toastify';

const navigationItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Add New Project', href: '/admin/add-project', icon: FolderOpen },
  { name: 'All Projects', href: '/admin/all-projects', icon: FolderOpen },
  { name: 'Write New Blog', href: '/admin/add-blog', icon: Plus },
  { name: 'All Blogs', href: '/admin/all-blogs', icon: FileText },
  { name: 'Profile', href: '/admin/profile', icon: User },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Fixed Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-50 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-primary">Portfolio Admin</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-neutral-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation - Scrollable if needed */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary text-gray-900 shadow-sm' 
                    : 'text-gray-700 hover:bg-neutral-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button - Fixed at Bottom */}
        <div className="p-4 border-t border-neutral-200 flex-shrink-0">
          <button onClick={() => {
                                document.cookie = "registered=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; sameSite=strict";
                                toast.success("Logged out successfully!");
                                router.push("/admin-login"); // Redirect to login page
                              }} 
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-neutral-100 hover:text-gray-900 transition-colors">
            <LogOut className="h-5 w-5 mr-3 text-gray-500" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
