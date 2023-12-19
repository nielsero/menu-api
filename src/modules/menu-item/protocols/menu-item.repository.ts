import { MenuItem } from "@/modules/menu-item";

export interface MenuItemRepository {
  add(menuItem: MenuItem): Promise<void>;
  findAllInMenu(menuId: string): Promise<MenuItem[]>;
  update(menuItem: MenuItem): Promise<void>;
  delete(id: string): Promise<void>;
  deleteAllFromMenu(menuId: string): Promise<void>;
  clear(): Promise<void>;
}
