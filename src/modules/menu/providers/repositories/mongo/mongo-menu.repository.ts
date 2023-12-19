import { Menu } from "@/modules/menu";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuModel } from "@/modules/menu/providers/repositories/mongo";

export class MongoMenuRepository implements MenuRepository {
  async add(menu: Menu): Promise<void> {
    await MenuModel.create(menu);
  }

  async findAllByUser(userId: string): Promise<Menu[]> {
    const menus = await MenuModel.find({ userId });
    const foundMenus = menus.map((menu) => {
      return new Menu({
        id: menu.id,
        name: menu.name,
        description: menu.description,
        published: menu.published,
        userId: menu.userId,
      });
    });
    return foundMenus;
  }

  async update(menu: Menu): Promise<void> {
    await MenuModel.findByIdAndUpdate(menu.id, menu);
  }

  async delete(id: string): Promise<void> {
    await MenuModel.findByIdAndDelete(id);
  }

  async findAllPublished(): Promise<Menu[]> {
    const menus = await MenuModel.find({ published: true });
    const foundMenus = menus.map((menu) => {
      return new Menu({
        id: menu.id,
        name: menu.name,
        description: menu.description,
        published: menu.published,
        userId: menu.userId,
      });
    });
    return foundMenus;
  }

  async clear(): Promise<void> {
    await MenuModel.deleteMany({});
  }
}
