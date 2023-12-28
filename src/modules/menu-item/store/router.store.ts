import { MenuItemRouter } from "@/modules/menu-item";
import {
  buyAddMenuItemController,
  buyDeleteMenuItemController,
  buyEditMenuItemController,
  buyGetAllMenuItemsController,
  buyGetAllPublishedMenuItemsController,
  buyGetMenuItemController,
  buyGetPublishedMenuItemController,
} from "@/modules/menu-item/store";

// Setup
const addMenuItemController = buyAddMenuItemController();
const deleteMenuItemController = buyDeleteMenuItemController();
const getAllMenuItemsController = buyGetAllMenuItemsController();
const editMenuItemController = buyEditMenuItemController();
const getAllPublishedMenuItemsController = buyGetAllPublishedMenuItemsController();
const getMenuItemController = buyGetMenuItemController();
const getPublishedMenuItemController = buyGetPublishedMenuItemController();

// Build
const menuItemRouter = new MenuItemRouter({
  addMenuItemController,
  deleteMenuItemController,
  getAllMenuItemsController,
  editMenuItemController,
  getAllPublishedMenuItemsController,
  getMenuItemController,
  getPublishedMenuItemController,
});

// Export
export const buyMenuItemRouter = () => menuItemRouter;
