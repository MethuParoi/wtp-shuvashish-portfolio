'use client';
import { useState, useEffect } from 'react';
import { Plus, Users, Shield, UserPlus } from 'lucide-react';
import AdminTable from './AdminTable';
import AddAdminModal from './AddAdminModal';
import AddModeratorModal from './AddModeratorModal';
import { toast } from 'react-toastify';
import Loader from '@/components/ui/Loader/Loader';
import { fetchAllAdmins } from '@/lib/roleManagement';

export default function AdminManagement() {
  const [reloadAdmins, setReloadAdmins] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showAddModeratorModal, setShowAddModeratorModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    loadAdmins();
  }, [reloadAdmins]);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const data = await fetchAllAdmins();
      console.log('Fetched admins:', data);
      setAdmins(data);
    } catch (error) {
      toast.error('Failed to load admin users');
      console.error('Error loading admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = (newAdmin) => {
    setAdmins(prev => [newAdmin, ...prev]);
    setShowAddAdminModal(false);
    // toast.success('Admin created successfully');
  };

  const handleAddModerator = (newModerator) => {
    setAdmins(prev => [newModerator, ...prev]);
    setShowAddModeratorModal(false);
    // toast.success('Moderator created successfully');
  };

  const handleDeleteUser = (deletedUserId) => {
    setAdmins(prev => prev.filter(admin => admin.$id !== deletedUserId));
    toast.success('User deleted successfully');
  };

  // Filter admins based on search and role
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || admin.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const adminCount = admins.filter(admin => admin?.role === 'admin').length;
  const moderatorCount = admins.filter(admin => admin?.role === 'moderator').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin & Moderator Management</h1>
        <p className="text-gray-600">Manage admin users and moderators for your portfolio system.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-primary-50">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{adminCount+1}</h3>
              <p className="text-sm text-gray-600">Total Admins</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-secondary-50">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{moderatorCount}</h3>
              <p className="text-sm text-gray-600">Total Moderators</p>
            </div>
          </div>
        </div>

        {/* <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-accent-50">
              <UserPlus className="h-6 w-6 text-accent" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{admins.length+1}</h3>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Action Buttons and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins Only</option>
              <option value="moderator">Moderators Only</option>
            </select>
          </div>

          {/* Add Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddModeratorModal(true)}
              className="inline-flex items-center px-4 py-2 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-hover transition-colors"
            >
              <Users className="h-4 w-4 mr-2" />
              Add Moderator
            </button>
            
            <button
              onClick={() => setShowAddAdminModal(true)}
              className="inline-flex items-center px-4 py-2 bg-primary text-gray-900 font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              <Shield className="h-4 w-4 mr-2" />
              Add Admin
            </button>
          </div>
        </div>
      </div>

      {/* Admin Table */}
      <AdminTable 
        admins={filteredAdmins} 
        onDeleteUser={handleDeleteUser}
        onRefresh={loadAdmins}
      />

      {/* Modals */}
      {showAddAdminModal && (
        <AddAdminModal
          setReloadAdmins={setReloadAdmins}
          onAddAdmin={handleAddAdmin}
          onClose={() => setShowAddAdminModal(false)}
        />
      )}

      {showAddModeratorModal && (
        <AddModeratorModal
          setReloadAdmins={setReloadAdmins}
          onAddModerator={handleAddModerator}
          onClose={() => setShowAddModeratorModal(false)}
        />
      )}
    </div>
  );
}
