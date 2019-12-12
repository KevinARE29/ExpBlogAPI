import mongoose, { Schema } from 'mongoose';

interface CommentI extends mongoose.Document {
  message: string;
  authorId: string;
  createdAt: Date;
  updatedAr: Date;
}

const commentSchema = new mongoose.Schema({
  message: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model<CommentI>('Comment', commentSchema);

export { commentSchema, Comment, CommentI };
