import { Request, Response } from "express";
import { LoginUserRequest, LoginUserService } from "@/modules/auth/services";
import { checkRequiredFields } from "@/utils/check-required-fields";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  requestValidator: RequestValidator<LoginUserRequest>;
  service: LoginUserService;
};

export class LoginUserController {
  private readonly requestValidator: RequestValidator<LoginUserRequest>;
  private readonly service: LoginUserService;

  constructor(private readonly providers: Providers) {
    this.requestValidator = providers.requestValidator;
    this.service = providers.service;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{}, {}, LoginUserRequest>, res: Response) {
    const { email, password } = req.body;
    await this.requestValidator.validate({ email, password });
    const response = await this.service.execute({ email, password });
    return res.status(200).json(response);
  }
}
