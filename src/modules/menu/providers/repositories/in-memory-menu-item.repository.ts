import { MenuItemRepository } from "@/modules/menu/protocols";
import { MenuItem } from "@/modules/menu/entities";

export class InMemoryMenuItemRepository implements MenuItemRepository {
  private readonly menuItems: MenuItem[] = [];

  async add(menuItem: MenuItem): Promise<void> {
    this.menuItems.push(menuItem);
  }

  async findAllInMenu(menuId: string): Promise<MenuItem[]> {
    const menuItems = this.menuItems.filter((menuItem) => menuItem.menuId === menuId);
    return menuItems;
  }

  async update(menuItem: MenuItem): Promise<void> {
    const index = this.menuItems.findIndex((item) => item.id === menuItem.id);
    this.menuItems[index] = menuItem;
  }

  async clear(): Promise<void> {
    this.menuItems.length = 0;
  }
}
