import { Request, Response } from "express";
import { GetAllMenusService } from "@/modules/menu/services";

export class GetAllMenusController {
  constructor(private readonly service: GetAllMenusService) {}

  async handle(req: Request, res: Response) {
    const userId = res.locals.userId;
    const response = await this.service.execute({ userId });
    return res.status(200).json(response);
  }
}
