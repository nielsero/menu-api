import { Router } from "express";
import { CreateMenuController, DeleteMenuController, EditMenuController } from "@/modules/menu/controllers";
import requireAuth from "@/middleware/require-auth";

export type MenuControllers = {
  createMenuController: CreateMenuController;
  editMenuController: EditMenuController;
  deleteMenuController: DeleteMenuController;
};

export class MenuRouter {
  private readonly createMenuController: CreateMenuController;
  private readonly editMenuController: EditMenuController;
  private readonly deleteMenuController: DeleteMenuController;

  constructor(private readonly controllers: MenuControllers) {
    this.createMenuController = controllers.createMenuController;
    this.editMenuController = controllers.editMenuController;
    this.deleteMenuController = controllers.deleteMenuController;
  }

  setup(router: Router) {
    router.post("/api/menu", requireAuth, this.createMenuController.handle.bind(this.createMenuController));
    router.patch("/api/menu/:id", requireAuth, this.editMenuController.handle.bind(this.editMenuController));
    router.delete(
      "/api/menu/:id",
      requireAuth,
      this.deleteMenuController.handle.bind(this.deleteMenuController),
    );
  }
}
