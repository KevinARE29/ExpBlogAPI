import express from 'express';
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost
} from './../controllers/post';

import { validateSchema } from './../middleware/validator';
import { Post } from './../validators/postSchema';

const router = express.Router();

router.get('/', getPosts);
router.post('/', validateSchema(Post), createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
export default router;
