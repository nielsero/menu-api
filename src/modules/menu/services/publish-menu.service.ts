import { RequestValidator } from "@/shared/protocols";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuNotFound, UserNotFound } from "@/shared/errors";

export type PublishMenuRequest = {
  id: string;
  userId: string;
};

export type PublishMenuResponse = void;

export type PublishMenuProviders = {
  requestValidator: RequestValidator<PublishMenuRequest>;
  menuRepository: MenuRepository;
};

export class PublishMenuService {
  private readonly requestValidator: RequestValidator<PublishMenuRequest>;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: PublishMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: PublishMenuRequest): Promise<PublishMenuResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    if (menu.published) return;
    menu.published = true;
    await this.menuRepository.update(menu);
  }
}