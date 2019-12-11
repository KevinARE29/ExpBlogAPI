import express from 'express';
import {
  createComment,
  getComment,
  updateComment,
  deleteComment
} from './../controllers/comment';

import { validateSchema } from './../middleware/validator';
import { CreateCommentDTO } from '../validators/comment';

const router = express.Router();

router.post('/', validateSchema(CreateCommentDTO), createComment);
router.get('/:id', getComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
