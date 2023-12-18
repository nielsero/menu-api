import requireAuth from "@/middleware/require-auth";
import { AddMenuItemController, EditMenuItemController } from "@/modules/menu/controllers";
import { Router } from "express";

export type MenuItemControllers = {
  addMenuItemController: AddMenuItemController;
  editMenuItemController: EditMenuItemController;
};

export class MenuItemRouter {
  private readonly addMenuItemController: AddMenuItemController;
  private readonly editMenuItemController: EditMenuItemController;

  constructor(private readonly controllers: MenuItemControllers) {
    this.addMenuItemController = controllers.addMenuItemController;
    this.editMenuItemController = controllers.editMenuItemController;
  }

  setup(router: Router) {
    router.post(
      "/api/menu/:id/item",
      requireAuth,
      this.addMenuItemController.handle.bind(this.addMenuItemController),
    );
    router.patch(
      "/api/menu/:menuId/item/:id",
      requireAuth,
      this.editMenuItemController.handle.bind(this.editMenuItemController),
    );
  }
}
