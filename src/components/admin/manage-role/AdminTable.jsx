'use client';
import { useState } from 'react';
import AdminTableRow from './AdminTableRow';

export default function AdminTable({ admins, onDeleteUser, onRefresh, setSelectedUser, setShowDeleteModal }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = admins.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(admins.length / usersPerPage);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-neutral-200 bg-neutral-50">
        <h2 className="text-lg font-semibold text-gray-900">Admin & Moderator Management</h2>
      </div>

      {/* Mobile Card View (Hidden on larger screens) */}
      <div className="block lg:hidden">
        {currentUsers.map((admin, index) => (
          <div key={admin.$id} className="border-b border-neutral-200 p-4">
            <div className="flex items-start space-x-3">
              {/* Mobile User Avatar */}
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {admin.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>

              {/* Mobile User Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {admin.name || 'Unnamed User'}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    admin.role === 'admin' 
                      ? 'bg-primary text-gray-900' 
                      : 'bg-secondary text-white'
                  }`}>
                    {admin.role?.charAt(0).toUpperCase() + admin.role?.slice(1)}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 mb-2 break-all">{admin.email}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    #{indexOfFirstUser + index + 1} • Created: {new Date(admin.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  
                  <button
                    onClick={() => onDeleteUser(admin.$id)}
                    className="inline-flex items-center px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet and Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SNo.
              </th>
              <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th> */}
              <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th> */}
              <th className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-4 lg:px-8 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {currentUsers.map((admin, index) => (
              <AdminTableRow
                key={admin.$id}
                admin={admin}
                serialNumber={indexOfFirstUser + index + 1}
                onRefresh={onRefresh}
                // onDelete={() => onDeleteUser(admin.$id)}
                //props passed to AdminTableRow from AdminManagement.jsx
                setSelectedUser={setSelectedUser}
                setShowDeleteModal={setShowDeleteModal}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {admins.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500">No Admin or Moderator to Manage.</p>
        </div>
      )}

      {/* Responsive Pagination */}
      {totalPages > 1 && (
        <div className="px-4 sm:px-6 py-4 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, admins.length)} of {admins.length} users
            </div>
            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 sm:px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show fewer pages on mobile
                  if (window.innerWidth < 640) {
                    return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 0;
                  }
                  return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                })
                .map((page, index, array) => (
                  <div key={page} className="flex items-center">
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-1 sm:px-2 text-gray-400 text-xs sm:text-sm">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-2 sm:px-3 py-1 text-sm border rounded ${
                        currentPage === page
                          ? 'bg-primary text-gray-900 border-primary'
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 sm:px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

