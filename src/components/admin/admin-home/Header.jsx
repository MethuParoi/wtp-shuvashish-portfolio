'use client';

import { useEffect, useState } from 'react';
import SearchInput from '../../ui/SearchInput';
import UserAvatar from '../../ui/UserAvatar';
import { Menu, Bell } from 'lucide-react'; // Replace IconComponents import

export default function Header({ onMenuClick, sidebarOpen }) {
  const [notifications] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve the email from the cookie
    const adminCookie = document.cookie.split('; ').find(row => row.startsWith('registered='));
    if (adminCookie) {
      const emailValue = adminCookie.split('=')[1];
      setEmail(emailValue);
    }
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-neutral-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="hidden lg:block">
            <h2 className="text-xl font-bold text-primary">Portfolio Admin</h2>
          </div>
        </div>

        <div className="hidden md:block flex-1 max-w-md mx-8">
          <SearchInput placeholder="Search projects, blogs..." />
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-neutral-100 rounded-md transition-colors">
            <Bell className="h-6 w-6" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-xs font-medium text-gray-900 rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          <UserAvatar 
            email={email}
          />
        </div>
      </div>
    </header>
  );
}
