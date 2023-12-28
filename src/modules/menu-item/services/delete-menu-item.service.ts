import { MenuRepository } from "@/modules/menu/protocols";
import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { MenuItemNotFound, MenuNotFound } from "@/shared/errors";

export type DeleteMenuItemRequest = {
  id: string;
  menuId: string;
  userId: string;
};

type Providers = {
  menuRepository: MenuRepository;
  menuItemRepository: MenuItemRepository;
};

export class DeleteMenuItemService {
  private readonly menuRepository: MenuRepository;
  private readonly menuItemRepository: MenuItemRepository;

  constructor(private readonly providers: Providers) {
    this.menuRepository = providers.menuRepository;
    this.menuItemRepository = providers.menuItemRepository;
  }

  async execute(request: DeleteMenuItemRequest): Promise<void> {
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.menuId);
    if (!menu) throw new MenuNotFound();
    const menuItems = await this.menuItemRepository.findAllInMenu(menu.id);
    const menuItem = menuItems.find((item) => item.id === request.id);
    if (!menuItem) throw new MenuItemNotFound();
    await this.menuItemRepository.delete(menuItem.id);
  }
}
