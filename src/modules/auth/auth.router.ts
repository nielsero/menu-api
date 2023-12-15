import { Router } from "express";
import { RegisterUserController } from "@/modules/auth/controllers";

export class AuthRouter {
  constructor(private readonly controller: RegisterUserController) {}

  setup(router: Router) {
    router.post("/api/auth/register", this.controller.handle.bind(this.controller));
  }
}
