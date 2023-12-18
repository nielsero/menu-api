import requireAuth from "@/middleware/require-auth";
import {
  AddMenuItemController,
  DeleteMenuItemController,
  EditMenuItemController,
  GetAllMenuItemsController,
  GetAllPublishedMenuItemsController,
  GetMenuItemController,
  GetPublishedMenuItemController,
} from "@/modules/menu/controllers";
import { Router } from "express";

export type MenuItemControllers = {
  addMenuItemController: AddMenuItemController;
  editMenuItemController: EditMenuItemController;
  deleteMenuItemController: DeleteMenuItemController;
  getAllMenuItemsController: GetAllMenuItemsController;
  getMenuItemController: GetMenuItemController;
  getAllPublishedMenuItemsController: GetAllPublishedMenuItemsController;
  getPublishedMenuItemController: GetPublishedMenuItemController;
};

export class MenuItemRouter {
  private readonly add: AddMenuItemController;
  private readonly edit: EditMenuItemController;
  private readonly delete: DeleteMenuItemController;
  private readonly getAll: GetAllMenuItemsController;
  private readonly get: GetMenuItemController;
  private readonly getAllPublished: GetAllPublishedMenuItemsController;
  private readonly getPublished: GetPublishedMenuItemController;

  constructor(private readonly controllers: MenuItemControllers) {
    this.add = controllers.addMenuItemController;
    this.edit = controllers.editMenuItemController;
    this.delete = controllers.deleteMenuItemController;
    this.getAll = controllers.getAllMenuItemsController;
    this.get = controllers.getMenuItemController;
    this.getAllPublished = controllers.getAllPublishedMenuItemsController;
    this.getPublished = controllers.getPublishedMenuItemController;
  }

  setup(router: Router) {
    router.post("/api/menu/:id/item", requireAuth, this.add.handle.bind(this.add));
    router.patch("/api/menu/:menuId/item/:id", requireAuth, this.edit.handle.bind(this.edit));
    router.delete("/api/menu/:menuId/item/:id", requireAuth, this.delete.handle.bind(this.delete));
    router.get("/api/menu/:menuId/item", requireAuth, this.getAll.handle.bind(this.getAll));
    router.get("/api/menu/:menuId/item/:id", requireAuth, this.get.handle.bind(this.get));
    router.get("/api/menu/:menuId/item/published", this.getAllPublished.handle.bind(this.getAllPublished));
    router.get("/api/menu/:menuId/item/published/:id", this.getPublished.handle.bind(this.getPublished));
  }
}
