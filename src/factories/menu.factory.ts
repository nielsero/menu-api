import { MenuRepository } from "@/modules/menu/protocols";
import { InMemoryMenuRepository } from "@/modules/menu/providers/repositories";
import { ZodCreateMenuRequestValidator } from "@/modules/menu/providers/validators";
import { CreateMenuService } from "@/modules/menu/services";
import { makeUser } from "@/factories";

export type MenuTypes = {
  createMenuService: CreateMenuService;
  menuRepository: MenuRepository;
};

const createMenuRequestValidator = new ZodCreateMenuRequestValidator();

export const makeMenu = (): MenuTypes => {
  const inMemoryMenuRepository = new InMemoryMenuRepository();
  const { findUserByIdService } = makeUser();
  const createMenuService = new CreateMenuService({
    findUserByIdService,
    requestValidator: createMenuRequestValidator,
    menuRepository: inMemoryMenuRepository,
  });
  return {
    createMenuService,
    menuRepository: inMemoryMenuRepository,
  };
};
