import { MenuNotFound } from "@/shared/errors";
import { MenuItem } from "../entities";
import { MenuItemRepository, MenuRepository } from "../protocols";

export type GetAllPublishedMenuItemsRequest = {
  menuId: string;
};

export type GetAllPublishedMenuItemsResponse = MenuItem[];

export type GetAllPublishedMenuItemsProviders = {
  menuRepository: MenuRepository;
  menuItemRepository: MenuItemRepository;
};

export class GetAllPublishedMenuItemsService {
  private readonly menuRepository: MenuRepository;
  private readonly menuItemRepository: MenuItemRepository;

  constructor(private readonly providers: GetAllPublishedMenuItemsProviders) {
    this.menuRepository = providers.menuRepository;
    this.menuItemRepository = providers.menuItemRepository;
  }

  async execute(request: GetAllPublishedMenuItemsRequest): Promise<GetAllPublishedMenuItemsResponse> {
    const menus = await this.menuRepository.findAllPublished();
    const menu = menus.find((menu) => menu.id === request.menuId);
    if (!menu) throw new MenuNotFound();
    const menuItems = await this.menuItemRepository.findAllInMenu(menu.id);
    return menuItems;
  }
}
