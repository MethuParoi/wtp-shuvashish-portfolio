'use client';
import { useState, useEffect } from 'react';
import { getAdminProfile, updatePassword, logoutAdmin } from '../../../lib/adminService';
import ProfileForm from '../../../components/admin/ProfileForm';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  useEffect(() => { getAdminProfile().then(setProfile); }, []);

  return profile ? <ProfileForm profile={profile}/> : <div>Loading...</div>;
}
