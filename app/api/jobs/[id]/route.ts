import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Job from '@/models/Job';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await req.json();
    await dbConnect();

    const job = await Job.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to update job', error: error.message },
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
    const userRole = (session?.user as any)?.role;
    
    if (!session || (userRole !== 'admin' && userRole !== 'employer')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const job = await Job.findById(params.id);
    
    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }
    
    if (userRole === 'employer' && job.employerId.toString() !== (session.user as any).id) {
       return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    await Job.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Job deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to delete job', error: error.message },
      { status: 500 }
    );
  }
}
