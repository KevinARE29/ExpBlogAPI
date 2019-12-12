import express from 'express';
import { Post } from './../models/post';
import { Comment } from './../models/comment';

async function createComment(req: express.Request, res: express.Response): Promise<void> {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).end();
  const comment = new Comment(req.body);
  post.comments.push(comment);
  await post.save();
  return res.send(comment).end();
}

async function getComment(req: express.Request, res: express.Response): Promise<void> {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).end();
  const comment = post.comments.find(comment => String(comment._id) === req.params.commentId);
  if (!comment) return res.status(404).end();
  return res.send(comment).end();
}

async function updateComment(req: express.Request, res: express.Response): Promise<void> {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).end();
  const comment = post.comments.find(comment => String(comment._id) === req.params.commentId);
  if (!comment) return res.status(404).end();
  comment.set({ message: req.body.message });
  await post.save();
  return res.send(comment).end();
}

async function deleteComment(req: express.Request, res: express.Response): Promise<void> {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).end();
  const comment = post.comments.find(comment => String(comment._id) === req.params.commentId);
  if (!comment) return res.status(404).end();
  comment.remove();
  await post.save();
  return res.status(204).end();
}

export { createComment, getComment, updateComment, deleteComment };
