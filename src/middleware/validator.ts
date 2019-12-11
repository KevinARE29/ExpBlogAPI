import express from 'express';
import { validate, Validator } from 'class-validator';

function validateContentType(
  req: express.Request,
  res: express.Response,
  next: Function
) {
  if (['POST', 'PUT'].includes(req.method) && !req.is('json'))
    return res.sendStatus(400);
  next();
}

function validateSchema(SchemaClass: any) {
  return async (
    req: express.Request,
    res: express.Response,
    next: Function
  ) => {
    const schema = new SchemaClass(req.body);
    console.log('SCHEMA', schema);
    const result = await validate(schema);

    if (result.length > 0) {
      return res
        .status(400)
        .send({ errors: result })
        .end();
    }

    next();
  };
}

// This function validates query.params in routes like: path/:id/path2/:id2 in which,
// all params must be ObjectId of MongoDB
function validateIds(
  req: express.Request,
  res: express.Response,
  next: Function
) {
  const validator = new Validator();
  for (let id in req.params) {
    if (!validator.isMongoId(req.params[id])) {
      let err = {
        status: 400,
        title: 'Bad Request',
        message: `The URL param: ${req.params.id}, must be a valid MongoId`
      };
      return res
        .status(400)
        .send(err)
        .end();
    }
  }
  next();
}

export { validateContentType, validateSchema, validateIds };
