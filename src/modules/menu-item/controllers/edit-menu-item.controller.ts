import { Request, Response } from "express";
import { EditMenuItemRequest, EditMenuItemService } from "@/modules/menu-item/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<Omit<EditMenuItemRequest, "userId">>;
  service: EditMenuItemService;
};

export class EditMenuItemController {
  private readonly validator: RequestValidator<Omit<EditMenuItemRequest, "userId">>;
  private readonly service: EditMenuItemService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  async handle(
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<{ menuId: string; id: string }, {}, Omit<EditMenuItemRequest, "id" | "userId" | "menuId">>,
    res: Response,
  ) {
    const userId = res.locals.userId;
    const { menuId, id } = req.params;
    await this.validator.validate({ ...req.body, id, menuId });
    const response = await this.service.execute({ ...req.body, id, userId, menuId });
    return res.status(200).send(response);
  }
}
