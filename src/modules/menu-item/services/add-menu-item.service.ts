import { MenuItem } from "@/modules/menu-item";
import { MenuRepository } from "@/modules/menu/protocols";
import { DuplicateMenuItemName, MenuNotFound } from "@/shared/errors";
import { MenuItemRepository } from "@/modules/menu-item/protocols";

export type AddMenuItemRequest = {
  name: string;
  description?: string;
  price: number;
  type: string;
  image?: string;
  menuId: string;
  userId: string;
};

export type AddMenuItemResponse = MenuItem;

type Providers = {
  menuRepository: MenuRepository;
  menuItemRepository: MenuItemRepository;
};

export class AddMenuItemService {
  private readonly menuRepository: MenuRepository;
  private readonly menuItemRepository: MenuItemRepository;

  constructor(private readonly providers: Providers) {
    this.menuRepository = providers.menuRepository;
    this.menuItemRepository = providers.menuItemRepository;
  }

  async execute(request: AddMenuItemRequest): Promise<AddMenuItemResponse> {
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.menuId);
    if (!menu) throw new MenuNotFound();
    const menuItems = await this.menuItemRepository.findAllInMenu(menu.id);
    const menuItemAlreadyExists = menuItems.some((item) => item.name === request.name);
    if (menuItemAlreadyExists) throw new DuplicateMenuItemName();
    const menuItem = new MenuItem(request);
    await this.menuItemRepository.add(menuItem);
    return menuItem;
  }
}
