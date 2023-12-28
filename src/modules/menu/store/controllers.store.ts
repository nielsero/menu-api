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
  buyDeleteMenuService,
  buyEditMenuService,
  buyGetAllMenusService,
  buyGetAllPublishedMenusService,
  buyGetMenuService,
  buyGetPublishedMenuService,
  buyPublishMenuService,
  buyUnpublishMenuService,
} from "@/modules/menu/store";

// Setup
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
const createMenuController = new CreateMenuController(createMenuService);
const deleteMenuController = new DeleteMenuController(deleteMenuService);
const getAllMenusController = new GetAllMenusController(getAllMenusService);
const editMenuController = new EditMenuController(editMenuService);
const getAllPublishedMenusController = new GetAllPublishedMenusController(getAllPublishedMenusService);
const publishMenuController = new PublishMenuController(publishMenuService);
const unpublishMenuController = new UnpublishMenuController(unpublishMenuService);
const getMenuController = new GetMenuController(getMenuService);
const getPublishedMenuController = new GetPublishedMenuController(getPublishedMenuService);

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
