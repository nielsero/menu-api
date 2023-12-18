import requireAuth from "@/middleware/require-auth";
import {
  AddMenuItemController,
  DeleteMenuItemController,
  EditMenuItemController,
  GetAllMenuItemsController,
  GetAllPublishedMenuItemsController,
  GetMenuItemController,
} from "@/modules/menu/controllers";
import { Router } from "express";

export type MenuItemControllers = {
  add: AddMenuItemController;
  edit: EditMenuItemController;
  delete: DeleteMenuItemController;
  getAll: GetAllMenuItemsController;
  get: GetMenuItemController;
  getAllPublished: GetAllPublishedMenuItemsController;
};

export class MenuItemRouter {
  private readonly add: AddMenuItemController;
  private readonly edit: EditMenuItemController;
  private readonly delete: DeleteMenuItemController;
  private readonly getAll: GetAllMenuItemsController;
  private readonly get: GetMenuItemController;
  private readonly getAllPublished: GetAllPublishedMenuItemsController;

  constructor(private readonly controllers: MenuItemControllers) {
    this.add = controllers.add;
    this.edit = controllers.edit;
    this.delete = controllers.delete;
    this.getAll = controllers.getAll;
    this.get = controllers.get;
    this.getAllPublished = controllers.getAllPublished;
  }

  setup(router: Router) {
    router.post("/api/menu/:id/item", requireAuth, this.add.handle.bind(this.add));
    router.patch("/api/menu/:menuId/item/:id", requireAuth, this.edit.handle.bind(this.edit));
    router.delete("/api/menu/:menuId/item/:id", requireAuth, this.delete.handle.bind(this.delete));
    router.get("/api/menu/:menuId/item", requireAuth, this.getAll.handle.bind(this.getAll));
    router.get("/api/menu/:menuId/item/:id", requireAuth, this.get.handle.bind(this.get));
    router.get(
      "/api/menu/:menuId/item/published",
      requireAuth,
      this.getAllPublished.handle.bind(this.getAllPublished),
    );
  }
}
