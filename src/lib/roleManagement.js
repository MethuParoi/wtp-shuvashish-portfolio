import { databases, account, ID, Query, Permission, Role } from './appwrite';

const DB = process.env.NEXT_PUBLIC_DATABASE_ID;
const COL = process.env.NEXT_PUBLIC_COLLECTION_ID_ADMINS;

// Create new admin
export async function createNewAdmin({ email, password, name }) {
  const response = await fetch('/api/manage-role/add-new-admin', {
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

// Create new moderator
export async function createNewModerator({ email, password, name }) {
  const response = await fetch('/api/manage-role/add-new-moderator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create moderator');
  }
  
  return response.json();
}

// Fetch all admins
export async function fetchAllAdmins() {
  try {
    const res = await databases.listDocuments(DB, COL, [
      Query.or([
        Query.equal('role', 'admin'),
        Query.equal('role', 'moderator')
      ])
    ]);
    return res.documents || [];
  } catch (error) {
    console.error('Error fetching admins:', error);
    return [];
  }
}

// export async function fetchAdmins() {
//   try {
//     const res = await databases.listDocuments(DB, COL, [
//       Query.equal('role', ['admin', 'moderator']),
//     ]);
//     return res.documents || [];
//   } catch (error) {
//     console.error('Error fetching admins:', error);
//     return [];
//   }
// }

// Delete admin/moderator
export async function deleteAdminUser(documentId) {
  try {
    await databases.deleteDocument(DB, COL, documentId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting admin:', error);
    throw new Error('Failed to delete user');
  }
}

