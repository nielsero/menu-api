import { Request, Response } from "express";
import { EditMenuItemRequest, EditMenuItemService } from "@/modules/menu-item/services";

export class EditMenuItemController {
  constructor(private readonly service: EditMenuItemService) {}

  async handle(
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<{ menuId: string; id: string }, {}, Omit<EditMenuItemRequest, "id" | "userId" | "menuId">>,
    res: Response,
  ) {
    const { menuId, id } = req.params;
    const userId = res.locals.userId;
    const response = await this.service.execute({ ...req.body, id, userId, menuId });
    return res.status(200).send(response);
  }
}
