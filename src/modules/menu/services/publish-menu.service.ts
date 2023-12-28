import { MenuRepository } from "@/modules/menu/protocols";
import { MenuNotFound } from "@/shared/errors";
import { Menu } from "@/modules/menu";

export type PublishMenuRequest = {
  id: string;
  userId: string;
};

export type PublishMenuResponse = Menu;

export class PublishMenuService {
  constructor(private readonly repository: MenuRepository) {}

  async execute(request: PublishMenuRequest): Promise<PublishMenuResponse> {
    const menus = await this.repository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    if (menu.published) return menu;
    menu.published = true;
    await this.repository.update(menu);
    return menu;
  }
}
