import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['seeker', 'employer', 'admin'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'banned'],
      default: 'active',
    },
    seekerProfile: {
      name: String,
      age: Number,
      profession: String,
      description: String,
      location: String,
    },
    employerProfile: {
      name: String,
      companyName: String,
      age: Number,
      description: String,
      city: String,
      profession: String,
    },
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);

export default User;
