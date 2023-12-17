import { Request, Response } from "express";
import { UnpublishMenuService } from "@/modules/menu/services";
import { checkRequiredFields } from "@/utils";

export class UnpublishMenuController {
  constructor(private readonly service: UnpublishMenuService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const userId = res.locals.userId;
    checkRequiredFields({ id }, ["id"]);
    const response = await this.service.execute({ id, userId });
    return res.status(200).json(response);
  }
}
