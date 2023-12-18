import { RequestValidator } from "@/shared/protocols";
import { MenuRepository } from "@/modules/menu/protocols";
import { Menu } from "@/modules/menu/entities";
import { DuplicateMenuName, UserNotFound } from "@/shared/errors";

export type CreateMenuRequest = {
  name: string;
  description?: string;
  userId: string;
};

export type CreateMenuResponse = {
  id: string;
  name: string;
  description: string;
  published: boolean;
  userId: string;
};

export type CreateMenuProviders = {
  requestValidator: RequestValidator<CreateMenuRequest>;
  menuRepository: MenuRepository;
};

export class CreateMenuService {
  private readonly requestValidator: RequestValidator<CreateMenuRequest>;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: CreateMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: CreateMenuRequest): Promise<CreateMenuResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menuAlreadyExists = menus.some((menu) => menu.name === request.name);
    if (menuAlreadyExists) throw new DuplicateMenuName();
    const menu = new Menu(request);
    await this.menuRepository.add(menu);
    return menu;
  }
}
