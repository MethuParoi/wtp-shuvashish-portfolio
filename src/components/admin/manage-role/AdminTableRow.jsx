'use client';
import { useState } from 'react';
import { Eye, EyeOff, Trash2, MoreVertical, UserCheck, UserX } from 'lucide-react';
import { deleteAdminUser, updateAdminStatus } from '@/lib/roleManagement';
import { toast } from 'react-toastify';

export default function AdminTableRow({ admin, serialNumber, onDelete, onRefresh }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${admin.name}?`)) {
      try {
        setLoading(true);
        await deleteAdminUser(admin.$id);
        onDelete();
      } catch (error) {
        toast.error('Failed to delete user');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusToggle = async () => {
    try {
      setLoading(true);
      const newStatus = admin.status === 'active' ? 'inactive' : 'active';
      await updateAdminStatus(admin.$id, newStatus);
      onRefresh();
      toast.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      toast.error('Failed to update user status');
    } finally {
      setLoading(false);
    }
  };

  const maskedPassword = admin.password ? '*'.repeat(12) : 'N/A';
  const displayPassword = showPassword ? admin.password : maskedPassword;

  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {serialNumber}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {admin.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {admin.name || 'Unnamed User'}
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {admin.email}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-900 font-mono">
            {displayPassword}
          </span>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          admin.role === 'admin' 
            ? 'bg-primary text-gray-900' 
            : 'bg-secondary text-white'
        }`}>
          {admin.role?.charAt(0).toUpperCase() + admin.role?.slice(1)}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          admin.status === 'active' 
            ? 'bg-accent text-gray-900' 
            : 'bg-neutral-200 text-gray-700'
        }`}>
          {admin.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(admin.createdAt)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-neutral-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
              <div className="py-1">
                <button
                  onClick={handleStatusToggle}
                  disabled={loading}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 disabled:opacity-50"
                >
                  {admin.status === 'active' ? (
                    <>
                      <UserX className="h-4 w-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
