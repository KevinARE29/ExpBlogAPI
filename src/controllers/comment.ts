import express from 'express';

async function createComment(req: express.Request, res: express.Response) {
  console.log('Create Comment');
}

async function getComment(req: express.Request, res: express.Response) {
  console.log('getComment', req.params);
}

async function updateComment(req: express.Request, res: express.Response) {
  console.log('updatePost');
}

async function deleteComment(req: express.Request, res: express.Response) {
  console.log('deletePost');
}

export { createComment, getComment, updateComment, deleteComment };
