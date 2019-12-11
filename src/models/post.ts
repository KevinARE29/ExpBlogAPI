import mongoose, { Schema } from 'mongoose';
import { commentSchema } from './comment';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: {
    type: [commentSchema],
    required: true
  },
  tags: [{ type: String, required: false }],
  authorId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

export { Post };
