import { useState } from 'react';
import { updatePassword, addAdmin, logoutAdmin } from '../../../lib/adminService';
import Button from '../../../components/ui/Navigation/Button';

export default function ProfileForm({ profile }) {
  const [pwd, setPwd] = useState('');
  const [msg, setMsg] = useState('');

  const handleUpdate = async () => {
    try {
      await updatePassword(pwd);
      setMsg('Password updated');
    } catch(err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Profile</h2>
      <p>Email: {profile.email}</p>
      <div className="mt-4">
        <input type="password" placeholder="New Password" value={pwd}
          onChange={e=>setPwd(e.target.value)}
          className="w-full mb-3 p-2 border rounded"/>
        <Button onClick={handleUpdate}>Update Password</Button>
        {msg && <p className="mt-2 text-green-600">{msg}</p>}
      </div>
      <div className="mt-6">
        <Button onClick={logoutAdmin}>Logout</Button>
      </div>
    </div>
  );
}
