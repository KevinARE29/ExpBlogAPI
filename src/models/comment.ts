import mongoose, { Schema } from 'mongoose';

interface CommentI extends mongoose.Document {
  message: string;
  authorId: string;
}

const commentSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<CommentI>('Comment', commentSchema);

export { commentSchema, Comment, CommentI };
