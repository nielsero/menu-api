import {
  AddMenuItemService,
  DeleteMenuItemService,
  GetAllMenuItemsService,
  EditMenuItemService,
  GetAllPublishedMenuItemsService,
  GetMenuItemService,
  GetPublishedMenuItemService,
} from "@/modules/menu-item/services";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyMenuItemRepository } from "@/modules/menu-item/store";

// Setup
const menuRepository = buyMenuRepository();
const menuItemRepository = buyMenuItemRepository();

// Build
const addMenuItemService = new AddMenuItemService({
  menuRepository,
  menuItemRepository,
});
const deleteMenuItemService = new DeleteMenuItemService({
  menuRepository,
  menuItemRepository,
});
const getAllMenuItemsService = new GetAllMenuItemsService({
  menuRepository,
  menuItemRepository,
});
const editMenuItemService = new EditMenuItemService({
  menuRepository,
  menuItemRepository,
});
const getAllPublishedMenuItemsService = new GetAllPublishedMenuItemsService({
  menuRepository,
  menuItemRepository,
});
const getMenuItemService = new GetMenuItemService({
  menuRepository,
  menuItemRepository,
});
const getPublishedMenuItemService = new GetPublishedMenuItemService({
  menuRepository,
  menuItemRepository,
});

// Export
export const buyAddMenuItemService = () => addMenuItemService;
export const buyDeleteMenuItemService = () => deleteMenuItemService;
export const buyGetAllMenuItemsService = () => getAllMenuItemsService;
export const buyEditMenuItemService = () => editMenuItemService;
export const buyGetAllPublishedMenuItemsService = () => getAllPublishedMenuItemsService;
export const buyGetMenuItemService = () => getMenuItemService;
export const buyGetPublishedMenuItemService = () => getPublishedMenuItemService;
