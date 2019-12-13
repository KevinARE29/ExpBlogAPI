import express from 'express';
import { getPosts, createPost, getPost, updatePost, deletePost } from '../services/post';
import commentRoutes from './comment';
import { validateSchema, validateIds } from '../middleware/validator';
import { CreatePostDTO, UpdatePostDTO, PostType } from '../validators/post';
import { generateResponse } from '../utils/utils';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const posts = await getPosts();
  res.send(posts).end();
});

router.post('/', validateSchema(CreatePostDTO), async (req: express.Request, res: express.Response) => {
  const newPost = await createPost(req.body as PostType);
  res.send(newPost).end();
});

router.get('/:postId', validateIds, async (req: express.Request, res: express.Response) => {
  const post = await getPost(req.params.postId);
  if (!post) return generateResponse(res, 404);
  res.send(post).end();
});

router.put(
  '/:postId',
  validateIds,
  validateSchema(UpdatePostDTO),
  async (req: express.Request, res: express.Response) => {
    const post = await updatePost(req.params.postId, req.body as PostType);
    if (!post) return generateResponse(res, 404);
    res.send(post).end();
  }
);

router.delete('/:postId', validateIds, async (req: express.Request, res: express.Response) => {
  const post = await deletePost(req.params.postId);
  if (!post) return generateResponse(res, 404);
  generateResponse(res, 204);
});

router.use('/:postId/comments', commentRoutes);

export default router;
