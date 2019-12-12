import express from 'express';
import { ValidationError } from 'class-validator';

interface ResponseI {
  status: number;
  message?: string;
  errors?: ValidationError[] | string[];
}

enum RESPONSE_CODES {
  'Not Content' = 204,
  'Bad Request' = 400,
  'Not Found' = 404,
  'Method not Allowed' = 405,
  'Internal Server Error' = 500
}

/* 
  This function adds the status code and message for a given response. 
  If the message isn't specified in the arguments, the default message of the status code 
  will be added to the response */
function generateResponse(
  res: express.Response,
  code: number,
  message?: string,
  errors?: ValidationError[] | string[]
): void {
  const response: ResponseI = { status: code, message: message ? message : RESPONSE_CODES[code] };
  if (errors) {
    response.errors = errors;
  }
  return res
    .status(code)
    .send(response)
    .end();
}

export { generateResponse };
