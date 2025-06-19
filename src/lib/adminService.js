import { account, databases } from './appwrite';
import { ID, Permission, Role } from 'appwrite';

const DB = process.env.NEXT_PUBLIC_DATABASE_ID;
const COL = process.env.NEXT_PUBLIC_COLLECTION_ID_ADMINS;


// Register admin through API route (which handles hashing)
export async function createAdmin({ email, password }) {
  const response = await fetch('/api/admin/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create admin');
  }
  
  return response.json();
}


// Change signature to accept (email, password)
export async function loginAdmin(email, password) {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to login admin');
  }
  return response.json();
}

//fetch all admins
export async function fetchAdmins() {
  try {
    const res = await databases.listDocuments(DB, COL);
    return res.documents || [];
  } catch (error) {
    console.error('Error fetching admins:', error);
    return [];
  }
}

//update admin password
export async function updateAdminPassword(adminId, oldPassword, newPassword) {
  try {
    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    
    // Update the admin document with the new password
    const updatedAdmin = await databases.updateDocument(
      DB,
      COL,
      adminId,
      { password: hashedPassword },
      [
        Permission.read(Role.any()),
        Permission.update(Role.any())
      ]
    );
    
    return updatedAdmin;
  } catch (error) {
    console.error('Error updating admin password:', error);
    throw error;
  }
}



// Logout
export async function logoutAdmin() {
  return account.deleteSession('current');
}

// Update password
export async function updatePassword(password) {
  return account.updatePassword(password, '', '');
}

// Fetch current admin profile
export async function getAdminProfile() {
  return account.get();
}

// Add additional admin user
export async function addAdmin(email, password) {
  return registerAdmin(email, password);
}
