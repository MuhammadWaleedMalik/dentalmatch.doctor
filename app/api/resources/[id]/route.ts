import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Resource from '@/models/Resource';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    await Resource.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Resource deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to delete resource', error: error.message }, { status: 500 });
  }
}
