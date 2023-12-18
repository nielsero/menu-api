import { Request, Response } from "express";
import { checkRequiredFields } from "@/utils";
import { GetPublishedMenuItemService } from "../services";

export class GetPublishedMenuItemController {
  constructor(private readonly service: GetPublishedMenuItemService) {}

  async handle(req: Request<{ menuId: string; id: string }>, res: Response) {
    const { menuId, id } = req.params;
    checkRequiredFields({ menuId, id }, ["menuId", "id"]);
    const response = await this.service.execute({ menuId, id });
    return res.status(200).json(response);
  }
}
