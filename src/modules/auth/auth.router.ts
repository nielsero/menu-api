import { Router } from "express";
import { RegisterUserController } from "@/modules/auth/controllers";

export type AuthControllers = {
  registerUserController: RegisterUserController;
};

export class AuthRouter {
  private readonly registerUserController: RegisterUserController;

  constructor(private readonly controllers: AuthControllers) {
    this.registerUserController = controllers.registerUserController;
  }

  setup(router: Router) {
    router.post("/api/auth/register", this.registerUserController.handle.bind(this.registerUserController));
  }
}
