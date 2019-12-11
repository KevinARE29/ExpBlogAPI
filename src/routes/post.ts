import express from 'express';
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost
} from './../controllers/post';
import commentRoutes from './comment';
import { validateSchema, validateIds } from './../middleware/validator';
import { CreatePostDTO, UpdatePostDTO } from '../validators/post';

const router = express.Router();

router.get('/', getPosts);
router.post('/', validateSchema(CreatePostDTO), createPost);
router.get('/:id', validateIds, getPost);
router.put('/:id', validateIds, validateSchema(UpdatePostDTO), updatePost);
router.delete('/:id', validateIds, deletePost);

router.use('/:id/comments', commentRoutes);
export default router;
