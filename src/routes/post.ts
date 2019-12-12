import express from 'express';
import { getPosts, createPost, getPost, updatePost, deletePost } from './../controllers/post';
import commentRoutes from './comment';
import { validateSchema, validateIds } from './../middleware/validator';
import { CreatePostDTO, UpdatePostDTO } from '../validators/post';

const router = express.Router();

router.get('/', getPosts);
router.post('/', validateSchema(CreatePostDTO), createPost);
router.get('/:postId', validateIds, getPost);
router.put('/:postId', validateIds, validateSchema(UpdatePostDTO), updatePost);
router.delete('/:postId', validateIds, deletePost);

router.use('/:postId/comments', commentRoutes);

export default router;
