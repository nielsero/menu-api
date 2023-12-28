import { Request, Response } from "express";
import { GetAllPublishedMenuItemsService } from "@/modules/menu-item/services";

export class GetAllPublishedMenuItemsController {
  constructor(private readonly service: GetAllPublishedMenuItemsService) {}

  async handle(req: Request<{ menuId: string }>, res: Response) {
    const { menuId } = req.params;
    const response = await this.service.execute({ menuId });
    return res.status(200).json(response);
  }
}
