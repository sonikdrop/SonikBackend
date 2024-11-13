// middleware/validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import ValidateRequest from '../utils/validateRequest';

const validationResponse = (req: Request, res: Response, next: NextFunction) => {
  const errors = ValidateRequest(req);
  if (errors) {
    return next(errors); // Pass errors to the next middleware, which can handle the response
  }
  next(); // Proceed if no errors
};

export default validationResponse;
