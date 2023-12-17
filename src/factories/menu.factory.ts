import { MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuRepository } from "@/modules/menu/providers/repositories";
import { ZodCreateMenuRequestValidator } from "@/modules/menu/providers/validators";
import { CreateMenuService } from "@/modules/menu/services";
import { makeUser } from "@/factories";
import { UserRepository } from "@/modules/user/protocols";

export type MenuTypes = {
  createMenuService: CreateMenuService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const createMenuRequestValidator = new ZodCreateMenuRequestValidator();

export const makeMenu = (): MenuTypes => {
  const inMemoryMenuRepository = new InMemoryMenuRepository();
  const { findUserByIdService, userRepository } = makeUser();
  const createMenuService = new CreateMenuService({
    findUserByIdService,
    requestValidator: createMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  return {
    createMenuService,
    userRepository,
    menuRepository: inMemoryMenuRepository,
  };
};
