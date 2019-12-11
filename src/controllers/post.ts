import express from 'express';
import { Post } from './../models/post';

async function getPosts(req: express.Request, res: express.Response) {
  const posts = await Post.find();
  console.log(posts);
  res.send(posts);
  res.end();
}

async function createPost(req: express.Request, res: express.Response) {
  try {
    const post = new Post(req.body);
    const result = await post.save();
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
}

async function getPost(req: express.Request, res: express.Response) {
  console.log('getPost', req.params.id);
}

async function updatePost(req: express.Request, res: express.Response) {
  console.log('updatePost');
}

async function deletePost(req: express.Request, res: express.Response) {
  console.log('deletePost');
}

export { getPosts, createPost, getPost, updatePost, deletePost };
