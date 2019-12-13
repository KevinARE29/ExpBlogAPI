import express from 'express';
import { ValidationError } from 'class-validator';
import { generateResponse } from '../utils/utils';

class ClientError extends Error {
  statusCode: number;
  errors?: string[] | ValidationError[];
  constructor(statusCode: number, message: string, errors?: string[] | ValidationError[]) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

function handleErrors(error: Error, req: express.Request, res: express.Response, next: Function): void {
  if (error instanceof ClientError) return generateResponse(res, error.statusCode, error.message, error.errors);
  next(error);
}

export { handleErrors, ClientError };
