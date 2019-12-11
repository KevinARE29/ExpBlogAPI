import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
  message: String,
  authorId: Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export { commentSchema };
