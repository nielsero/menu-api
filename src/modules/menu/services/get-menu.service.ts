import { RequestValidator } from "@/shared/protocols";
import { Menu } from "../menu.entity";
import { MenuRepository } from "../protocols";
import { MenuNotFound } from "@/shared/errors";

export type GetMenuRequest = {
  id: string;
  userId: string;
};

export type GetMenuResponse = Menu;

export type GetMenuProviders = {
  requestValidator: RequestValidator<GetMenuRequest>;
  menuRepository: MenuRepository;
};

export class GetMenuService {
  private readonly requestValidator: RequestValidator<GetMenuRequest>;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: GetMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: GetMenuRequest): Promise<GetMenuResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    return menu;
  }
}
