import {
  CreateMenuService,
  DeleteMenuService,
  GetAllMenusService,
  EditMenuService,
  GetAllPublishedMenusService,
  PublishMenuService,
  UnpublishMenuService,
  GetMenuService,
  GetPublishedMenuService,
} from "@/modules/menu/services";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyMenuItemRepository } from "@/modules/menu-item/store";

// Setup
const menuRepository = buyMenuRepository();
const menuItemRepository = buyMenuItemRepository();

// Build
const createMenu = new CreateMenuService(menuRepository);
const deleteMenu = new DeleteMenuService({ menuRepository, menuItemRepository });
const getAllMenus = new GetAllMenusService(menuRepository);
const editMenu = new EditMenuService(menuRepository);
const getAllPublishedMenus = new GetAllPublishedMenusService(menuRepository);
const publishMenu = new PublishMenuService(menuRepository);
const unpublishMenu = new UnpublishMenuService(menuRepository);
const getMenu = new GetMenuService(menuRepository);
const getPublishedMenu = new GetPublishedMenuService(menuRepository);

// Export
export const buyCreateMenuService = () => createMenu;
export const buyDeleteMenuService = () => deleteMenu;
export const buyGetAllMenusService = () => getAllMenus;
export const buyEditMenuService = () => editMenu;
export const buyGetAllPublishedMenusService = () => getAllPublishedMenus;
export const buyPublishMenuService = () => publishMenu;
export const buyUnpublishMenuService = () => unpublishMenu;
export const buyGetMenuService = () => getMenu;
export const buyGetPublishedMenuService = () => getPublishedMenu;
