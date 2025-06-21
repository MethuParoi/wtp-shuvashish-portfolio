import { account, databases, Query } from './appwrite';
import { ID, Permission, Role } from 'appwrite';
import bcryptjs from 'bcryptjs';

const DB = process.env.NEXT_PUBLIC_DATABASE_ID;
const COL = process.env.NEXT_PUBLIC_COLLECTION_ID_ADMINS;


// Register admin through API route (which handles hashing)
export async function createAdmin({ email, password, name }) {
  const response = await fetch('/api/admin/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
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
export async function updateAdminPassword(adminMail, newPassword) {
  try {
    // First, find the admin document by email
    const admins = await databases.listDocuments(
      DB,
      COL,
      [Query.equal('email', adminMail)]
    );
    
    if (admins.documents.length === 0) {
      throw new Error('Admin not found');
    }
    
    const adminDoc = admins.documents[0];
    
    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    
    // Update the admin document with the new password
    const updatedAdmin = await databases.updateDocument(
      DB,
      COL,
      adminDoc.$id, // Use the document ID, not email
      { password: hashedPassword }
      // [
      //   Permission.read(Role.any()),
      //   Permission.update(Role.any())
      // ]
    );
    
    return updatedAdmin;
  } catch (error) {
    console.error('Error updating admin password:', error);
    throw error;
  }
}



// Fetch current admin profile
export async function getAdminProfile(email) {
  const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID_ADMINS;
      
      // if (!databaseId || !collectionId) {
      //   // Check fallback admins
      //   return fallbackadmins.find(admin => admin.slug === slug) || null;
      // }
      
      const res = await databases.listDocuments(databaseId, collectionId, [
        Query.equal('email', email),
      ]);
      
      // If not found in database, check fallback
      // if (!res.documents || res.documents.length === 0) {
      //   return fallbackadmins.find(admin => admin.slug === slug) || null;
      // }
      
      return res.documents[0];
}

// Add additional admin user
export async function addAdmin(email, password) {
  return registerAdmin(email, password);
}
