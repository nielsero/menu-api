import { Request, Response } from "express";
import { GetMenuItemService } from "@/modules/menu-item/services";

export class GetMenuItemController {
  constructor(private readonly service: GetMenuItemService) {}

  async handle(req: Request<{ menuId: string; id: string }>, res: Response) {
    const { menuId, id } = req.params;
    const userId = res.locals.userId;
    const response = await this.service.execute({ id, userId, menuId });
    return res.status(200).json(response);
  }
}
