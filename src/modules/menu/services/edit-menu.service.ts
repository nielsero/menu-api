import { MenuRepository } from "@/modules/menu/protocols";
import { DuplicateMenuName, MenuNotFound } from "@/shared/errors";
import { Menu } from "@/modules/menu";

export type EditMenuRequest = {
  id: string;
  name?: string;
  description?: string;
  userId: string;
};

export type EditMenuResponse = Menu;

export class EditMenuService {
  constructor(private readonly repository: MenuRepository) {}

  async execute(request: EditMenuRequest): Promise<EditMenuResponse> {
    const menus = await this.repository.findAllByUser(request.userId);
    const menu = menus.find((menu) => menu.id === request.id);
    if (!menu) throw new MenuNotFound();
    const isNameAlreadyTaken = menus.some((menu) => menu.name === request.name && menu.id !== request.id);
    if (isNameAlreadyTaken) throw new DuplicateMenuName();
    if (request.name) menu.name = request.name;
    if (request.description) menu.description = request.description;
    await this.repository.update(menu);
    return menu;
  }
}
