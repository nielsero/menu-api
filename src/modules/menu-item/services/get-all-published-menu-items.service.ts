import { MenuNotFound } from "@/shared/errors";
import { MenuItem } from "@/modules/menu-item";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { RequestValidator } from "@/shared/protocols";

export type GetAllPublishedMenuItemsRequest = {
  menuId: string;
};

export type GetAllPublishedMenuItemsResponse = MenuItem[];

export type GetAllPublishedMenuItemsProviders = {
  requestValidator: RequestValidator<GetAllPublishedMenuItemsRequest>;
  menuRepository: MenuRepository;
  menuItemRepository: MenuItemRepository;
};

export class GetAllPublishedMenuItemsService {
  private readonly requestValidator: RequestValidator<GetAllPublishedMenuItemsRequest>;
  private readonly menuRepository: MenuRepository;
  private readonly menuItemRepository: MenuItemRepository;

  constructor(private readonly providers: GetAllPublishedMenuItemsProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
    this.menuItemRepository = providers.menuItemRepository;
  }

  async execute(request: GetAllPublishedMenuItemsRequest): Promise<GetAllPublishedMenuItemsResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllPublished();
    const menu = menus.find((menu) => menu.id === request.menuId);
    if (!menu) throw new MenuNotFound();
    const menuItems = await this.menuItemRepository.findAllInMenu(menu.id);
    return menuItems;
  }
}
