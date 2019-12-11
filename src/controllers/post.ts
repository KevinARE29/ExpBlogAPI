import express from 'express';
import { Post } from './../models/post';

async function getPosts(req: express.Request, res: express.Response) {
  const posts = await Post.find();
  res.send(posts).end();
}

async function createPost(req: express.Request, res: express.Response) {
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

async function getPost(req: express.Request, res: express.Response) {
  let post = await Post.findById(req.params.id);
  if (!post) return res.status(404).end();
  res.send(post).end();
}

async function updatePost(req: express.Request, res: express.Response) {
  try {
    let post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!post) return res.status(404).end();
    res.send(post).end();
  } catch (error) {
    res
      .status(500)
      .send(error)
      .end();
  }
}

async function deletePost(req: express.Request, res: express.Response) {
  try {
    let post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).end();
    res.status(204).end();
  } catch (error) {
    res
      .status(500)
      .send(error)
      .end();
  }
}

export { getPosts, createPost, getPost, updatePost, deletePost };
