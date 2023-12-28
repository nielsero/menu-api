import { Request, Response } from "express";
import { GetAllPublishedMenuItemsService } from "@/modules/menu-item/services";
import { checkRequiredFields } from "@/utils/check-required-fields";

export class GetAllPublishedMenuItemsController {
  constructor(private readonly service: GetAllPublishedMenuItemsService) {}

  async handle(req: Request<{ menuId: string }>, res: Response) {
    const { menuId } = req.params;
    checkRequiredFields({ menuId }, ["menuId"]);
    const menuItems = await this.service.execute({ menuId });
    return res.status(200).json(menuItems);
  }
}
