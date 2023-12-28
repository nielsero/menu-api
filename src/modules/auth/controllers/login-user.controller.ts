import { Request, Response } from "express";
import { LoginUserRequest, LoginUserService } from "@/modules/auth/services";
import { checkRequiredFields } from "@/utils/check-required-fields";

export class LoginUserController {
  constructor(private readonly service: LoginUserService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{}, {}, LoginUserRequest>, res: Response) {
    const { email, password } = req.body;
    checkRequiredFields({ email, password }, ["email", "password"]);
    const response = await this.service.execute({ email, password });
    return res.status(200).json(response);
  }
}
