import { PostI } from './../models/post';
import { Comment, CommentI } from './../models/comment';
import { CommentType } from './../validators/comment';

async function createComment(post: PostI, body: CommentType): Promise<CommentI> {
  const comment = new Comment(body);
  post.comments.push(comment);
  await post.save();
  return comment;
}

async function getComment(post: PostI, commentId: string): Promise<CommentI | undefined> {
  const comment = post.comments.find(comment => String(comment._id) === commentId);
  return comment;
}

async function updateComment(post: PostI, comment: CommentI, message: string): Promise<void> {
  comment.set({ message: message });
  await post.save();
  return;
}

async function deleteComment(post: PostI, comment: CommentI): Promise<void> {
  comment.remove();
  await post.save();
}

export { createComment, getComment, updateComment, deleteComment };
