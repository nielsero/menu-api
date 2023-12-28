import { Request, Response } from "express";
import { AddMenuItemRequest, AddMenuItemService } from "@/modules/menu-item/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<AddMenuItemRequest>;
  service: AddMenuItemService;
};

export class AddMenuItemController {
  private readonly validator: RequestValidator<Omit<AddMenuItemRequest, "userId">>;
  private readonly service: AddMenuItemService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{ menuId: string }, {}, Omit<AddMenuItemRequest, "userId">>, res: Response) {
    const userId = res.locals.userId;
    const { menuId } = req.params;
    await this.validator.validate({ ...req.body, menuId });
    const response = await this.service.execute({ ...req.body, userId, menuId });
    return res.status(201).json(response);
  }
}
