import { MenuItemRepository, MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuItemRepository } from "@/modules/menu/providers/repositories";
import {
  ZodAddMenuItemRequestValidator,
  ZodDeleteMenuItemRequestValidator,
  ZodEditMenuItemRequestValidator,
  ZodGetAllMenuItemsRequestValidator,
  ZodGetAllPublishedMenuItemsRequestValidator,
  ZodGetMenuItemRequestValidator,
  ZodGetPublishedMenuItemRequestValidator,
} from "@/modules/menu/providers/validators";
import {
  AddMenuItemService,
  DeleteMenuItemService,
  EditMenuItemService,
  GetAllMenuItemsService,
  GetAllPublishedMenuItemsService,
  GetMenuItemService,
  GetPublishedMenuItemService,
} from "@/modules/menu/services";
import { UserRepository } from "@/modules/user/protocols";
import { makeMenu } from "@/factories/menu.factory";
import { MenuItemRouter } from "@/modules/menu/routers";
import {
  AddMenuItemController,
  DeleteMenuItemController,
  EditMenuItemController,
  GetAllMenuItemsController,
  GetAllPublishedMenuItemsController,
  GetMenuItemController,
  GetPublishedMenuItemController,
} from "@/modules/menu/controllers";

export type MenuItemTypes = {
  menuItemRouter: MenuItemRouter;
  addMenuItemController: AddMenuItemController;
  addMenuItemService: AddMenuItemService;
  editMenuItemController: EditMenuItemController;
  editMenuItemService: EditMenuItemService;
  deleteMenuItemController: DeleteMenuItemController;
  deleteMenuItemService: DeleteMenuItemService;
  getAllMenuItemsController: GetAllMenuItemsController;
  getAllMenuItemsService: GetAllMenuItemsService;
  getMenuItemController: GetMenuItemController;
  getMenuItemService: GetMenuItemService;
  menuItemRepository: MenuItemRepository;
  getAllPublishedMenuItemsController: GetAllPublishedMenuItemsController;
  getAllPublishedMenuItemsService: GetAllPublishedMenuItemsService;
  getPublishedMenuItemController: GetPublishedMenuItemController;
  getPublishedMenuItemService: GetPublishedMenuItemService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const inMemoryMenuItemRepository = new InMemoryMenuItemRepository();
const addMenuItemRequestValidator = new ZodAddMenuItemRequestValidator();
const editMenuItemRequestValidator = new ZodEditMenuItemRequestValidator();
const deleteMenuItemRequestValidator = new ZodDeleteMenuItemRequestValidator();
const getAllMenuItemsRequestValidator = new ZodGetAllMenuItemsRequestValidator();
const getAllPublishedMenuItemsRequestValidator = new ZodGetAllPublishedMenuItemsRequestValidator();
const getMenuItemRequestValidator = new ZodGetMenuItemRequestValidator();
const getPublishedMenuItemRequestValidator = new ZodGetPublishedMenuItemRequestValidator();

export const makeMenuItem = (): MenuItemTypes => {
  const { userRepository, menuRepository } = makeMenu();
  const addMenuItemService = new AddMenuItemService({
    menuRepository,
    requestValidator: addMenuItemRequestValidator,
    menuItemRepository: inMemoryMenuItemRepository,
  });
  const addMenuItemController = new AddMenuItemController(addMenuItemService);
  const editMenuItemService = new EditMenuItemService({
    menuRepository,
    requestValidator: editMenuItemRequestValidator,
    menuItemRepository: inMemoryMenuItemRepository,
  });
  const editMenuItemController = new EditMenuItemController(editMenuItemService);
  const deleteMenuItemService = new DeleteMenuItemService({
    menuRepository,
    requestValidator: deleteMenuItemRequestValidator,
    menuItemRepository: inMemoryMenuItemRepository,
  });
  const deleteMenuItemController = new DeleteMenuItemController(deleteMenuItemService);
  const getAllMenuItemsService = new GetAllMenuItemsService({
    menuRepository,
    requestValidator: getAllMenuItemsRequestValidator,
    menuItemRepository: inMemoryMenuItemRepository,
  });
  const getAllMenuItemsController = new GetAllMenuItemsController(getAllMenuItemsService);
  const getMenuItemService = new GetMenuItemService({
    menuRepository,
    requestValidator: getMenuItemRequestValidator,
    menuItemRepository: inMemoryMenuItemRepository,
  });
  const getMenuItemController = new GetMenuItemController(getMenuItemService);
  const getAllPublishedMenuItemsService = new GetAllPublishedMenuItemsService({
    menuRepository,
    requestValidator: getAllPublishedMenuItemsRequestValidator,
    menuItemRepository: inMemoryMenuItemRepository,
  });
  const getAllPublishedMenuItemsController = new GetAllPublishedMenuItemsController(
    getAllPublishedMenuItemsService,
  );
  const getPublishedMenuItemService = new GetPublishedMenuItemService({
    menuRepository,
    requestValidator: getPublishedMenuItemRequestValidator,
    menuItemRepository: inMemoryMenuItemRepository,
  });
  const getPublishedMenuItemController = new GetPublishedMenuItemController(getPublishedMenuItemService);

  const menuItemRouter = new MenuItemRouter({
    addMenuItemController,
    editMenuItemController,
    deleteMenuItemController,
    getAllMenuItemsController,
    getMenuItemController,
    getAllPublishedMenuItemsController,
    getPublishedMenuItemController,
  });
  return {
    menuItemRouter,
    addMenuItemController,
    addMenuItemService,
    editMenuItemController,
    editMenuItemService,
    deleteMenuItemController,
    deleteMenuItemService,
    getAllMenuItemsController,
    getAllMenuItemsService,
    getMenuItemController,
    getMenuItemService,
    getAllPublishedMenuItemsController,
    getAllPublishedMenuItemsService,
    getPublishedMenuItemController,
    getPublishedMenuItemService,
    menuRepository,
    userRepository,
    menuItemRepository: inMemoryMenuItemRepository,
  };
};
