import { HttpError } from "@/shared/errors";
import { logger } from "@/utils";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError)
    return res.status(err.code).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });

  logger.error(`[error-handler] ${err.message}`); // WTFError

  return res.status(500).json({
    error: {
      code: 500,
      message: "Something went wrong",
    },
  });
};
