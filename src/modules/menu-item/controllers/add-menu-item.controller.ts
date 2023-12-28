import { Request, Response } from "express";
import { AddMenuItemRequest, AddMenuItemService } from "@/modules/menu-item/services";

export class AddMenuItemController {
  constructor(private readonly service: AddMenuItemService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{ menuId: string }, {}, Omit<AddMenuItemRequest, "userId">>, res: Response) {
    const { menuId } = req.params;
    const userId = res.locals.userId;
    const response = await this.service.execute({ ...req.body, userId, menuId });
    return res.status(201).json(response);
  }
}
