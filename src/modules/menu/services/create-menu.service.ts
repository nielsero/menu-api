import { MenuRepository } from "@/modules/menu/protocols";
import { Menu } from "@/modules/menu";
import { DuplicateMenuName } from "@/shared/errors";

export type CreateMenuRequest = {
  name: string;
  description?: string;
  userId: string;
};

export type CreateMenuResponse = Menu;

export class CreateMenuService {
  constructor(private readonly repository: MenuRepository) {}

  async execute(request: CreateMenuRequest): Promise<CreateMenuResponse> {
    const menus = await this.repository.findAllByUser(request.userId);
    const menuAlreadyExists = menus.some((menu) => menu.name === request.name);
    if (menuAlreadyExists) throw new DuplicateMenuName();
    const menu = new Menu(request);
    await this.repository.add(menu);
    return menu;
  }
}
