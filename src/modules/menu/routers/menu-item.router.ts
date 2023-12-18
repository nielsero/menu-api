import requireAuth from "@/middleware/require-auth";
import { AddMenuItemController } from "@/modules/menu/controllers";
import { Router } from "express";

export type MenuItemControllers = {
  addMenuItemController: AddMenuItemController;
};

export class MenuItemRouter {
  private readonly addMenuItemController: AddMenuItemController;

  constructor(private readonly controllers: MenuItemControllers) {
    this.addMenuItemController = controllers.addMenuItemController;
  }

  setup(router: Router) {
    router.post(
      "/api/menu/:id/item",
      requireAuth,
      this.addMenuItemController.handle.bind(this.addMenuItemController),
    );
  }
}
