import { MenuRepository } from "@/modules/menu/protocols";
import { MenuNotFound } from "@/shared/errors";
import { Menu } from "@/modules/menu";

export type UnpublishMenuRequest = {
  id: string;
  userId: string;
};

export type UnpublishMenuResponse = Menu;

export class UnpublishMenuService {
  constructor(private readonly repository: MenuRepository) {}

  async execute(request: UnpublishMenuRequest): Promise<UnpublishMenuResponse> {
    const menus = await this.repository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    if (!menu.published) return menu;
    menu.published = false;
    await this.repository.update(menu);
    return menu;
  }
}
