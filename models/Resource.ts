import mongoose, { Schema, model, models } from 'mongoose';

const ResourceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Resource = models.Resource || model('Resource', ResourceSchema);

export default Resource;
