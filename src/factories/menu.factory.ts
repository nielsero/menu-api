import { MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuRepository } from "@/modules/menu/providers/repositories";
import {
  ZodCreateMenuRequestValidator,
  ZodEditMenuRequestValidator,
} from "@/modules/menu/providers/validators";
import { CreateMenuService, EditMenuService } from "@/modules/menu/services";
import { makeUser } from "@/factories";
import { UserRepository } from "@/modules/user/protocols";
import { MenuRouter } from "@/modules/menu";
import { CreateMenuController } from "@/modules/menu/controllers";

export type MenuTypes = {
  menuRouter: MenuRouter;
  createMenuController: CreateMenuController;
  createMenuService: CreateMenuService;
  editMenuService: EditMenuService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const createMenuRequestValidator = new ZodCreateMenuRequestValidator();
const editMenuRequestValidator = new ZodEditMenuRequestValidator();

export const makeMenu = (): MenuTypes => {
  const inMemoryMenuRepository = new InMemoryMenuRepository();
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
  const menuRouter = new MenuRouter({ createMenuController });
  return {
    menuRouter,
    createMenuController,
    createMenuService,
    editMenuService,
    userRepository,
    menuRepository: inMemoryMenuRepository,
  };
};
