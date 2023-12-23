import { Request, Response } from "express";
import { GetPublishedMenuService } from "@/modules/menu/services";

export class GetPublishedMenuController {
  constructor(private readonly service: GetPublishedMenuService) {}

  async handle(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const response = await this.service.execute({ id });
    return res.status(200).json(response);
  }
}
