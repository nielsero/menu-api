import { makeAuth, makeUser } from "@/factories";
import { Unauthorized } from "@/shared/errors";
import { Request, Response, NextFunction } from "express";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { tokenProvider } = makeAuth();
  const { findUserByEmailService } = makeUser();
  const { authorization } = req.headers;
  if (!authorization) throw new Unauthorized("Authorization token required");
  const token = authorization.split(" ")[1]; // Remove the Bearer part
  const email = await tokenProvider.verify(token);
  const user = await findUserByEmailService.execute({ email });
  if (!user) throw new Unauthorized("Request is not authorized");
  res.locals.userId = user.id; // Instead of req.user
  next();
};

export default requireAuth;
