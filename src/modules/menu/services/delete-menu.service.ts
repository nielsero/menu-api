import { RequestValidator } from "@/shared/protocols";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuNotFound } from "@/shared/errors";

export type DeleteMenuRequest = {
  id: string;
  userId: string;
};

export type DeleteMenuResponse = void;

export type DeleteMenuProviders = {
  requestValidator: RequestValidator<DeleteMenuRequest>;
  menuRepository: MenuRepository;
};

export class DeleteMenuService {
  private readonly requestValidator: RequestValidator<DeleteMenuRequest>;
  private readonly menuRepository: MenuRepository;

  constructor(private readonly providers: DeleteMenuProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
  }

  async execute(request: DeleteMenuRequest): Promise<DeleteMenuResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    await this.menuRepository.delete(menu.id);
  }
}
