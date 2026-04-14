import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Job from '@/models/Job';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const mockJobs = [
  {
    jobName: 'Lead Dental Assistant',
    description: 'We are looking for an experienced Dental Assistant to join our growing practice. Must be proficient in taking X-rays and assisting with four-handed dentistry.',
    company: 'Smile Makers Clinic',
    area: 'New York, NY',
    timeline: 'Immediate',
    tags: ['Assistant', 'Full-time', 'X-ray'],
    status: 'approved',
    category: 'Dental Assistants',
  },
  {
    jobName: 'Dental Hygienist (Part-Time)',
    description: 'Seeking a friendly and thorough Dental Hygienist for our family practice. competitive pay and flexible hours.',
    company: 'Bright Dental',
    area: 'Los Angeles, CA',
    timeline: 'Within 2 weeks',
    tags: ['Hygienist', 'Part-time', 'Family'],
    status: 'approved',
    category: 'Dental Hygienists',
  },
  {
    jobName: 'General Dentist',
    description: 'Growing practice is seeking a full-time General Dentist. State of the art equipment and great team environment.',
    company: 'Elite Care Dental',
    area: 'Chicago, IL',
    timeline: '1 Month',
    tags: ['Dentist', 'Full-time', 'General'],
    status: 'approved',
    category: 'Dentists',
  },
  {
    jobName: 'Front Office Coordinator',
    description: 'Looking for a highly organized individual to manage patient scheduling, billing, and general front office duties.',
    company: 'Dental Works',
    area: 'Austin, TX',
    timeline: 'Immediate',
    tags: ['Front Office', 'Admin', 'Scheduling'],
    status: 'approved',
    category: 'Dental Front Office',
  }
];

export async function GET() {
  try {
    await dbConnect();

    // Create a mock employer
    const existingEmployer = await User.findOne({ email: 'employer@mock.com' });
    let employerId;
    if (!existingEmployer) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const newEmployer = await User.create({
        email: 'employer@mock.com',
        password: hashedPassword,
        role: 'employer',
        employerProfile: {
          name: 'John Doe',
          companyName: 'Smile Makers Clinic',
          age: 40,
          description: 'A mock clinic for testing',
          city: 'New York',
          profession: 'Dentist'
        }
      });
      employerId = newEmployer._id;
    } else {
      employerId = existingEmployer._id;
    }

    // Insert mock jobs
    let count = 0;
    for (const job of mockJobs) {
      const exists = await Job.findOne({ jobName: job.jobName });
      if (!exists) {
        await Job.create({ ...job, employerId });
        count++;
      }
    }

    return NextResponse.json({ message: `Seeded ${count} mock jobs.` }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to seed', error: error.message },
      { status: 500 }
    );
  }
}
