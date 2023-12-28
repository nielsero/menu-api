import { Request, Response } from "express";
import {
  GetAllPublishedMenuItemsRequest,
  GetAllPublishedMenuItemsService,
} from "@/modules/menu-item/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<GetAllPublishedMenuItemsRequest>;
  service: GetAllPublishedMenuItemsService;
};

export class GetAllPublishedMenuItemsController {
  private readonly validator: RequestValidator<GetAllPublishedMenuItemsRequest>;
  private readonly service: GetAllPublishedMenuItemsService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  async handle(req: Request<{ menuId: string }>, res: Response) {
    const { menuId } = req.params;
    await this.validator.validate({ menuId });
    const response = await this.service.execute({ menuId });
    return res.status(200).json(response);
  }
}
