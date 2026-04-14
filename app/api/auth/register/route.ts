import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role, profileData } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userPayload: any = {
      email,
      password: hashedPassword,
      role,
    };

    if (role === 'seeker') {
      userPayload.seekerProfile = profileData;
    } else if (role === 'employer') {
      userPayload.employerProfile = profileData;
    } else {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    const newUser = await User.create(userPayload);

    return NextResponse.json(
      { message: 'User registered successfully', userId: newUser._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error registering user', error: error.message },
      { status: 500 }
    );
  }
}
