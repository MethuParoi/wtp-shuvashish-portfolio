'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, MapPin, Mail, Phone, Globe, Shield, Calendar, User } from 'lucide-react';
import EditProfileModal from './EditProfileModal';
import { getAdminProfile, logoutAdmin } from '@/lib/adminService';
import { toast } from 'react-toastify';
import Loader from '@/components/ui/Loader/Loader';
import { Button } from '@/components/ui/Navigation/Button';

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the email from the cookie
    const adminCookie = document.cookie.split('; ').find(row => row.startsWith('registered='));
    if (adminCookie) {
      const email = adminCookie.split('=')[1];
      loadProfile(email);
    }
  }, []);

  const loadProfile = async (email) => {
    try {
      setLoading(true);
      const data = await getAdminProfile(email);
      // console.log('Profile data:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      document.cookie = 'admin=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      router.push('/admin-login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    setShowEditModal(false);
    toast.success('Profile updated successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <div className="relative h-64 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-16 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-20 right-24 w-8 h-8 bg-white rounded-full"></div>
          <div className="absolute bottom-16 left-32 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-16 w-6 h-6 bg-white rounded-full"></div>
        </div>

        {/* Edit Profile Button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setShowEditModal(true)}
            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-md"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>

        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-8">
          <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name || 'Admin'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <User className="h-16 w-16 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-20 pb-8 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Name and Basic Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {profile?.name || 'Admin User'}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{profile?.location || 'Location not specified'}</span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {/* <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                <span className="text-gray-600">Age : </span>
                <span className="font-medium ml-1">{profile?.age || 'N/A'}</span>
              </div>
              
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1 text-gray-400" />
                <span className="text-gray-600">Gender : </span>
                <span className="font-medium ml-1">{profile?.gender || 'N/A'}</span>
              </div> */}
              
              <div className="flex items-center">
                <span className="text-gray-600">Status : </span>
                <span className="font-medium ml-1 text-accent">Active*</span>
              </div>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-primary mr-3" />
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Role</h3>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {profile?.role || 'Administrator'}
              </p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
              <div className="flex items-center mb-3">
                <Mail className="h-5 w-5 text-secondary mr-3" />
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</h3>
              </div>
              <p className="text-lg font-semibold text-gray-900 break-all">
                {profile?.email || 'Not specified'}
              </p>
            </div>

            {/* Contact */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
              <div className="flex items-center mb-3">
                <Phone className="h-5 w-5 text-accent mr-3" />
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contact</h3>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {profile?.phone || 'Not specified'}
              </p>
            </div> */}

            {/* Region */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
              <div className="flex items-center mb-3">
                <Globe className="h-5 w-5 text-neutral-600 mr-3" />
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Region</h3>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {profile?.region || 'Not specified'}
              </p>
            </div> */}
          </div> 

          {/* Account Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => {
                                document.cookie = "registered=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; sameSite=strict";
                                toast.success("Logged out successfully!");
                                router.push("/admin-login"); // Redirect to login page
                              }} 
              variant="destructive"
              size="default"
              className=""
              // className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </Button>
            
            <Button
              onClick={() => router.push('/admin')}
              variant="outline"
              size="default"
              
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onSave={handleProfileUpdate}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
