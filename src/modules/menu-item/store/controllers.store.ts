import {
  AddMenuItemController,
  DeleteMenuItemController,
  GetAllMenuItemsController,
  EditMenuItemController,
  GetAllPublishedMenuItemsController,
  GetMenuItemController,
  GetPublishedMenuItemController,
} from "@/modules/menu-item/controllers";
import {
  buyAddMenuItemService,
  buyAddMenuItemValidator,
  buyDeleteMenuItemService,
  buyEditMenuItemService,
  buyEditMenuItemValidator,
  buyGetAllMenuItemsService,
  buyGetAllPublishedMenuItemsService,
  buyGetMenuItemService,
  buyGetPublishedMenuItemService,
  buyRequestWithIdAndMenuIdValidator,
  buyRequestWithMenuIdValidator,
} from "@/modules/menu-item/store";

// Setup
const requestWithIdAndMenuIdValidator = buyRequestWithIdAndMenuIdValidator();
const requestWithMenuIdValidator = buyRequestWithMenuIdValidator();
const addMenuItemValidator = buyAddMenuItemValidator();
const editMenuItemValidator = buyEditMenuItemValidator();
const addMenuItemService = buyAddMenuItemService();
const deleteMenuItemService = buyDeleteMenuItemService();
const getAllMenuItemsService = buyGetAllMenuItemsService();
const editMenuItemService = buyEditMenuItemService();
const getAllPublishedMenuItemsService = buyGetAllPublishedMenuItemsService();
const getMenuItemService = buyGetMenuItemService();
const getPublishedMenuItemService = buyGetPublishedMenuItemService();

// Build
const addMenuItem = new AddMenuItemController({
  validator: addMenuItemValidator,
  service: addMenuItemService,
});
const deleteMenuItem = new DeleteMenuItemController({
  validator: requestWithIdAndMenuIdValidator,
  service: deleteMenuItemService,
});
const getAllMenuItems = new GetAllMenuItemsController({
  validator: requestWithMenuIdValidator,
  service: getAllMenuItemsService,
});
const editMenuItem = new EditMenuItemController({
  validator: editMenuItemValidator,
  service: editMenuItemService,
});
const getAllPublishedMenuItems = new GetAllPublishedMenuItemsController({
  validator: requestWithMenuIdValidator,
  service: getAllPublishedMenuItemsService,
});
const getMenuItem = new GetMenuItemController({
  validator: requestWithIdAndMenuIdValidator,
  service: getMenuItemService,
});
const getPublishedMenuItem = new GetPublishedMenuItemController({
  validator: requestWithIdAndMenuIdValidator,
  service: getPublishedMenuItemService,
});

// Export
export const buyAddMenuItemController = () => addMenuItem;
export const buyDeleteMenuItemController = () => deleteMenuItem;
export const buyGetAllMenuItemsController = () => getAllMenuItems;
export const buyEditMenuItemController = () => editMenuItem;
export const buyGetAllPublishedMenuItemsController = () => getAllPublishedMenuItems;
export const buyGetMenuItemController = () => getMenuItem;
export const buyGetPublishedMenuItemController = () => getPublishedMenuItem;
