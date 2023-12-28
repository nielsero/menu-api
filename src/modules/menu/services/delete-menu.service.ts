import { MenuRepository } from "@/modules/menu/protocols";
import { MenuNotFound } from "@/shared/errors";
import { MenuItemRepository } from "@/modules/menu-item/protocols";

export type DeleteMenuRequest = {
  id: string;
  userId: string;
};

export type DeleteMenuResponse = void;

export type DeleteMenuProviders = {
  menuRepository: MenuRepository;
  menuItemRepository: MenuItemRepository;
};

export class DeleteMenuService {
  private readonly menuRepository: MenuRepository;
  private readonly menuItemRepository: MenuItemRepository;

  constructor(private readonly providers: DeleteMenuProviders) {
    this.menuRepository = providers.menuRepository;
    this.menuItemRepository = providers.menuItemRepository;
  }

  async execute(request: DeleteMenuRequest): Promise<DeleteMenuResponse> {
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    await this.menuItemRepository.deleteAllFromMenu(menu.id);
    await this.menuRepository.delete(menu.id);
  }
}
