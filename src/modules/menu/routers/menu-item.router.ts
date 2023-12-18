import requireAuth from "@/middleware/require-auth";
import {
  AddMenuItemController,
  DeleteMenuItemController,
  EditMenuItemController,
  GetAllMenuItemsController,
  GetMenuItemController,
} from "@/modules/menu/controllers";
import { Router } from "express";

export type MenuItemControllers = {
  addMenuItemController: AddMenuItemController;
  editMenuItemController: EditMenuItemController;
  deleteMenuItemController: DeleteMenuItemController;
  getAllMenuItemsController: GetAllMenuItemsController;
  getMenuItemController: GetMenuItemController;
};

export class MenuItemRouter {
  private readonly addMenuItemController: AddMenuItemController;
  private readonly editMenuItemController: EditMenuItemController;
  private readonly deleteMenuItemController: DeleteMenuItemController;
  private readonly getAllMenuItemsController: GetAllMenuItemsController;
  private readonly getMenuItemController: GetMenuItemController;

  constructor(private readonly controllers: MenuItemControllers) {
    this.addMenuItemController = controllers.addMenuItemController;
    this.editMenuItemController = controllers.editMenuItemController;
    this.deleteMenuItemController = controllers.deleteMenuItemController;
    this.getAllMenuItemsController = controllers.getAllMenuItemsController;
    this.getMenuItemController = controllers.getMenuItemController;
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
    router.delete(
      "/api/menu/:menuId/item/:id",
      requireAuth,
      this.deleteMenuItemController.handle.bind(this.deleteMenuItemController),
    );
    router.get(
      "/api/menu/:menuId/item",
      requireAuth,
      this.getAllMenuItemsController.handle.bind(this.getAllMenuItemsController),
    );
    router.get(
      "/api/menu/:menuId/item/:id",
      requireAuth,
      this.getMenuItemController.handle.bind(this.getMenuItemController),
    );
  }
}
