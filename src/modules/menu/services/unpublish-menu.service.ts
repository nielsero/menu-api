import { RequestValidator } from "@/shared/protocols";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuNotFound, UserNotFound } from "@/shared/errors";

export type UnpublishMenuRequest = {
  id: string;
  userId: string;
};

export type UnpublishMenuResponse = void;

export type UnpublishMenuProviders = {
  requestValidator: RequestValidator<UnpublishMenuRequest>;
  menuRepository: MenuRepository;
};

export class UnpublishMenuService {
  private readonly requestValidator: RequestValidator<UnpublishMenuRequest>;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: UnpublishMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: UnpublishMenuRequest): Promise<UnpublishMenuResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    if (!menu.published) return;
    menu.published = false;
    await this.menuRepository.update(menu);
  }
}
