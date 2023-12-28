import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { MenuItem } from "@/modules/menu-item";

export class InMemoryMenuItemRepository implements MenuItemRepository {
  private readonly menuItems: MenuItem[] = [];

  async add(menuItem: MenuItem): Promise<void> {
    const newMenuItem = new MenuItem(menuItem);
    this.menuItems.push(newMenuItem);
  }

  async findAllInMenu(menuId: string): Promise<MenuItem[]> {
    const menuItems = this.menuItems.filter((menuItem) => menuItem.menuId === menuId);
    const foundMenuItems = menuItems.map((menuItem) => new MenuItem(menuItem));
    return foundMenuItems;
  }

  async update(menuItem: MenuItem): Promise<void> {
    const index = this.menuItems.findIndex((item) => item.id === menuItem.id);
    const updatedMenuItem = new MenuItem(menuItem);
    this.menuItems[index] = updatedMenuItem;
  }

  async delete(id: string): Promise<void> {
    const index = this.menuItems.findIndex((item) => item.id === id);
    this.menuItems.splice(index, 1);
  }

  async deleteAllFromMenu(menuId: string): Promise<void> {
    const menuItems = this.menuItems.filter((menuItem) => menuItem.menuId === menuId);
    menuItems.forEach((menuItem) => this.delete(menuItem.id));
  }

  async clear(): Promise<void> {
    this.menuItems.length = 0;
  }
}
