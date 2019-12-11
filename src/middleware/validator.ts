import express from 'express';
import { validate } from 'class-validator';

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
    console.log(schema);
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

export { validateContentType, validateSchema };
