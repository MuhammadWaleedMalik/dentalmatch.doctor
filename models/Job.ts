import mongoose, { Schema, model, models } from 'mongoose';

export const jobCategories = [
  'Dental Assistants',
  'Dental Front Office',
  'Dental Hygienists',
  'Dentists',
  'Dental Lab Technicians',
  'Dental Sales Rep',
];

const JobSchema = new Schema(
  {
    jobName: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    area: { type: String, required: true },
    timeline: { type: String, required: true },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'filled'],
      default: 'pending',
    },
    category: {
      type: String,
      enum: jobCategories,
      required: true,
    },
    employerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Job = models.Job || model('Job', JobSchema);

export default Job;
