import { MenuItemRepository, MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuItemRepository } from "@/modules/menu/providers/repositories";
import { ZodAddMenuItemRequestValidator } from "@/modules/menu/providers/validators";
import { AddMenuItemService } from "@/modules/menu/services";
import { UserRepository } from "@/modules/user/protocols";
import { makeMenu } from "@/factories/menu.factory";
import { MenuItemRouter } from "@/modules/menu/routers";
import { AddMenuItemController } from "@/modules/menu/controllers";

export type MenuItemTypes = {
  menuItemRouter: MenuItemRouter;
  addMenuItemController: AddMenuItemController;
  addMenuItemService: AddMenuItemService;
  menuItemRepository: MenuItemRepository;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const inMemoryMenuItemRepository = new InMemoryMenuItemRepository();
const addMenuItemRequestValidator = new ZodAddMenuItemRequestValidator();

export const makeMenuItem = (): MenuItemTypes => {
  const { userRepository, menuRepository } = makeMenu();
  const addMenuItemService = new AddMenuItemService({
    menuRepository,
    requestValidator: addMenuItemRequestValidator,
    menuItemRepository: inMemoryMenuItemRepository,
  });
  const addMenuItemController = new AddMenuItemController(addMenuItemService);
  const menuItemRouter = new MenuItemRouter({ add: addMenuItemController });
  return {
    menuItemRouter,
    addMenuItemController,
    addMenuItemService,
    menuRepository,
    userRepository,
    menuItemRepository: inMemoryMenuItemRepository,
  };
};
