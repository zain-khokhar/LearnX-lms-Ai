import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function verifyAuth(token) {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Helper function to verify request auth
export async function verifyAuthRequest(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return false;
    }
    await verifyAuth(token);
    return true;
  } catch (error) {
    return false;
  }
}
