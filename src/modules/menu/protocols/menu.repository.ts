import { Menu } from "@/modules/menu/entities";

export interface MenuRepository {
  add(menu: Menu): Promise<void>;
}
