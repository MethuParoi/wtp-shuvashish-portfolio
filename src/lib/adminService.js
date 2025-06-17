import { account, databases } from './appwrite';
import { ID, Permission, Role } from 'appwrite';

const DB = process.env.NEXT_PUBLIC_DATABASE_ID;
const COL = process.env.NEXT_PUBLIC_COLLECTION_ID_ADMINS;

// Register first admin (database document + account creation)
export async function createAdmin({ email, password }) {
  // Create Appwrite account session
  await account.create(email, password) 
    .catch(err => { throw new Error(err.message); });
  // Store admin record in database
  return databases.createDocument(
    DB, COL, 'unique()', { email, createdAt: new Date().toISOString() },
    [Permission.read(Role.user(email)), Permission.update(Role.user(email))]
  );
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
export async function loginAdmin(email, password) {
  return account.createSession(email, password);
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
