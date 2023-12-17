import { MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuRepository } from "@/modules/menu/providers/repositories";
import {
  ZodCreateMenuRequestValidator,
  ZodDeleteMenuRequestValidator,
  ZodEditMenuRequestValidator,
  ZodPublishMenuRequestValidator,
  ZodUnpublishMenuRequestValidator,
} from "@/modules/menu/providers/validators";
import {
  CreateMenuService,
  DeleteMenuService,
  EditMenuService,
  PublishMenuService,
  UnpublishMenuService,
} from "@/modules/menu/services";
import { makeUser } from "@/factories";
import { UserRepository } from "@/modules/user/protocols";
import { MenuRouter } from "@/modules/menu";
import { CreateMenuController, DeleteMenuController, EditMenuController } from "@/modules/menu/controllers";

export type MenuTypes = {
  menuRouter: MenuRouter;
  createMenuController: CreateMenuController;
  createMenuService: CreateMenuService;
  editMenuController: EditMenuController;
  editMenuService: EditMenuService;
  deleteMenuController: DeleteMenuController;
  deleteMenuService: DeleteMenuService;
  publishMenuService: PublishMenuService;
  unpublishMenuService: UnpublishMenuService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const inMemoryMenuRepository = new InMemoryMenuRepository();
const createMenuRequestValidator = new ZodCreateMenuRequestValidator();
const editMenuRequestValidator = new ZodEditMenuRequestValidator();
const deleteMenuRequestValidator = new ZodDeleteMenuRequestValidator();
const publishMenuRequestValidator = new ZodPublishMenuRequestValidator();
const unpublishMenuRequestValidator = new ZodUnpublishMenuRequestValidator();

export const makeMenu = (): MenuTypes => {
  const { findUserByIdService, userRepository } = makeUser();
  const createMenuService = new CreateMenuService({
    findUserByIdService,
    requestValidator: createMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const createMenuController = new CreateMenuController(createMenuService);
  const editMenuService = new EditMenuService({
    findUserByIdService,
    requestValidator: editMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const editMenuController = new EditMenuController(editMenuService);
  const deleteMenuService = new DeleteMenuService({
    findUserByIdService,
    requestValidator: deleteMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const deleteMenuController = new DeleteMenuController(deleteMenuService);
  const publishMenuService = new PublishMenuService({
    requestValidator: publishMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const unpublishMenuService = new UnpublishMenuService({
    requestValidator: unpublishMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const menuRouter = new MenuRouter({ createMenuController, editMenuController, deleteMenuController });
  return {
    menuRouter,
    createMenuController,
    createMenuService,
    editMenuController,
    editMenuService,
    deleteMenuController,
    deleteMenuService,
    publishMenuService,
    unpublishMenuService,
    userRepository,
    menuRepository: inMemoryMenuRepository,
  };
};
