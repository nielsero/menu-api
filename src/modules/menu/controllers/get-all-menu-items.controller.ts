import { Request, Response } from "express";
import { GetAllMenuItemsService } from "../services";
import { checkRequiredFields } from "@/utils";

export class GetAllMenuItemsController {
  constructor(private readonly service: GetAllMenuItemsService) {}

  async handle(req: Request<{ menuId: string }>, res: Response) {
    const { menuId } = req.params;
    const userId = res.locals.userId;
    checkRequiredFields({ menuId }, ["menuId"]);
    const response = await this.service.execute({ menuId, userId });
    return res.status(200).json(response);
  }
}
