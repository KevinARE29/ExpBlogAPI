import express from 'express';
import { validate, Validator } from 'class-validator';
import { ClientError } from '../middleware/errorHandler';

function validateContentType(req: express.Request, res: express.Response, next: Function): void {
  if (['POST', 'PUT'].includes(req.method) && !req.is('json')) {
    const error = new ClientError(400, 'Content-Type must be application/json');
    next(error);
  }
  next();
}

function validateSchema(SchemaClass: any) {
  return async (req: express.Request, res: express.Response, next: Function): Promise<void> => {
    const schema = new SchemaClass(req.body);
    const schemaErrors = await validate(schema);
    if (schemaErrors.length > 0) {
      const error = new ClientError(400, 'Bad Request', schemaErrors);
      next(error);
    }
    next();
  };
}

// This function validates query.params in routes like: path/:id/path2/:id2 in which,
// all params must be ObjectId of MongoDB
function validateIds(req: express.Request, res: express.Response, next: Function): void {
  const validator = new Validator();
  for (const id in req.params) {
    if (!validator.isMongoId(req.params[id])) {
      const error = new ClientError(400, `The URL param: ${req.params[id]}, must be a valid MongoId`);
      next(error);
    }
  }
  next();
}

export { validateContentType, validateSchema, validateIds };
