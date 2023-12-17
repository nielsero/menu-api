import { MenuRepository } from "@/modules/menu/protocols";
import { Menu } from "../../entities";

export class InMemoryMenuRepository implements MenuRepository {
  private readonly menus: Menu[] = [];

  async add(menu: Menu): Promise<void> {
    this.menus.push(menu);
  }

  async findAllByUser(userId: string): Promise<Menu[]> {
    const menus = this.menus.filter((menu) => menu.userId === userId);
    return menus;
  }
}
