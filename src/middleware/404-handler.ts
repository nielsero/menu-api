import { NotFound } from "@/shared/errors";
import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  throw new NotFound("Resource not found");
};
