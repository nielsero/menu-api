import { Router } from "express";
import { CreateMenuController } from "@/modules/menu/controllers";
import requireAuth from "@/middleware/require-auth";

export type MenuControllers = {
  createMenuController: CreateMenuController;
};

export class MenuRouter {
  private readonly createMenuController: CreateMenuController;

  constructor(private readonly controllers: MenuControllers) {
    this.createMenuController = controllers.createMenuController;
  }

  setup(router: Router) {
    router.post("/api/menu", requireAuth, this.createMenuController.handle.bind(this.createMenuController));
  }
}
