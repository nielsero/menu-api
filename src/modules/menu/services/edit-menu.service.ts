import { RequestValidator } from "@/shared/protocols";
import { MenuRepository } from "@/modules/menu/protocols";
import { DuplicateMenuName, MenuNotFound } from "@/shared/errors";
import { Menu } from "@/modules/menu";

export type EditMenuRequest = {
  id: string;
  name?: string;
  description?: string;
  userId: string;
};

export type EditMenuResponse = Menu;

export type EditMenuProviders = {
  requestValidator: RequestValidator<EditMenuRequest>;
  menuRepository: MenuRepository;
};

export class EditMenuService {
  private readonly requestValidator: RequestValidator<EditMenuRequest>;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: EditMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: EditMenuRequest): Promise<EditMenuResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    const isNameAlreadyTaken = menus.some((menu) => menu.name === request.name && menu.id !== request.id);
    if (isNameAlreadyTaken) throw new DuplicateMenuName();
    if (request.name) menu.name = request.name;
    if (request.description) menu.description = request.description;
    await this.menuRepository.update(menu);
    return menu;
  }
}
