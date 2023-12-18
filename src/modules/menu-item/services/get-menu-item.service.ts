import { RequestValidator } from "@/shared/protocols";
import { MenuItem } from "@/modules/menu-item";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { MenuItemNotFound, MenuNotFound } from "@/shared/errors";

export type GetMenuItemRequest = {
  id: string;
  menuId: string;
  userId: string;
};

export type GetMenuItemResponse = MenuItem;

export type GetMenuItemProviders = {
  requestValidator: RequestValidator<GetMenuItemRequest>;
  menuRepository: MenuRepository;
  menuItemRepository: MenuItemRepository;
};

export class GetMenuItemService {
  private readonly requestValidator: RequestValidator<GetMenuItemRequest>;
  private readonly menuRepository: MenuRepository;
  private readonly menuItemRepository: MenuItemRepository;

  constructor(private readonly providers: GetMenuItemProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
    this.menuItemRepository = providers.menuItemRepository;
  }

  async execute(request: GetMenuItemRequest): Promise<GetMenuItemResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.menuId);
    if (!menu) throw new MenuNotFound();
    const menuItems = await this.menuItemRepository.findAllInMenu(menu.id);
    const menuItem = menuItems.find((item) => item.id === request.id);
    if (!menuItem) throw new MenuItemNotFound();
    return menuItem;
  }
}
