import { NextResponse } from 'next/server';
import { account } from '../../../../lib/appwrite';

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    // Create Appwrite session
    await account.createSession(email, password);  
    // Set HTTP-only cookie indicating admin is authenticated
    const res = NextResponse.json({ success: true });
    res.cookies.set({ name: 'admin', value: email, httpOnly: true, path: '/' });
    return res;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
