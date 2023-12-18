import { Request, Response } from "express";
import { DeleteMenuItemService } from "../services";
import { checkRequiredFields } from "@/utils";

export class DeleteMenuItemController {
  constructor(private readonly service: DeleteMenuItemService) {}

  async handle(req: Request<{ menuId: string; id: string }>, res: Response) {
    const { menuId, id } = req.params;
    const userId = res.locals.userId;
    checkRequiredFields({ id, menuId }, ["id", "menuId"]);
    await this.service.execute({ id, userId, menuId });
    return res.sendStatus(204);
  }
}
