import { MenuItem } from "@/modules/menu/entities";

export interface MenuItemRepository {
  add(menuItem: MenuItem): Promise<void>;
  findAllInMenu(menuId: string): Promise<MenuItem[]>;
  clear(): Promise<void>;
}
