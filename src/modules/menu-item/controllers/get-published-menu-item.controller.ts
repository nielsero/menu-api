import { Request, Response } from "express";
import { GetPublishedMenuItemService } from "@/modules/menu-item/services";

export class GetPublishedMenuItemController {
  constructor(private readonly service: GetPublishedMenuItemService) {}

  async handle(req: Request<{ menuId: string; id: string }>, res: Response) {
    const { menuId, id } = req.params;
    const response = await this.service.execute({ menuId, id });
    return res.status(200).json(response);
  }
}
