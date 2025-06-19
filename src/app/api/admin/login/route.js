// app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { account, databases, Query } from '@/lib/appwrite';

const DB = process.env.NEXT_PUBLIC_DATABASE_ID;
const COL = process.env.NEXT_PUBLIC_COLLECTION_ID_ADMINS;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Wrong: treats 'email' as a userId
    // await account.createSession(email, password);
    // Right: create an email/password session
    // const session = await account.createEmailSession(email, password);

    // Fetch your admin record to verify role/etc
    const admins = await databases.listDocuments(
      DB,
      COL,
      [ Query.equal('email', email) ]
    );

    if (admins.documents.length === 0) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    const admin = admins.documents[0];

    // Double‑check against your own bcrypt hash (optional)
    const isPasswordValid = await bcryptjs.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: {
        id:     admin.$id,
        email:  admin.email,
        // Use the Appwrite session ID (always a valid 36‑char string)
        // userId: session.$id,
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

