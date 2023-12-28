import { MenuItem } from "@/modules/menu-item";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { DuplicateMenuItemName, MenuItemNotFound, MenuNotFound } from "@/shared/errors";

export type EditMenuItemRequest = {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  type?: string;
  image?: string;
  menuId: string;
  userId: string;
};

export type EditMenuItemResponse = MenuItem;

type Providers = {
  menuRepository: MenuRepository;
  menuItemRepository: MenuItemRepository;
};

export class EditMenuItemService {
  private readonly menuRepository: MenuRepository;
  private readonly menuItemRepository: MenuItemRepository;

  constructor(private readonly providers: Providers) {
    this.menuRepository = providers.menuRepository;
    this.menuItemRepository = providers.menuItemRepository;
  }

  async execute(request: EditMenuItemRequest): Promise<EditMenuItemResponse> {
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.menuId);
    if (!menu) throw new MenuNotFound();
    const menuItems = await this.menuItemRepository.findAllInMenu(menu.id);
    const menuItem = menuItems.find((item) => item.id === request.id);
    if (!menuItem) throw new MenuItemNotFound();
    const isNameAlreadyTaken = menuItems.some((item) => item.name === request.name && item.id !== request.id);
    if (isNameAlreadyTaken) throw new DuplicateMenuItemName();
    menuItem.name = request.name ?? menuItem.name;
    menuItem.description = request.description ?? menuItem.description;
    menuItem.price = request.price ?? menuItem.price;
    menuItem.type = request.type ?? menuItem.type;
    menuItem.image = request.image ?? menuItem.image;
    await this.menuItemRepository.update(menuItem);
    return menuItem;
  }
}
