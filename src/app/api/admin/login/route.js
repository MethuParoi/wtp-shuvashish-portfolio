// app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { account, databases, Query } from '@/lib/appwrite';

const DB = process.env.NEXT_PUBLIC_DATABASE_ID;
const COL = process.env.NEXT_PUBLIC_COLLECTION_ID_ADMINS;

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // First, create Appwrite session (this verifies email/password with Appwrite)
    await account.createSession(email, password);
    
    // Then, get the admin document to verify with our stored hash
    const admins = await databases.listDocuments(
      DB,
      COL,
      [Query.equal('email', email)]
    );
    
    if (admins.documents.length === 0) {
      return NextResponse.json(
        { error: 'Admin not found' }, 
        { status: 404 }
      );
    }
    
    const admin = admins.documents[0];
    
    // Verify password against stored hash
    const isPasswordValid = await bcryptjs.compare(
      password, 
      admin.password
    );
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      admin: { 
        id: admin.$id, 
        email: admin.email,
        userId: admin.userId   // include userId from the document
      }
    });

    
    // return NextResponse.json({ 
    //   success: true, 
    //   admin: { 
    //     id: admin.$id, 
    //     email: admin.email,
    //     // userId: admin.userId
    //   } 
    // });
    
  } catch (error) {
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}


// import { NextResponse } from 'next/server';
// import { account } from '../../../../lib/appwrite';

// export async function POST(req) {
//   const { email, password } = await req.json();
//   try {
//     // Create Appwrite session
//     await account.createSession(email, password);  
//     // Set HTTP-only cookie indicating admin is authenticated
//     const res = NextResponse.json({ success: true });
//     res.cookies.set({ name: 'admin', value: email, httpOnly: true, path: '/' });
//     return res;
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 401 });
//   }
// }
