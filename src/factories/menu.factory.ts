import { MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuRepository } from "@/modules/menu/providers/repositories";
import {
  ZodCreateMenuRequestValidator,
  ZodDeleteMenuRequestValidator,
  ZodEditMenuRequestValidator,
  ZodGetAllMenusRequestValidator,
  ZodPublishMenuRequestValidator,
  ZodUnpublishMenuRequestValidator,
} from "@/modules/menu/providers/validators";
import {
  CreateMenuService,
  DeleteMenuService,
  EditMenuService,
  GetAllMenusService,
  PublishMenuService,
  UnpublishMenuService,
} from "@/modules/menu/services";
import { makeUser } from "@/factories";
import { UserRepository } from "@/modules/user/protocols";
import { MenuRouter } from "@/modules/menu/routers";
import {
  CreateMenuController,
  DeleteMenuController,
  EditMenuController,
  GetAllMenusController,
  PublishMenuController,
  UnpublishMenuController,
} from "@/modules/menu/controllers";

export type MenuTypes = {
  menuRouter: MenuRouter;
  createMenuController: CreateMenuController;
  createMenuService: CreateMenuService;
  editMenuController: EditMenuController;
  editMenuService: EditMenuService;
  deleteMenuController: DeleteMenuController;
  deleteMenuService: DeleteMenuService;
  publishMenuController: PublishMenuController;
  publishMenuService: PublishMenuService;
  unpublishMenuController: UnpublishMenuController;
  unpublishMenuService: UnpublishMenuService;
  getAllMenusController: GetAllMenusController;
  getAllMenusService: GetAllMenusService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const inMemoryMenuRepository = new InMemoryMenuRepository();
const createMenuRequestValidator = new ZodCreateMenuRequestValidator();
const editMenuRequestValidator = new ZodEditMenuRequestValidator();
const deleteMenuRequestValidator = new ZodDeleteMenuRequestValidator();
const publishMenuRequestValidator = new ZodPublishMenuRequestValidator();
const unpublishMenuRequestValidator = new ZodUnpublishMenuRequestValidator();
const getAllMenusRequestValidar = new ZodGetAllMenusRequestValidator();

export const makeMenu = (): MenuTypes => {
  const { userRepository } = makeUser();
  const createMenuService = new CreateMenuService({
    requestValidator: createMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const createMenuController = new CreateMenuController(createMenuService);
  const editMenuService = new EditMenuService({
    requestValidator: editMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const editMenuController = new EditMenuController(editMenuService);
  const deleteMenuService = new DeleteMenuService({
    requestValidator: deleteMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const deleteMenuController = new DeleteMenuController(deleteMenuService);
  const publishMenuService = new PublishMenuService({
    requestValidator: publishMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const publishMenuController = new PublishMenuController(publishMenuService);
  const unpublishMenuService = new UnpublishMenuService({
    requestValidator: unpublishMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const unpublishMenuController = new UnpublishMenuController(unpublishMenuService);
  const getAllMenusService = new GetAllMenusService({
    requestValidator: getAllMenusRequestValidar,
    menuRepository: inMemoryMenuRepository,
  });
  const getAllMenusController = new GetAllMenusController(getAllMenusService);
  const menuRouter = new MenuRouter({
    createMenuController,
    editMenuController,
    deleteMenuController,
    publishMenuController,
    unpublishMenuController,
    getAllMenusController,
  });
  return {
    menuRouter,
    createMenuController,
    createMenuService,
    editMenuController,
    editMenuService,
    deleteMenuController,
    deleteMenuService,
    publishMenuController,
    publishMenuService,
    unpublishMenuController,
    unpublishMenuService,
    getAllMenusController,
    getAllMenusService,
    userRepository,
    menuRepository: inMemoryMenuRepository,
  };
};
