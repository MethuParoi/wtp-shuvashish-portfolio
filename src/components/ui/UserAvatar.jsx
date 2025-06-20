// components/ui/UserAvatar.jsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function UserAvatar({ email}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  const router = useRouter();

  return (
    <div className="relative cursor-pointer">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
          
            {/* <img src={avatar} alt={name} className="h-8 w-8 rounded-full object-cover" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
          
        </div>
        <div className="hidden md:block text-left">
        
          <p className="text-md text-gray-600">{email}</p>
        </div>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
          <div className="py-1">
            <Link href="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100">
              Your Profile
            </Link>
            <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100">
              Settings
            </Link>
            <hr className="my-1 border-neutral-200" />
            <button 
            onClick={() => {
                      document.cookie = "registered=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; sameSite=strict";
                      toast.success("Logged out successfully!");
                      router.push("/admin-login"); // Redirect to login page
                    }} 
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 cursor-pointer">
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
