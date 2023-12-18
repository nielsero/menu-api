import { Request, Response } from "express";
import { checkRequiredFields } from "@/utils";
import { GetMenuItemService } from "../services";

export class GetMenuItemController {
  constructor(private readonly service: GetMenuItemService) {}

  async handle(req: Request<{ menuId: string; id: string }>, res: Response) {
    const { menuId, id } = req.params;
    const userId = res.locals.userId;
    checkRequiredFields({ id, menuId }, ["id", "menuId"]);
    const menuItem = await this.service.execute({ id, userId, menuId });
    return res.status(200).json(menuItem);
  }
}
