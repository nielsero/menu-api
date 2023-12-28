import { Request, Response } from "express";
import { RegisterUserRequest, RegisterUserService } from "@/modules/auth/services";
import { checkRequiredFields } from "@/utils/check-required-fields";

export class RegisterUserController {
  constructor(private readonly service: RegisterUserService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async handle(req: Request<{}, {}, RegisterUserRequest>, res: Response) {
    const { name, email, password } = req.body;
    checkRequiredFields({ name, email, password }, ["name", "email", "password"]);
    const response = await this.service.execute({ name, email, password });
    return res.status(201).json(response);
  }
}
