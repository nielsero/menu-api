import { Router } from "express";
import { LoginUserController, RegisterUserController } from "@/modules/auth/controllers";

export type AuthControllers = {
  registerUserController: RegisterUserController;
  loginUserController: LoginUserController;
};

export class AuthRouter {
  private readonly registerUserController: RegisterUserController;
  private readonly loginUserController: LoginUserController;

  constructor(private readonly controllers: AuthControllers) {
    this.registerUserController = controllers.registerUserController;
    this.loginUserController = controllers.loginUserController;
  }

  setup(router: Router) {
    router.post("/api/auth/register", this.registerUserController.handle.bind(this.registerUserController));
    router.post("/api/auth/login", this.loginUserController.handle.bind(this.loginUserController));
  }
}
