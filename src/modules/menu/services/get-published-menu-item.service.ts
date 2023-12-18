import { MenuItemNotFound, MenuNotFound } from "@/shared/errors";
import { MenuItem } from "../entities";
import { MenuItemRepository, MenuRepository } from "../protocols";
import { RequestValidator } from "@/shared/protocols";

export type GetPublishedMenuItemRequest = {
  id: string;
  menuId: string;
};

export type GetPublishedMenuItemResponse = MenuItem;

export type GetPublishedMenuItemProviders = {
  requestValidator: RequestValidator<GetPublishedMenuItemRequest>;
  menuRepository: MenuRepository;
  menuItemRepository: MenuItemRepository;
};

export class GetPublishedMenuItemService {
  private readonly requestValidator: RequestValidator<GetPublishedMenuItemRequest>;
  private readonly menuRepository: MenuRepository;
  private readonly menuItemRepository: MenuItemRepository;

  constructor(private readonly providers: GetPublishedMenuItemProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
    this.menuItemRepository = providers.menuItemRepository;
  }

  async execute(request: GetPublishedMenuItemRequest): Promise<GetPublishedMenuItemResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllPublished();
    const menu = menus.find((menu) => menu.id === request.menuId);
    if (!menu) throw new MenuNotFound();
    const menuItems = await this.menuItemRepository.findAllInMenu(menu.id);
    const menuItem = menuItems.find((item) => item.id === request.id);
    if (!menuItem) throw new MenuItemNotFound();
    return menuItem;
  }
}
