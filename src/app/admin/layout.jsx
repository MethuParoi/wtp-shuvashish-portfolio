// import Header from '../../components/admin/admin-home/Header';
// import Sidebar from '../../components/admin/admin-home/Sidebar';
// // import { getAdminProfile } from '@/lib/adminService';
// // import { createServerClient } from '@appwrite/nextjs';
// import { redirect } from 'next/navigation';
// import { cookies } from 'next/headers';
// import { useSidebarState } from '../../hooks/useSidebarState';

// export default function DashboardLayout({ children }) {
//   const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebarState();

//   const cookieStore = cookies();
//   const admin = cookieStore.get('admin')?.value;

//   if (!admin) {
//     // No admin cookie → redirect to login
//     redirect('/admin/login');
//   }

//   // const [isAdmin, setIsAdmin] = useState(false);

//   // Initialize Appwrite client
//   // const client = createServerClient({
//   //   endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
//   //   project:  process.env.NEXT_PUBLIC_PROJECT_ID,
//   //   cookies   // ← automatically forwards request cookies
//   // });

//   // useEffect(() => {
//   //   const fetchAdminProfile = async () => {
//   //     try {
//   //         // Attempt to get the current user
//   //         await client.account.get();
//   //     } catch {
//   //         // If unauthorized, redirect to the login page
//   //         redirect('/admin/login');
//   //     }
//   //   };

//   //   fetchAdminProfile();
//   // }
//   // , []);

//   // useEffect(() => {
//   //   const fetchAdminProfile = async () => {
//   //     try {
//   //       const profile = await getAdminProfile();
//   //       if(!profile || profile.role !== 'admin') {
//   //         // If no profile or not an admin, redirect to login
//   //         redirect('/admin/login');
//   //       }
//   //       console.log('Admin Profile:', profile);
//   //     } catch (error) {
//   //       console.error('Failed to fetch admin profile:', error);
//   //     }
//   //   };

//   //   fetchAdminProfile();
//   // }
//   // , []);

//   return (
//     <div className="min-h-screen bg-neutral-50 ">
//       <Header 
//         onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen}
//       />
      
//       <div className="flex">
//         <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
//         <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

//-------------------------------------------------------
// src/app/admin/layout.jsx
// ← NO "use client" here
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientShell from '../../components/admin/admin-home/ClientShell';

export default function DashboardLayout({ children }) {
  const adminCookie = cookies().get('admin')?.value;
  if (!adminCookie) {
    redirect('/admin-login');
  }

  // pass through to your client UI wrapper
  return <ClientShell>{children}</ClientShell>;
}



