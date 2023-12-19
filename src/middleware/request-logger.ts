import { logger } from "@/utils/log";
import { NextFunction, Request, Response } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`[request-logger] ${req.method} ${req.path}`);
  next();
};
