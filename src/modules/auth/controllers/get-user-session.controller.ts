import { Request, Response } from "express";
import { GetUserSessionService } from "@/modules/auth/services";

export class GetUserSessionController {
  constructor(private readonly service: GetUserSessionService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{}, {}, {}>, res: Response) {
    const userId = res.locals.userId;
    const response = await this.service.execute({ userId });
    return res.status(200).json(response);
  }
}
