import express from 'express';
import { createComment, getComment, updateComment, deleteComment } from './../controllers/comment';
import { getPost } from './../controllers/post';
import { validateSchema, validateIds } from './../middleware/validator';
import { CreateCommentDTO, UpdateCommentDTO, CommentType } from '../validators/comment';
import { generateResponse } from '../utils/utils';

const router = express.Router({ mergeParams: true });

router.post('/', validateIds, validateSchema(CreateCommentDTO), async (req: express.Request, res: express.Response) => {
  const post = await getPost(req.params.postId);
  if (!post) return generateResponse(res, 404);
  const comment = await createComment(post, req.body as CommentType);
  res.send(comment).end();
});
router.get('/:commentId', validateIds, async (req: express.Request, res: express.Response) => {
  const post = await getPost(req.params.postId);
  if (!post) return generateResponse(res, 404);
  const comment = await getComment(post, req.params.commentId);
  if (!comment) return generateResponse(res, 404);
  res.send(comment).end();
});
router.put(
  '/:commentId',
  validateIds,
  validateSchema(UpdateCommentDTO),
  async (req: express.Request, res: express.Response) => {
    const post = await getPost(req.params.postId);
    if (!post) return generateResponse(res, 404);
    const comment = await getComment(post, req.params.commentId);
    if (!comment) return generateResponse(res, 404);
    await updateComment(post, comment, req.body.message);
    res.send(comment).end();
  }
);
router.delete('/:commentId', validateIds, async (req: express.Request, res: express.Response) => {
  const post = await getPost(req.params.postId);
  if (!post) return res.status(404).end();
  const comment = await getComment(post, req.params.commentId);
  if (!comment) return generateResponse(res, 404);
  await deleteComment(post, comment);
  res.status(204).end();
});

export default router;
