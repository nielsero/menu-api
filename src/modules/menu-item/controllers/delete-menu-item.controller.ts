import { Request, Response } from "express";
import { DeleteMenuItemRequest, DeleteMenuItemService } from "@/modules/menu-item/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<Omit<DeleteMenuItemRequest, "userId">>;
  service: DeleteMenuItemService;
};

export class DeleteMenuItemController {
  private readonly validator: RequestValidator<Omit<DeleteMenuItemRequest, "userId">>;
  private readonly service: DeleteMenuItemService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  async handle(req: Request<{ menuId: string; id: string }>, res: Response) {
    const userId = res.locals.userId;
    const { menuId, id } = req.params;
    this.validator.validate({ menuId, id });
    await this.service.execute({ id, userId, menuId });
    return res.sendStatus(204);
  }
}
