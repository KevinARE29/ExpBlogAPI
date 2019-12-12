import express from 'express';
import { Post } from './../models/post';
import { generateResponse } from '../utils/utils';

async function getPosts(req: express.Request, res: express.Response): Promise<void> {
  const posts = await Post.find();
  res.send(posts).end();
}

async function createPost(req: express.Request, res: express.Response): Promise<void> {
  try {
    const post = new Post(req.body);
    const newPost = await post.save();
    res.send(newPost).end();
  } catch (error) {
    res
      .status(500)
      .send(error)
      .end();
  }
}

async function getPost(req: express.Request, res: express.Response): Promise<void> {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).end();
  res.send(post).end();
}

async function updatePost(req: express.Request, res: express.Response): Promise<void> {
  try {
    const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true
    });
    if (!post) return generateResponse(res, 404);
    res.send(post).end();
  } catch (error) {
    res
      .status(500)
      .send(error)
      .end();
  }
}

async function deletePost(req: express.Request, res: express.Response): Promise<void> {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    if (!post) return generateResponse(res, 404);
    generateResponse(res, 204);
  } catch (error) {
    res
      .status(500)
      .send(error)
      .end();
  }
}

export { getPosts, createPost, getPost, updatePost, deletePost };
