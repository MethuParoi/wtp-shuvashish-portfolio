import { useState } from 'react';
import { loginAdmin, updateAdminPassword, updatePassword } from '../../../lib/adminService';
import {Button} from '../../ui/Navigation/Button';
import { Eye, EyeOff, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { set } from 'react-hook-form';
import Loader from '@/components/ui/Loader/Loader';

export default function UpdatePasswordModal({ profile, onClose }) {
  const [loading, setLoading] = useState(false);
  const [pwd, setPwd] = useState('');
  const [oldPwd, setOldPwd] = useState('');
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const matchOldPwd = await loginAdmin(profile?.email, oldPwd);
      if (!matchOldPwd) {
        toast.error('Old password does not match');
        setLoading(false);
        throw new Error('Old password does not match');
      }
      if (pwd.length < 8) {
        toast.error('Password must be at least 8 characters long');
        setLoading(false);
        throw new Error('Password must be at least 8 characters long');
      }
      if (pwd === oldPwd) {
        toast.error('New password cannot be the same as old password');
        setLoading(false);
        throw new Error('New password cannot be the same as old password');
      }
      if (matchOldPwd.success === true){
        const res = await updateAdminPassword(profile?.email, pwd);
        if (res.email) {
          // setMsg('Password updated successfully');
          toast.success('Password updated successfully');
          setLoading(false);
          onClose();
        } else {
          setLoading(false);
          throw new Error('Failed to update password');
        }
      }
      
    } catch(err) {
      setMsg(err.message);
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
     <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-10 p-4">
      {/* loader */}
      {loading && (
        <Loader/>
      )}
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-gray-900">Update Password</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      <p className='text-xl text-center font-semibold py-2'>Email: {profile.email}</p>
      <div className="mb-6 flex flex-col items-center">
        {/* old Password */}
        <div className='flex flex-col items-center w-[75%] px-4'>
          <p className='self-start text-lg font-semibold py-2'>Old Password</p>

          <div className='relative w-full'>
          <input 
          type={showOldPassword ? 'text' : 'password'} placeholder="Enter Old Password" value={oldPwd}
          onChange={e=>setOldPwd(e.target.value)}
          className="w-full mb-3 p-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"/>

          <button
            type="button"
            className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-400"
            onClick={() => setShowOldPassword(v => !v)}
            tabIndex={-1}
          >
            {showOldPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          </div>
        </div>
          {/* new password */}
          <div className='flex flex-col items-center w-[75%] px-4'>
          <p className='self-start text-lg font-semibold py-2'>New Password</p>

          <div className='relative w-full'>
          <input
          type={showPassword ? 'text' : 'password'}   
          placeholder="Enter Old Password" value={pwd}
          onChange={e=>setPwd(e.target.value)}
          className="w-full mb-3 p-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"/>

          <button
            type="button"
            className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-400"
            onClick={() => setShowPassword(v => !v)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>          
          </div>
        </div>

        <Button className="my-4" variant="default" size="default" onClick={handleUpdate}>Update Password</Button>
        {msg && <p className="mt-2 text-green-600">{msg}</p>}
      </div>
      </div>
      {/* <div className="mt-6">
        <Button onClick={logoutAdmin}>Logout</Button>
      </div> */}
    </div>
  );
}
