import { NextResponse } from 'next/server';
import { account } from '../../../../lib/appwrite';

export async function POST() {
  try {
    await account.deleteSession('current');  
  } catch (_) { /* ignore errors */ }
  // Clear cookie
  const res = NextResponse.json({ success: true });
  res.cookies.delete('admin', { path: '/' });
  return res;
}
