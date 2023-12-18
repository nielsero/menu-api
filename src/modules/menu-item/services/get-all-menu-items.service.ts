import { RequestValidator } from "@/shared/protocols";
import { MenuItem } from "@/modules/menu-item";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { MenuNotFound } from "@/shared/errors";

export type GetAllMenuItemsRequest = {
  menuId: string;
  userId: string;
};

export type GetAllMenuItemsResponse = MenuItem[];

export type GetAllMenuItemsProviders = {
  requestValidator: RequestValidator<GetAllMenuItemsRequest>;
  menuRepository: MenuRepository;
  menuItemRepository: MenuItemRepository;
};

export class GetAllMenuItemsService {
  private readonly requestValidator: RequestValidator<GetAllMenuItemsRequest>;
  private readonly menuRepository: MenuRepository;
  private readonly menuItemRepository: MenuItemRepository;

  constructor(private readonly providers: GetAllMenuItemsProviders) {
    this.requestValidator = providers.requestValidator;
    this.menuRepository = providers.menuRepository;
    this.menuItemRepository = providers.menuItemRepository;
  }

  async execute(request: GetAllMenuItemsRequest): Promise<GetAllMenuItemsResponse> {
    await this.requestValidator.validate(request);
    const menus = await this.menuRepository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.menuId);
    if (!menu) throw new MenuNotFound();
    const menuItems = await this.menuItemRepository.findAllInMenu(menu.id);
    return menuItems;
  }
}
