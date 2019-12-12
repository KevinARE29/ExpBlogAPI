import express from 'express';
import { Post } from './../models/post';
import { Comment } from './../models/comment';

async function createComment(req: express.Request, res: express.Response): Promise<void> {
  const post = await Post.findById(req.params.post_id);
  if (!post) return res.status(404).end();
  try {
    const comment = new Comment(req.body);
    await Post.findByIdAndUpdate({ _id: req.params.post_id }, { $push: { comments: comment } });
    res.send(comment).end();
    res.end();
  } catch (error) {
    res
      .status(500)
      .send(error)
      .end();
  }
}

async function getComment(req: express.Request, res: express.Response): Promise<void> {
  console.log('getComment', req.params);
  res.end();
}

async function updateComment(req: express.Request, res: express.Response): Promise<void> {
  console.log('updateComment');
  res.end();
}

async function deleteComment(req: express.Request, res: express.Response): Promise<void> {
  console.log('deleteComment');
  res.end();
}

export { createComment, getComment, updateComment, deleteComment };
