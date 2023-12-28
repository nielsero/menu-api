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

const createMenuController = buyCreateMenuController();
const deleteMenuController = buyDeleteMenuController();
const getAllMenusController = buyGetAllMenusController();
const editMenuController = buyEditMenuController();
const getAllPublishedMenusController = buyGetAllPublishedMenusController();
const publishMenuController = buyPublishMenuController();
const unpublishMenuController = buyUnpublishMenuController();
const getMenuController = buyGetMenuController();
const getPublishedMenuController = buyGetPublishedMenuController();
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

export const buyMenuRouter = () => menuRouter;
