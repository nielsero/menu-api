import { Menu } from "@/modules/menu";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuNotFound } from "@/shared/errors";

export type GetMenuRequest = {
  id: string;
  userId: string;
};

export type GetMenuResponse = Menu;

export class GetMenuService {
  constructor(private readonly repository: MenuRepository) {}

  async execute(request: GetMenuRequest): Promise<GetMenuResponse> {
    const menus = await this.repository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    return menu;
  }
}
