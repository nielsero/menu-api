import {
  DuplicateMenuName,
  InvalidCredentials,
  MenuNotFound,
  NotFound,
  Unauthorized,
  UserAlreadyExists,
  UserNotFound,
} from "@/shared/errors";
import { BadRequest, Conflict, ValidationError } from "@/shared/errors";
import { NextFunction, Request, Response } from "express";

export const domainErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) throw new BadRequest(err.message);
  if (err instanceof UserAlreadyExists) throw new Conflict(err.message);
  if (err instanceof InvalidCredentials) throw new Unauthorized(err.message);
  if (err instanceof UserNotFound) throw new NotFound(err.message);
  if (err instanceof DuplicateMenuName) throw new Conflict(err.message);
  if (err instanceof MenuNotFound) throw new NotFound(err.message);
  throw err;
};
