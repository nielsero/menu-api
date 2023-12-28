import { Router } from "express";
import {
  CreateMenuController,
  DeleteMenuController,
  EditMenuController,
  GetAllMenusController,
  GetAllPublishedMenusController,
  GetMenuController,
  GetPublishedMenuController,
  PublishMenuController,
  UnpublishMenuController,
} from "@/modules/menu/controllers";
import { requireAuth } from "@/middleware/require-auth";

export type MenuControllers = {
  createMenuController: CreateMenuController;
  editMenuController: EditMenuController;
  deleteMenuController: DeleteMenuController;
  publishMenuController: PublishMenuController;
  unpublishMenuController: UnpublishMenuController;
  getAllMenusController: GetAllMenusController;
  getAllPublishedMenusController: GetAllPublishedMenusController;
  getMenuController: GetMenuController;
  getPublishedMenuController: GetPublishedMenuController;
};

export class MenuRouter {
  private readonly create: CreateMenuController;
  private readonly edit: EditMenuController;
  private readonly delete: DeleteMenuController;
  private readonly publish: PublishMenuController;
  private readonly unpublish: UnpublishMenuController;
  private readonly getAll: GetAllMenusController;
  private readonly getAllPublished: GetAllPublishedMenusController;
  private readonly getMenu: GetMenuController;
  private readonly getPublishedMenu: GetPublishedMenuController;

  constructor(private readonly controllers: MenuControllers) {
    this.create = controllers.createMenuController;
    this.edit = controllers.editMenuController;
    this.delete = controllers.deleteMenuController;
    this.publish = controllers.publishMenuController;
    this.unpublish = controllers.unpublishMenuController;
    this.getAll = controllers.getAllMenusController;
    this.getAllPublished = controllers.getAllPublishedMenusController;
    this.getMenu = controllers.getMenuController;
    this.getPublishedMenu = controllers.getPublishedMenuController;
  }

  setup(router: Router) {
    router.post("/api/menus", requireAuth, this.create.handle.bind(this.create));
    router.patch("/api/menus/:id", requireAuth, this.edit.handle.bind(this.edit));
    router.delete("/api/menus/:id", requireAuth, this.delete.handle.bind(this.delete));
    router.post("/api/menus/:id/publish", requireAuth, this.publish.handle.bind(this.publish));
    router.post("/api/menus/:id/unpublish", requireAuth, this.unpublish.handle.bind(this.unpublish));
    router.get("/api/menus", requireAuth, this.getAll.handle.bind(this.getAll));
    router.get("/api/menus/published", this.getAllPublished.handle.bind(this.getAllPublished));
    router.get("/api/menus/:id", requireAuth, this.getMenu.handle.bind(this.getMenu));
    router.get("/api/menus/:id/published", this.getPublishedMenu.handle.bind(this.getPublishedMenu));
  }
}
