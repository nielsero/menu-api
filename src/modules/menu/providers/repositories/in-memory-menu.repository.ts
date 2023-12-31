import { MenuRepository } from "@/modules/menu/protocols";
import { Menu } from "@/modules/menu";

export class InMemoryMenuRepository implements MenuRepository {
  private readonly menus: Menu[] = [];

  async add(menu: Menu): Promise<void> {
    const newMenu = new Menu(menu);
    this.menus.push(newMenu);
  }

  async findAllByUser(userId: string): Promise<Menu[]> {
    const menus = this.menus.filter((menu) => menu.userId === userId);
    const foundMenus = menus.map((menu) => new Menu(menu));
    return foundMenus;
  }

  async update(menu: Menu): Promise<void> {
    const menuIndex = this.menus.findIndex((m) => m.id === menu.id);
    const updatedMenu = new Menu(menu);
    this.menus[menuIndex] = updatedMenu;
  }

  async delete(id: string): Promise<void> {
    const menuIndex = this.menus.findIndex((m) => m.id === id);
    this.menus.splice(menuIndex, 1);
  }

  async findAllPublished(): Promise<Menu[]> {
    const menus = this.menus.filter((menu) => menu.published);
    const foundMenus = menus.map((menu) => new Menu(menu));
    return foundMenus;
  }

  async findPublishedById(id: string): Promise<Menu | null> {
    const menu = this.menus.find((menu) => menu.id === id && menu.published);
    const foundMenu = menu ? new Menu(menu) : null;
    return foundMenu;
  }

  async clear(): Promise<void> {
    this.menus.length = 0;
  }
}
