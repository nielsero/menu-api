import { Router } from "express";
import { CreateMenuController, EditMenuController } from "@/modules/menu/controllers";
import requireAuth from "@/middleware/require-auth";

export type MenuControllers = {
  createMenuController: CreateMenuController;
  editMenuController: EditMenuController;
};

export class MenuRouter {
  private readonly createMenuController: CreateMenuController;
  private readonly editMenuController: EditMenuController;

  constructor(private readonly controllers: MenuControllers) {
    this.createMenuController = controllers.createMenuController;
    this.editMenuController = controllers.editMenuController;
  }

  setup(router: Router) {
    router.post("/api/menu", requireAuth, this.createMenuController.handle.bind(this.createMenuController));
    router.patch("/api/menu/:id", requireAuth, this.editMenuController.handle.bind(this.editMenuController));
  }
}
