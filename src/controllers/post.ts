import express from 'express';
import { Post, PostI } from './../models/post';
import { generateResponse } from '../utils/utils';

async function getPosts(): Promise<PostI[]> {
  const posts = await Post.find();
  return posts;
}

async function createPost(body: any): Promise<PostI> {
  const post = new Post(body);
  const newPost = await post.save();
  return newPost;
}

async function getPost(postId: string): Promise<PostI | null> {
  const post = await Post.findById(postId);
  return post;
}

async function updatePost(postId: string, body: any): Promise<PostI | null> {
  const post = await Post.findByIdAndUpdate(postId, body, {
    new: true
  });
  return post;
}

async function deletePost(postId: string): Promise<PostI | null> {
  const post = await Post.findByIdAndDelete(postId);
  return post;
}

export { getPosts, createPost, getPost, updatePost, deletePost };
