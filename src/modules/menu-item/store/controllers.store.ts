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
  buyDeleteMenuItemService,
  buyEditMenuItemService,
  buyGetAllMenuItemsService,
  buyGetAllPublishedMenuItemsService,
  buyGetMenuItemService,
  buyGetPublishedMenuItemService,
} from "@/modules/menu-item/store";

// Setup
const addMenuItemService = buyAddMenuItemService();
const deleteMenuItemService = buyDeleteMenuItemService();
const getAllMenuItemsService = buyGetAllMenuItemsService();
const editMenuItemService = buyEditMenuItemService();
const getAllPublishedMenuItemsService = buyGetAllPublishedMenuItemsService();
const getMenuItemService = buyGetMenuItemService();
const getPublishedMenuItemService = buyGetPublishedMenuItemService();

// Build
const addMenuItem = new AddMenuItemController(addMenuItemService);
const deleteMenuItem = new DeleteMenuItemController(deleteMenuItemService);
const getAllMenuItems = new GetAllMenuItemsController(getAllMenuItemsService);
const editMenuItem = new EditMenuItemController(editMenuItemService);
const getAllPublishedMenuItems = new GetAllPublishedMenuItemsController(getAllPublishedMenuItemsService);
const getMenuItem = new GetMenuItemController(getMenuItemService);
const getPublishedMenuItem = new GetPublishedMenuItemController(getPublishedMenuItemService);

// Export
export const buyAddMenuItemController = () => addMenuItem;
export const buyDeleteMenuItemController = () => deleteMenuItem;
export const buyGetAllMenuItemsController = () => getAllMenuItems;
export const buyEditMenuItemController = () => editMenuItem;
export const buyGetAllPublishedMenuItemsController = () => getAllPublishedMenuItems;
export const buyGetMenuItemController = () => getMenuItem;
export const buyGetPublishedMenuItemController = () => getPublishedMenuItem;
