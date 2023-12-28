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
import { buyMenuRepository, buyMenuValidators } from "@/modules/menu/store";
import { buyMenuItemRepository } from "@/modules/menu-item/store";

const menuRepository = buyMenuRepository();
const menuItemRepository = buyMenuItemRepository();
const {
  createMenuValidator,
  deleteMenuValidator,
  getAllMenusValidator,
  editMenuValidator,
  publishMenuValidator,
  unpublishMenuValidator,
  getMenuValidator,
  getPublishedMenuValidator,
} = buyMenuValidators();
const createMenuService = new CreateMenuService({ menuRepository, requestValidator: createMenuValidator });
const deleteMenuService = new DeleteMenuService({
  menuRepository,
  menuItemRepository,
  requestValidator: deleteMenuValidator,
});
const getAllMenusService = new GetAllMenusService({ menuRepository, requestValidator: getAllMenusValidator });
const editMenuService = new EditMenuService({ menuRepository, requestValidator: editMenuValidator });
const getAllPublishedMenusService = new GetAllPublishedMenusService({ menuRepository });
const publishMenuService = new PublishMenuService({ menuRepository, requestValidator: publishMenuValidator });
const unpublishMenuService = new UnpublishMenuService({
  menuRepository,
  requestValidator: unpublishMenuValidator,
});
const getMenuService = new GetMenuService({ menuRepository, requestValidator: getMenuValidator });
const getPublishedMenuService = new GetPublishedMenuService({
  menuRepository,
  requestValidator: getPublishedMenuValidator,
});
export const buyCreateMenuService = () => createMenuService;
export const buyDeleteMenuService = () => deleteMenuService;
export const buyGetAllMenusService = () => getAllMenusService;
export const buyEditMenuService = () => editMenuService;
export const buyGetAllPublishedMenusService = () => getAllPublishedMenusService;
export const buyPublishMenuService = () => publishMenuService;
export const buyUnpublishMenuService = () => unpublishMenuService;
export const buyGetMenuService = () => getMenuService;
export const buyGetPublishedMenuService = () => getPublishedMenuService;
