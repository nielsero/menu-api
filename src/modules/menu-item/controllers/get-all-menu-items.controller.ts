import { Request, Response } from "express";
import { GetAllMenuItemsRequest, GetAllMenuItemsService } from "@/modules/menu-item/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<Omit<GetAllMenuItemsRequest, "userId">>;
  service: GetAllMenuItemsService;
};

export class GetAllMenuItemsController {
  private readonly validator: RequestValidator<Omit<GetAllMenuItemsRequest, "userId">>;
  private readonly service: GetAllMenuItemsService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  async handle(req: Request<{ menuId: string }>, res: Response) {
    const userId = res.locals.userId;
    const { menuId } = req.params;
    await this.validator.validate({ menuId });
    const response = await this.service.execute({ menuId, userId });
    return res.status(200).json(response);
  }
}
