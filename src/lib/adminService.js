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


// export async function registerAdmin(email, password) {
//   // Create appwrite account
//   await account.create('unique()', email, password);
//   // Create admin record
//   return databases.createDocument(DB, COL, ID.unique(), {
//     email, role: 'superadmin', createdAt: new Date().toISOString()
//   }, [Permission.read(Role.user(email)), Permission.update(Role.user(email))]);
// }

// Login
// export async function loginAdmin(email, password) {
//   return account.createSession(email, password);
// }

// // Logout
// export async function logoutAdmin() {
//   return account.deleteSession('current');
// }

// // Update password
// export async function updatePassword(password) {
//   return account.updatePassword(password, '', '');
// }

// // Fetch current admin profile
// export async function getAdminProfile() {
//   return account.get();
// }

// // Add additional admin user
// export async function addAdmin(email, password) {
//   return registerAdmin(email, password);
// }
