import { Request, Response } from "express";
import { GetPublishedMenuItemRequest, GetPublishedMenuItemService } from "@/modules/menu-item/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<GetPublishedMenuItemRequest>;
  service: GetPublishedMenuItemService;
};

export class GetPublishedMenuItemController {
  private readonly validator: RequestValidator<GetPublishedMenuItemRequest>;
  private readonly service: GetPublishedMenuItemService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  async handle(req: Request<{ menuId: string; id: string }>, res: Response) {
    const { menuId, id } = req.params;
    await this.validator.validate({ menuId, id });
    const response = await this.service.execute({ menuId, id });
    return res.status(200).json(response);
  }
}
