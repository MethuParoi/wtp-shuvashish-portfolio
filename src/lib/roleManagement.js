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


// Delete admin using email
export async function deleteAdminUserByEmail(email) {
  try {
    // Validate input parameters
    if (!email) {
      throw new Error('Email is required for deletion');
    }
    
    if (typeof email !== 'string') {
      throw new Error('Email must be a string');
    }
    
    // Validate environment variables
    if (!DB || !COL) {
      throw new Error('Missing database configuration');
    }
    
    console.log('Attempting to find and delete admin with email:', email);
    
    // First, find the admin document by email
    const admins = await databases.listDocuments(
      DB,
      COL,
      [Query.equal('email', email)]
    );
    
    if (admins.documents.length === 0) {
      throw new Error('Admin user not found with the provided email');
    }
    
    const adminDoc = admins.documents[0];
    const documentId = adminDoc.$id;
    
    console.log('Found admin document with ID:', documentId);
    
    // Delete the admin document using the document ID
    await databases.deleteDocument(DB, COL, documentId);
    
    console.log('Successfully deleted admin with email:', email);
    return { success: true, deletedAdmin: adminDoc };
    
  } catch (error) {
    console.error('Error deleting admin by email:', error);
    
    // Provide more specific error messages
    if (error.code === 404) {
      throw new Error('Admin user not found or already deleted');
    } else if (error.code === 401) {
      throw new Error('Permission denied. Unable to delete admin user');
    } else {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
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

