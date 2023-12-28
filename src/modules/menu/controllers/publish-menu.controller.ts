import { Request, Response } from "express";
import { PublishMenuRequest, PublishMenuService } from "@/modules/menu/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<Omit<PublishMenuRequest, "userId">>;
  service: PublishMenuService;
};

export class PublishMenuController {
  private readonly validator: RequestValidator<Omit<PublishMenuRequest, "userId">>;
  private readonly service: PublishMenuService;

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
