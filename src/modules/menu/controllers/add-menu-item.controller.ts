import { Request, Response } from "express";
import { AddMenuItemRequest, AddMenuItemService } from "@/modules/menu/services";
import { checkRequiredFields } from "@/utils";

export class AddMenuItemController {
  constructor(private readonly service: AddMenuItemService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{ id: string }, {}, Omit<AddMenuItemRequest, "userId">>, res: Response) {
    const { id } = req.params;
    const userId = res.locals.userId;
    checkRequiredFields({ ...req.body, menuId: id }, ["name", "price", "type", "menuId"]);
    const response = await this.service.execute({ ...req.body, userId, menuId: id });
    return res.status(201).json(response);
  }
}
