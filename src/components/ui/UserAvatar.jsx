// components/ui/UserAvatar.jsx
'use client';

import { useState } from 'react';

export default function UserAvatar({ name, email, avatar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt={name} className="h-8 w-8 rounded-full object-cover" />
          ) : (
            <span className="text-sm font-medium text-gray-900">{initials}</span>
          )}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
          <div className="py-1">
            <a href="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100">
              Your Profile
            </a>
            <a href="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100">
              Settings
            </a>
            <hr className="my-1 border-neutral-200" />
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100">
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
