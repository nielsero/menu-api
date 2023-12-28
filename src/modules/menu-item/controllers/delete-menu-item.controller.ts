import { Request, Response } from "express";
import { DeleteMenuItemService } from "@/modules/menu-item/services";

export class DeleteMenuItemController {
  constructor(private readonly service: DeleteMenuItemService) {}

  async handle(req: Request<{ menuId: string; id: string }>, res: Response) {
    const { menuId, id } = req.params;
    const userId = res.locals.userId;
    await this.service.execute({ id, userId, menuId });
    return res.sendStatus(204);
  }
}
