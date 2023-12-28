import { Request, Response } from "express";
import { RegisterUserRequest, RegisterUserService } from "@/modules/auth/services";
import { RequestValidator } from "@/shared/protocols";

type Providers = {
  validator: RequestValidator<RegisterUserRequest>;
  service: RegisterUserService;
};

export class RegisterUserController {
  private readonly validator: RequestValidator<RegisterUserRequest>;
  private readonly service: RegisterUserService;

  constructor(private readonly providers: Providers) {
    this.validator = providers.validator;
    this.service = providers.service;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{}, {}, RegisterUserRequest>, res: Response) {
    const { name, email, password } = req.body;
    await this.validator.validate({ name, email, password });
    const response = await this.service.execute({ name, email, password });
    return res.status(201).json(response);
  }
}
