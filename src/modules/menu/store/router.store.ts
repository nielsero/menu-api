import { MenuRouter } from "@/modules/menu";
import {
  buyCreateMenuController,
  buyDeleteMenuController,
  buyEditMenuController,
  buyGetAllMenusController,
  buyGetAllPublishedMenusController,
  buyGetMenuController,
  buyGetPublishedMenuController,
  buyPublishMenuController,
  buyUnpublishMenuController,
} from "@/modules/menu/store";

// Setup
const createMenuController = buyCreateMenuController();
const deleteMenuController = buyDeleteMenuController();
const getAllMenusController = buyGetAllMenusController();
const editMenuController = buyEditMenuController();
const getAllPublishedMenusController = buyGetAllPublishedMenusController();
const publishMenuController = buyPublishMenuController();
const unpublishMenuController = buyUnpublishMenuController();
const getMenuController = buyGetMenuController();
const getPublishedMenuController = buyGetPublishedMenuController();

// Build
const menuRouter = new MenuRouter({
  createMenuController,
  deleteMenuController,
  getAllMenusController,
  editMenuController,
  getAllPublishedMenusController,
  publishMenuController,
  unpublishMenuController,
  getMenuController,
  getPublishedMenuController,
});

// Export
export const buyMenuRouter = () => menuRouter;
