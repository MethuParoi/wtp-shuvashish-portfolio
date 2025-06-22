'use client';
import { useState } from 'react';
import AdminTableRow from './AdminTableRow';

export default function AdminTable({ admins, onDeleteUser, onRefresh }) {
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
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
        <h2 className="text-lg font-semibold text-gray-900">Admin & Moderator Management</h2>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SNo.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                onDelete={() => onDeleteUser(admin.$id)}
                onRefresh={onRefresh}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, admins.length)} of {admins.length} users
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .map((page, index, array) => (
                  <div key={page} className="flex items-center">
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm border rounded ${
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
                className="px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
