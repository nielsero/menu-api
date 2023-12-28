import { Request, Response } from "express";
import { EditMenuRequest, EditMenuService } from "@/modules/menu/services";
import { checkRequiredFields } from "@/utils/check-required-fields";

export class EditMenuController {
  constructor(private readonly service: EditMenuService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{ id: string }, {}, Omit<EditMenuRequest, "userId" | "id">>, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = res.locals.userId;
    checkRequiredFields({ id }, ["id"]);
    const response = await this.service.execute({ id, name, description, userId });
    return res.status(200).json(response);
  }
}
