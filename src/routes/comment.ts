import express from 'express';
import { createComment, getComment, updateComment, deleteComment } from './../controllers/comment';

import { validateSchema, validateIds } from './../middleware/validator';
import { CreateCommentDTO } from '../validators/comment';

const router = express.Router({ mergeParams: true });

router.post('/', validateSchema(CreateCommentDTO), createComment);
router.get('/:comment_id', validateIds, getComment);
router.put('/:comment_id', validateIds, updateComment);
router.delete('/:comment_id', validateIds, deleteComment);

export default router;
