import { Request, Response } from "express";
import { CreateMenuRequest, CreateMenuService } from "@/modules/menu/services";
import { checkRequiredFields } from "@/utils";

export class CreateMenuController {
  constructor(private readonly service: CreateMenuService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{}, {}, Omit<CreateMenuRequest, "userId">>, res: Response) {
    const { name, description } = req.body;
    const userId = res.locals.userId;
    checkRequiredFields({ name }, ["name"]);
    const response = await this.service.execute({ name, description, userId });
    return res.status(201).json(response);
  }
}
