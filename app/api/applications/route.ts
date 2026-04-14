import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Application from '@/models/Application';
import Job from '@/models/Job';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const userRole = (session.user as any).role;
    const userId = (session.user as any).id;

    let applications = [];

    if (userRole === 'seeker') {
      // Seekers see their own applications
      applications = await Application.find({ seekerId: userId }).populate('jobId').sort({ createdAt: -1 });
    } else if (userRole === 'employer') {
      // Employers see applications for their jobs
      const employerJobs = await Job.find({ employerId: userId }).select('_id');
      const jobIds = employerJobs.map((job) => job._id);
      
      applications = await Application.find({ jobId: { $in: jobIds } })
        .populate('seekerId', 'email seekerProfile')
        .populate('jobId')
        .sort({ createdAt: -1 });
    } else if (userRole === 'admin') {
      // Admin sees all applications
      applications = await Application.find()
        .populate('seekerId', 'email seekerProfile')
        .populate('jobId')
        .sort({ createdAt: -1 });
    }

    return NextResponse.json(applications, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to fetch applications', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'seeker') {
      return NextResponse.json({ message: 'Unauthorized. Only seekers can apply.' }, { status: 401 });
    }

    if ((session.user as any).status === 'banned') {
      return NextResponse.json({ message: 'You are banned coz you violated the terms' }, { status: 403 });
    }

    const currentUserId = (session.user as any).id;
    const data = await req.json();
    await dbConnect();

    // Check if job exists and is approved
    const job = await Job.findById(data.jobId);
    if (!job || job.status !== 'approved') {
      return NextResponse.json({ message: 'Job is not available for applying' }, { status: 400 });
    }

    // Check if already applied
    const existing = await Application.findOne({ jobId: data.jobId, seekerId: currentUserId });
    if (existing) {
       return NextResponse.json({ message: 'Already applied to this job' }, { status: 400 });
    }

    const newApplication = await Application.create({
      ...data,
      seekerId: currentUserId,
      status: 'pending',
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to submit application', error: error.message },
      { status: 500 }
    );
  }
}
