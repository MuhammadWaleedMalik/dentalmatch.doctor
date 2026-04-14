import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Application from '@/models/Application';
import Job from '@/models/Job';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'employer') {
       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await req.json(); // Usually 'approved' or 'rejected'
    await dbConnect();

    const application = await Application.findById(params.id).populate('jobId');
    if (!application) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    // Check if the current employer owns the job
    const job = await Job.findById(application.jobId._id);
    if (!job || job.employerId.toString() !== (session.user as any).id) {
       return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    application.status = status;
    await application.save();

    // specific business logic: if employer approves application, the job becomes "filled"
    if (status === 'approved') {
       job.status = 'filled';
       await job.save();
       // Depending on business rules, we might want to reject other pending applications for this job here.
    }

    return NextResponse.json(application, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to update application', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'seeker') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const application = await Application.findById(params.id);
    if (!application) {
       return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    if (application.seekerId.toString() !== (session.user as any).id) {
       return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    await Application.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Application withdrawn' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to withdraw application', error: error.message },
      { status: 500 }
    );
  }
}
