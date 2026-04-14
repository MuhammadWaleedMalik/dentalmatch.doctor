import mongoose, { Schema, model, models } from 'mongoose';

const ApplicationSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    seekerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    whyNeed: { type: String, required: true },
    comfortableWithTime: { type: String, required: true },
    salaryExpectation: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const Application = models.Application || model('Application', ApplicationSchema);

export default Application;
