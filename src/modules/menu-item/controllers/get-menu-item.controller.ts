import { Request, Response } from "express";
import { GetMenuItemRequest, GetMenuItemService } from "@/modules/menu-item/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<Omit<GetMenuItemRequest, "userId">>;
  service: GetMenuItemService;
};

export class GetMenuItemController {
  private readonly validator: RequestValidator<Omit<GetMenuItemRequest, "userId">>;
  private readonly service: GetMenuItemService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  async handle(req: Request<{ menuId: string; id: string }>, res: Response) {
    const userId = res.locals.userId;
    const { menuId, id } = req.params;
    await this.validator.validate({ menuId, id });
    const response = await this.service.execute({ id, menuId, userId });
    return res.status(200).json(response);
  }
}
