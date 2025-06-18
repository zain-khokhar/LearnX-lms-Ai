import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import User from '@/app/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { pathname } = new URL(request.url);
    const body = await request.json();

    // Signup Route
    if (pathname.endsWith('/signup')) {
      const { name, email, password } = body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      // Create new user
      const user = await User.create({
        name,
        email,
        password,
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      return NextResponse.json(
        { 
          message: 'User created successfully',
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          }
        },
        { status: 201 }
      );
    }

    // Login Route
    if (pathname.endsWith('/login')) {
      const { email, password } = body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      return NextResponse.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid endpoint' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
