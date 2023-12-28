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
import { buyMenuItemRepository, buyMenuItemValidators } from "@/modules/menu-item/store";

// Setup
const menuRepository = buyMenuRepository();
const menuItemRepository = buyMenuItemRepository();
const {
  addMenuItemValidator,
  editMenuItemValidator,
  deleteMenuItemValidator,
  getAllMenuItemsValidator,
  getAllPublishedMenuItemsValidator,
  getMenuItemValidator,
  getPublishedMenuItemValidator,
} = buyMenuItemValidators();

// Build
const addMenuItemService = new AddMenuItemService({
  menuRepository,
  menuItemRepository,
  requestValidator: addMenuItemValidator,
});
const deleteMenuItemService = new DeleteMenuItemService({
  menuRepository,
  menuItemRepository,
  requestValidator: deleteMenuItemValidator,
});
const getAllMenuItemsService = new GetAllMenuItemsService({
  menuRepository,
  menuItemRepository,
  requestValidator: getAllMenuItemsValidator,
});
const editMenuItemService = new EditMenuItemService({
  menuRepository,
  menuItemRepository,
  requestValidator: editMenuItemValidator,
});
const getAllPublishedMenuItemsService = new GetAllPublishedMenuItemsService({
  menuRepository,
  menuItemRepository,
  requestValidator: getAllPublishedMenuItemsValidator,
});
const getMenuItemService = new GetMenuItemService({
  menuRepository,
  menuItemRepository,
  requestValidator: getMenuItemValidator,
});
const getPublishedMenuItemService = new GetPublishedMenuItemService({
  menuRepository,
  menuItemRepository,
  requestValidator: getPublishedMenuItemValidator,
});

// Export
export const buyAddMenuItemService = () => addMenuItemService;
export const buyDeleteMenuItemService = () => deleteMenuItemService;
export const buyGetAllMenuItemsService = () => getAllMenuItemsService;
export const buyEditMenuItemService = () => editMenuItemService;
export const buyGetAllPublishedMenuItemsService = () => getAllPublishedMenuItemsService;
export const buyGetMenuItemService = () => getMenuItemService;
export const buyGetPublishedMenuItemService = () => getPublishedMenuItemService;
