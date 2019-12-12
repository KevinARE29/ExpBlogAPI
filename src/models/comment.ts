import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
  message: String,
  authorId: Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

export { commentSchema, Comment };
