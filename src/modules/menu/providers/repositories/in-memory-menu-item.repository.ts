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
}
