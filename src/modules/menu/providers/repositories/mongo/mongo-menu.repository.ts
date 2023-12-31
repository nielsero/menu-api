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
    await MenuModel.findOneAndUpdate({ id: menu.id }, menu);
  }

  async delete(id: string): Promise<void> {
    await MenuModel.findOneAndDelete({ id });
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

  async findPublishedById(id: string): Promise<Menu | null> {
    const menu = await MenuModel.findOne({ id, published: true });
    if (!menu) return null;
    return new Menu({
      id: menu.id,
      name: menu.name,
      description: menu.description,
      published: menu.published,
      userId: menu.userId,
    });
  }

  async clear(): Promise<void> {
    await MenuModel.deleteMany({});
  }
}
