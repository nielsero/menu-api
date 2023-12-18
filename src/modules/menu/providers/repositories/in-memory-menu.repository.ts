import { MenuRepository } from "@/modules/menu/protocols";
import { Menu } from "@/modules/menu/entities";

export class InMemoryMenuRepository implements MenuRepository {
  private readonly menus: Menu[] = [];

  async add(menu: Menu): Promise<void> {
    this.menus.push(menu);
  }

  async findAllByUser(userId: string): Promise<Menu[]> {
    const menus = this.menus.filter((menu) => menu.userId === userId);
    return menus;
  }

  async update(menu: Menu): Promise<void> {
    const menuIndex = this.menus.findIndex((m) => m.id === menu.id);
    this.menus[menuIndex] = menu;
  }

  async delete(id: string): Promise<void> {
    const menuIndex = this.menus.findIndex((m) => m.id === id);
    this.menus.splice(menuIndex, 1);
  }

  async findAllPublished(): Promise<Menu[]> {
    const menus = this.menus.filter((menu) => menu.published);
    return menus;
  }

  async clear(): Promise<void> {
    this.menus.length = 0;
  }
}
