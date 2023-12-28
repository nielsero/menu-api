import { Request, Response } from "express";
import { EditMenuRequest, EditMenuService } from "@/modules/menu/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<Omit<EditMenuRequest, "userId">>;
  service: EditMenuService;
};

export class EditMenuController {
  private readonly validator: RequestValidator<Omit<EditMenuRequest, "userId">>;
  private readonly service: EditMenuService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{ id: string }, {}, Omit<EditMenuRequest, "userId" | "id">>, res: Response) {
    const userId = res.locals.userId;
    const { id } = req.params;
    const { name, description } = req.body;
    await this.validator.validate({ id, name, description });
    const response = await this.service.execute({ id, name, description, userId });
    return res.status(200).json(response);
  }
}
