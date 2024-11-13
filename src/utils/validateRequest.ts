import { Request } from "express";
import { validationResult } from "express-validator";
import ValidationException from "./validationException";

const ValidateRequest = (req: Request) => {
  //checking for errors from the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`Middleware error ..................${JSON.stringify(errors)}`);
    return new ValidationException(errors.array());
  }
  return false;
};

export default ValidateRequest;