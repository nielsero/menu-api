import { MenuItem } from "@/modules/menu/entities";
import { RequestValidator } from "@/shared/protocols";
import { MenuItemRepository, MenuRepository } from "@/modules/menu/protocols";
import { DuplicateMenuItemName, MenuNotFound } from "@/shared/errors";

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

export type AddMenuItemProviders = {
  requestValidator: RequestValidator<AddMenuItemRequest>;
  menuRepository: MenuRepository;
  menuItemRepository: MenuItemRepository;
};

export class AddMenuItemService {
  private readonly requestValidator: RequestValidator<AddMenuItemRequest>;
  private readonly menuRepository: MenuRepository;
  private readonly menuItemRepository: MenuItemRepository;

  constructor(private readonly providers: AddMenuItemProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
    this.menuItemRepository = providers.menuItemRepository;
  }

  async execute(request: AddMenuItemRequest): Promise<AddMenuItemResponse> {
    await this.requestValidator.validate(request);
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
