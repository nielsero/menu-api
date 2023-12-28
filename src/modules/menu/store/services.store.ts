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
const createMenuService = new CreateMenuService(menuRepository);
const deleteMenuService = new DeleteMenuService({ menuRepository, menuItemRepository });
const getAllMenusService = new GetAllMenusService(menuRepository);
const editMenuService = new EditMenuService(menuRepository);
const getAllPublishedMenusService = new GetAllPublishedMenusService(menuRepository);
const publishMenuService = new PublishMenuService(menuRepository);
const unpublishMenuService = new UnpublishMenuService(menuRepository);
const getMenuService = new GetMenuService(menuRepository);
const getPublishedMenuService = new GetPublishedMenuService(menuRepository);

// Export
export const buyCreateMenuService = () => createMenuService;
export const buyDeleteMenuService = () => deleteMenuService;
export const buyGetAllMenusService = () => getAllMenusService;
export const buyEditMenuService = () => editMenuService;
export const buyGetAllPublishedMenusService = () => getAllPublishedMenusService;
export const buyPublishMenuService = () => publishMenuService;
export const buyUnpublishMenuService = () => unpublishMenuService;
export const buyGetMenuService = () => getMenuService;
export const buyGetPublishedMenuService = () => getPublishedMenuService;
