import { Menu } from "@/modules/menu/entities";

export interface MenuRepository {
  add(menu: Menu): Promise<void>;
  findAllByUser(userId: string): Promise<Menu[]>;
  update(menu: Menu): Promise<void>;
  delete(id: string): Promise<void>;
  findAllPublished(): Promise<Menu[]>;
  clear(): Promise<void>;
}
