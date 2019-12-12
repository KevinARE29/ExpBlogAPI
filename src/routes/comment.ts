import express from 'express';
import { createComment, getComment, updateComment, deleteComment } from './../controllers/comment';
import { validateSchema, validateIds } from './../middleware/validator';
import { CreateCommentDTO, UpdateCommentDTO } from '../validators/comment';

const router = express.Router({ mergeParams: true });

router.post('/', validateSchema(CreateCommentDTO), createComment);
router.get('/:commentId', validateIds, getComment);
router.put('/:commentId', validateIds, validateSchema(UpdateCommentDTO), updateComment);
router.delete('/:commentId', validateIds, deleteComment);

export default router;
