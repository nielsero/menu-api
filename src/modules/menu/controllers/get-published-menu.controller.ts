import { Request, Response } from "express";
import { GetPublishedMenuRequest, GetPublishedMenuService } from "@/modules/menu/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<GetPublishedMenuRequest>;
  service: GetPublishedMenuService;
};

export class GetPublishedMenuController {
  private readonly validator: RequestValidator<GetPublishedMenuRequest>;
  private readonly service: GetPublishedMenuService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    await this.validator.validate({ id });
    const response = await this.service.execute({ id });
    return res.status(200).json(response);
  }
}
