import { BadRequest, ValidationError } from "@/shared/errors";
import { NextFunction, Request, Response } from "express";

export const domainErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) throw new BadRequest(err.message);
  throw err;
};
