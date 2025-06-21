import { databases, account, ID, Query, Permission, Role } from './appwrite';
import bcryptjs from 'bcryptjs';

const DB = process.env.NEXT_PUBLIC_DATABASE_ID;
const COL = process.env.NEXT_PUBLIC_COLLECTION_ID_ADMINS;

// Create new admin user
export async function createNewAdmin({ email, password, name, role = 'admin' }) {
  try {
    // Create Appwrite user account
    const userAccount = await account.create(ID.unique(), email, password, name);
    
    // Hash password for database storage
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    
    // Create admin document
    const adminDoc = await databases.createDocument(
      DB,
      COL,
      ID.unique(),
      {
        userId: userAccount.$id,
        email,
        password: hashedPassword,
        name,
        role,
        createdAt: new Date().toISOString(),
        status: 'active'
      },
      [
        Permission.read(Role.any()),
        Permission.update(Role.any())
      ]
    );
    
    return { success: true, admin: adminDoc };
  } catch (error) {
    console.error('Error creating admin:', error);
    throw new Error(`Failed to create ${role}: ${error.message}`);
  }
}

// Create new moderator user
export async function createNewModerator({ email, password, name }) {
  return createNewAdmin({ email, password, name, role: 'moderator' });
}

// Fetch all admins and moderators
export async function fetchAllAdmins() {
  try {
    const response = await databases.listDocuments(
      DB,
      COL,
      [
        Query.orderDesc('createdAt'),
        Query.limit(100)
      ]
    );
    
    return response.documents;
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw new Error('Failed to fetch admin users');
  }
}

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

// Update admin/moderator status
export async function updateAdminStatus(documentId, status) {
  try {
    await databases.updateDocument(
      DB,
      COL,
      documentId,
      { status, updatedAt: new Date().toISOString() }
    );
    return { success: true };
  } catch (error) {
    console.error('Error updating status:', error);
    throw new Error('Failed to update user status');
  }
}
