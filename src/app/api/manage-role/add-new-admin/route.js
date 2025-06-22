import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { Client, Databases, Account, ID, Permission, Role } from 'appwrite';

const DB = process.env.NEXT_PUBLIC_DATABASE_ID;
const COL = process.env.NEXT_PUBLIC_COLLECTION_ID_ADMINS;

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();
    
    // Initialize Appwrite client
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);
    
    const databases = new Databases(client);
    const account = new Account(client);

    // Create Appwrite user account
    const userAccount = await account.create(
      ID.unique(), 
      email, 
      password,
      name
    );
    
    // Hash password for database storage
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    
    // Create admin document with server-side permissions
    await databases.createDocument(
      DB,
      COL,
      ID.unique(),
      {
        userId: userAccount.$id,
        email,
        password: hashedPassword,
        name,
        role: 'admin', 
        createdAt: new Date().toISOString()
      },
      [
        // Use Role.any() for client-side permissions
        Permission.read(Role.any()),
        Permission.update(Role.any())
      ]
    );
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
