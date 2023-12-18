import { Request, Response } from "express";
import { GetAllPublishedMenusService } from "../services";

export class GetAllPublishedMenusController {
  constructor(private readonly service: GetAllPublishedMenusService) {}

  async handle(req: Request, res: Response) {
    const menus = await this.service.execute();
    return res.status(200).json(menus);
  }
}
