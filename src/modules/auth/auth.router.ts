import { Router } from "express";
import {
  GetUserSessionController,
  LoginUserController,
  RegisterUserController,
} from "@/modules/auth/controllers";
import { requireAuth } from "@/middleware";

export type AuthControllers = {
  registerUserController: RegisterUserController;
  loginUserController: LoginUserController;
  getUserSessionController: GetUserSessionController;
};

export class AuthRouter {
  private readonly registerUserController: RegisterUserController;
  private readonly loginUserController: LoginUserController;
  private readonly getUserSessionController: GetUserSessionController;

  constructor(private readonly controllers: AuthControllers) {
    this.registerUserController = controllers.registerUserController;
    this.loginUserController = controllers.loginUserController;
    this.getUserSessionController = controllers.getUserSessionController;
  }

  setup(router: Router) {
    router.post("/api/auth/register", this.registerUserController.handle.bind(this.registerUserController));
    router.post("/api/auth/login", this.loginUserController.handle.bind(this.loginUserController));
    router.get(
      "/api/auth/session",
      requireAuth,
      this.getUserSessionController.handle.bind(this.getUserSessionController),
    );
  }
}
