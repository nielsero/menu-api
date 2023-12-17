import { Router } from "express";
import {
  CreateMenuController,
  DeleteMenuController,
  EditMenuController,
  PublishMenuController,
  UnpublishMenuController,
} from "@/modules/menu/controllers";
import requireAuth from "@/middleware/require-auth";

export type MenuControllers = {
  createMenuController: CreateMenuController;
  editMenuController: EditMenuController;
  deleteMenuController: DeleteMenuController;
  publishMenuController: PublishMenuController;
  unpublishMenuController: UnpublishMenuController;
};

export class MenuRouter {
  private readonly createMenuController: CreateMenuController;
  private readonly editMenuController: EditMenuController;
  private readonly deleteMenuController: DeleteMenuController;
  private readonly publishMenuController: PublishMenuController;
  private readonly unpublishMenuController: UnpublishMenuController;

  constructor(private readonly controllers: MenuControllers) {
    this.createMenuController = controllers.createMenuController;
    this.editMenuController = controllers.editMenuController;
    this.deleteMenuController = controllers.deleteMenuController;
    this.publishMenuController = controllers.publishMenuController;
    this.unpublishMenuController = controllers.unpublishMenuController;
  }

  setup(router: Router) {
    router.post("/api/menu", requireAuth, this.createMenuController.handle.bind(this.createMenuController));
    router.patch("/api/menu/:id", requireAuth, this.editMenuController.handle.bind(this.editMenuController));
    router.delete(
      "/api/menu/:id",
      requireAuth,
      this.deleteMenuController.handle.bind(this.deleteMenuController),
    );
    router.post(
      "/api/menu/:id/publish",
      requireAuth,
      this.publishMenuController.handle.bind(this.publishMenuController),
    );
    router.post(
      "/api/menu/:id/unpublish",
      requireAuth,
      this.unpublishMenuController.handle.bind(this.unpublishMenuController),
    );
  }
}
