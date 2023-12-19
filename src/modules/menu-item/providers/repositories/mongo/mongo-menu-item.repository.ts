import { MenuItem } from "@/modules/menu-item";
import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { MenuItemModel } from "@/modules/menu-item/providers/repositories/mongo";

export class MongoMenuItemRepository implements MenuItemRepository {
  async add(menuItem: MenuItem): Promise<void> {
    await MenuItemModel.create(menuItem);
  }

  async findAllInMenu(menuId: string): Promise<MenuItem[]> {
    const menuItems = await MenuItemModel.find({ menuId });
    const foundMenuItems = menuItems.map((menuItem) => {
      return new MenuItem({
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        type: menuItem.type,
        description: menuItem.description,
        image: menuItem.image,
        menuId: menuItem.menuId,
      });
    });
    return foundMenuItems;
  }

  async update(menuItem: MenuItem): Promise<void> {
    await MenuItemModel.findByIdAndUpdate(menuItem.id, menuItem);
  }

  async delete(id: string): Promise<void> {
    await MenuItemModel.findByIdAndDelete(id);
  }

  async clear(): Promise<void> {
    await MenuItemModel.deleteMany({});
  }
}
