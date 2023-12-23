import { Unauthorized } from "@/shared/errors";
import { buyAuthProviders } from "@/store/auth";
import { buyUserServices } from "@/store/user";
import { Request, Response, NextFunction } from "express";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { tokenProvider } = buyAuthProviders();
  const { getUserByEmailService } = buyUserServices();
  const { authorization } = req.headers;
  if (!authorization) throw new Unauthorized("Authorization token required");
  const token = authorization.split(" ")[1]; // Remove the Bearer part
  const email = await tokenProvider.verify(token);
  const user = await getUserByEmailService.execute({ email });
  if (!user) throw new Unauthorized("Request is not authorized");
  res.locals.userId = user.id; // Instead of req.user
  next();
};

export default requireAuth;
