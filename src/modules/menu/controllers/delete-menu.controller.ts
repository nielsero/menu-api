import { Request, Response } from "express";
import { DeleteMenuService } from "@/modules/menu/services";
import { checkRequiredFields } from "@/utils";

export class DeleteMenuController {
  constructor(private readonly service: DeleteMenuService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const userId = res.locals.userId;
    checkRequiredFields({ id }, ["id"]);
    await this.service.execute({ id, userId });
    return res.sendStatus(204);
  }
}
