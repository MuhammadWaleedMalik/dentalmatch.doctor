import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Resource from '@/models/Resource';

export async function GET() {
  try {
    await dbConnect();
    const resources = await Resource.find().sort({ createdAt: -1 });
    return NextResponse.json(resources, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to fetch resources', error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await dbConnect();

    const newResource = await Resource.create({
      ...data,
      addedBy: (session.user as any).id,
    });
    return NextResponse.json(newResource, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to create resource', error: error.message }, { status: 500 });
  }
}
