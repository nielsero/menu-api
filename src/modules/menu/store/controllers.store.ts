import {
  CreateMenuController,
  DeleteMenuController,
  GetAllMenusController,
  EditMenuController,
  GetAllPublishedMenusController,
  PublishMenuController,
  UnpublishMenuController,
  GetMenuController,
  GetPublishedMenuController,
} from "@/modules/menu/controllers";
import {
  buyCreateMenuService,
  buyCreateMenuValidator,
  buyDeleteMenuService,
  buyEditMenuService,
  buyEditMenuValidator,
  buyGetAllMenusService,
  buyGetAllPublishedMenusService,
  buyGetMenuService,
  buyGetPublishedMenuService,
  buyPublishMenuService,
  buyUnpublishMenuService,
} from "@/modules/menu/store";
import { buyRequestWithIdValidator } from "@/shared/store";
import { get } from "http";

// Setup
const requestWithIdValidator = buyRequestWithIdValidator();
const createMenuValidator = buyCreateMenuValidator();
const editMenuValidator = buyEditMenuValidator();
const createMenuService = buyCreateMenuService();
const deleteMenuService = buyDeleteMenuService();
const getAllMenusService = buyGetAllMenusService();
const editMenuService = buyEditMenuService();
const getAllPublishedMenusService = buyGetAllPublishedMenusService();
const publishMenuService = buyPublishMenuService();
const unpublishMenuService = buyUnpublishMenuService();
const getMenuService = buyGetMenuService();
const getPublishedMenuService = buyGetPublishedMenuService();

// Build
const createMenuController = new CreateMenuController({
  validator: createMenuValidator,
  service: createMenuService,
});
const deleteMenuController = new DeleteMenuController({
  validator: requestWithIdValidator,
  service: deleteMenuService,
});
const getAllMenusController = new GetAllMenusController(getAllMenusService);
const editMenuController = new EditMenuController({
  validator: editMenuValidator,
  service: editMenuService,
});
const getAllPublishedMenusController = new GetAllPublishedMenusController(getAllPublishedMenusService);
const publishMenuController = new PublishMenuController({
  validator: requestWithIdValidator,
  service: publishMenuService,
});
const unpublishMenuController = new UnpublishMenuController({
  validator: requestWithIdValidator,
  service: unpublishMenuService,
});
const getMenuController = new GetMenuController({
  validator: requestWithIdValidator,
  service: getMenuService,
});
const getPublishedMenuController = new GetPublishedMenuController({
  validator: requestWithIdValidator,
  service: getPublishedMenuService,
});

// Export
export const buyCreateMenuController = () => createMenuController;
export const buyDeleteMenuController = () => deleteMenuController;
export const buyGetAllMenusController = () => getAllMenusController;
export const buyEditMenuController = () => editMenuController;
export const buyGetAllPublishedMenusController = () => getAllPublishedMenusController;
export const buyPublishMenuController = () => publishMenuController;
export const buyUnpublishMenuController = () => unpublishMenuController;
export const buyGetMenuController = () => getMenuController;
export const buyGetPublishedMenuController = () => getPublishedMenuController;
