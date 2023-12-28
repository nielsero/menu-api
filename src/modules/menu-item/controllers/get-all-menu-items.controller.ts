import { Request, Response } from "express";
import { GetAllMenuItemsService } from "@/modules/menu-item/services";

export class GetAllMenuItemsController {
  constructor(private readonly service: GetAllMenuItemsService) {}

  async handle(req: Request<{ menuId: string }>, res: Response) {
    const { menuId } = req.params;
    const userId = res.locals.userId;
    const response = await this.service.execute({ menuId, userId });
    return res.status(200).json(response);
  }
}
