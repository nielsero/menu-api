import { Request, Response } from "express";
import { DeleteMenuRequest, DeleteMenuService } from "@/modules/menu/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<Omit<DeleteMenuRequest, "userId">>;
  service: DeleteMenuService;
};

export class DeleteMenuController {
  private readonly validator: RequestValidator<Omit<DeleteMenuRequest, "userId">>;
  private readonly service: DeleteMenuService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const userId = res.locals.userId;
    const { id } = req.params;
    await this.validator.validate({ id });
    await this.service.execute({ id, userId });
    return res.sendStatus(204);
  }
}
