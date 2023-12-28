import { Request, Response } from "express";
import { GetMenuRequest, GetMenuService } from "@/modules/menu/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<Omit<GetMenuRequest, "userId">>;
  service: GetMenuService;
};

export class GetMenuController {
  private readonly validator: RequestValidator<Omit<GetMenuRequest, "userId">>;
  private readonly service: GetMenuService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const userId = res.locals.userId;
    const { id } = req.params;
    await this.validator.validate({ id });
    const response = await this.service.execute({ id, userId });
    return res.status(200).json(response);
  }
}
