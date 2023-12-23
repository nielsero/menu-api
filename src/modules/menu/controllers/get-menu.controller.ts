import { Request, Response } from "express";
import { GetMenuService } from "@/modules/menu/services";

export class GetMenuController {
  constructor(private readonly service: GetMenuService) {}

  async handle(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const userId = res.locals.userId;
    const response = await this.service.execute({ id, userId });
    return res.status(200).json(response);
  }
}
