import express from 'express';
import { getPosts, createPost, getPost, updatePost, deletePost } from './../controllers/post';
import commentRoutes from './comment';
import { validateSchema, validateIds } from './../middleware/validator';
import { CreatePostDTO, UpdatePostDTO } from '../validators/post';

const router = express.Router();

router.get('/', getPosts);
router.post('/', validateSchema(CreatePostDTO), createPost);
router.get('/:post_id', validateIds, getPost);
router.put('/:post_id', validateIds, validateSchema(UpdatePostDTO), updatePost);
router.delete('/:post_id', validateIds, deletePost);

router.use('/:post_id/comments', commentRoutes);
export default router;
