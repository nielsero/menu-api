import { MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuRepository } from "@/modules/menu/providers/repositories";
import {
  ZodCreateMenuRequestValidator,
  ZodEditMenuRequestValidator,
} from "@/modules/menu/providers/validators";
import { CreateMenuService, DeleteMenuService, EditMenuService } from "@/modules/menu/services";
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
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const inMemoryMenuRepository = new InMemoryMenuRepository();
const createMenuRequestValidator = new ZodCreateMenuRequestValidator();
const editMenuRequestValidator = new ZodEditMenuRequestValidator();

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
    requestValidator: editMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  const deleteMenuController = new DeleteMenuController(deleteMenuService);
  const menuRouter = new MenuRouter({ createMenuController, editMenuController, deleteMenuController });
  return {
    menuRouter,
    createMenuController,
    createMenuService,
    editMenuController,
    editMenuService,
    deleteMenuController,
    deleteMenuService,
    userRepository,
    menuRepository: inMemoryMenuRepository,
  };
};
