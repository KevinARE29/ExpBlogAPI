import mongoose, { Schema } from 'mongoose';
import { commentSchema, CommentI } from './comment';

interface PostI extends mongoose.Document {
  title: string;
  content: string;
  comments: CommentI[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: {
    type: [commentSchema],
    required: false
  },
  tags: [{ type: String, required: false }],
  authorId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Post = mongoose.model<PostI>('Post', postSchema);

export { Post, PostI };
