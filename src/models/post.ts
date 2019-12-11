import mongoose, { Schema } from 'mongoose';
import { type } from 'os';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: {
    type: [
      {
        message: String,
        userId: Schema.Types.ObjectId,
        createdAt: { type: Date, default: Date.now },
        updatedAt: Date
      }
    ],
    required: false
  },
  tags: [{ type: String, required: true }],
  authorId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

const Post = mongoose.model('Post', postSchema);

export { Post };
