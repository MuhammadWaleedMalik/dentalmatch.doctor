import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Job from '@/models/Job';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const employerId = searchParams.get('employerId');

    const query: any = {};
    if (status) query.status = status;
    if (employerId) query.employerId = employerId;

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to fetch jobs', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'employer') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if ((session.user as any).status === 'banned') {
      return NextResponse.json({ message: 'You are banned coz you violated the terms' }, { status: 403 });
    }

    const data = await req.json();
    await dbConnect();

    // Force pending status and set employerId
    const newJob = await Job.create({
      ...data,
      employerId: (session.user as any).id,
      status: 'pending',
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error: any) {
    console.error('Job creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create job', error: error.message },
      { status: 500 }
    );
  }
}
