import { Request, Response } from "express";
import { CreateMenuRequest, CreateMenuService } from "@/modules/menu/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<Omit<CreateMenuRequest, "userId">>;
  service: CreateMenuService;
};

export class CreateMenuController {
  private readonly validator: RequestValidator<Omit<CreateMenuRequest, "userId">>;
  private readonly service: CreateMenuService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{}, {}, Omit<CreateMenuRequest, "userId">>, res: Response) {
    const userId = res.locals.userId;
    const { name, description } = req.body;
    await this.validator.validate({ name, description });
    const response = await this.service.execute({ name, description, userId });
    return res.status(201).json(response);
  }
}
