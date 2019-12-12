import express from 'express';
import { validate, Validator } from 'class-validator';
import { generateResponse } from '../utils/utils';

function validateContentType(req: express.Request, res: express.Response, next: Function): void {
  if (['POST', 'PUT'].includes(req.method) && !req.is('json')) return generateResponse(res, 400);
  next();
}

function validateSchema(SchemaClass: any) {
  return async (req: express.Request, res: express.Response, next: Function): Promise<void> => {
    const schema = new SchemaClass(req.body);
    console.log('SCHEMA', schema);
    const schemaErrors = await validate(schema);

    if (schemaErrors.length > 0) return generateResponse(res, 400, undefined, schemaErrors);
    next();
  };
}

// This function validates query.params in routes like: path/:id/path2/:id2 in which,
// all params must be ObjectId of MongoDB
function validateIds(req: express.Request, res: express.Response, next: Function): void {
  const validator = new Validator();
  for (const id in req.params) {
    if (!validator.isMongoId(req.params[id])) {
      const err = [`The URL param: ${req.params[id]}, must be a valid MongoId`];
      return generateResponse(res, 400, undefined, err);
    }
  }
  next();
}

export { validateContentType, validateSchema, validateIds };
