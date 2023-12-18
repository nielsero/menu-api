import { Router } from "express";
import {
  CreateMenuController,
  DeleteMenuController,
  EditMenuController,
  GetAllMenusController,
  GetAllPublishedMenusController,
  PublishMenuController,
  UnpublishMenuController,
} from "@/modules/menu/controllers";
import requireAuth from "@/middleware/require-auth";

export type MenuControllers = {
  create: CreateMenuController;
  edit: EditMenuController;
  delete: DeleteMenuController;
  publish: PublishMenuController;
  unpublish: UnpublishMenuController;
  getAll: GetAllMenusController;
  getAllPublished: GetAllPublishedMenusController;
};

export class MenuRouter {
  private readonly create: CreateMenuController;
  private readonly edit: EditMenuController;
  private readonly delete: DeleteMenuController;
  private readonly publish: PublishMenuController;
  private readonly unpublish: UnpublishMenuController;
  private readonly getAll: GetAllMenusController;
  private readonly getAllPublished: GetAllPublishedMenusController;

  constructor(private readonly controllers: MenuControllers) {
    this.create = controllers.create;
    this.edit = controllers.edit;
    this.delete = controllers.delete;
    this.publish = controllers.publish;
    this.unpublish = controllers.unpublish;
    this.getAll = controllers.getAll;
    this.getAllPublished = controllers.getAllPublished;
  }

  setup(router: Router) {
    router.post("/api/menu", requireAuth, this.create.handle.bind(this.create));
    router.patch("/api/menu/:id", requireAuth, this.edit.handle.bind(this.edit));
    router.delete("/api/menu/:id", requireAuth, this.delete.handle.bind(this.delete));
    router.post("/api/menu/:id/publish", requireAuth, this.publish.handle.bind(this.publish));
    router.post("/api/menu/:id/unpublish", requireAuth, this.unpublish.handle.bind(this.unpublish));
    router.get("/api/menu", requireAuth, this.getAll.handle.bind(this.getAll));
    router.get("/api/menu/published", requireAuth, this.getAllPublished.handle.bind(this.getAllPublished));
  }
}
