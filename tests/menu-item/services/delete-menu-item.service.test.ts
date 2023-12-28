import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { MenuItem } from "@/modules/menu-item";
import { buyDeleteMenuItemService, buyMenuItemRepository } from "@/modules/menu-item/store";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyDeleteMenuItemService();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();
const menuItemRepository = buyMenuItemRepository();

const user = new User({
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "hashed-password",
});

const menu = new Menu({
  name: "Menu 1",
  description: "Menu 1 description",
  userId: user.id,
});

const menuItem = new MenuItem({
  name: "Menu Item 1",
  description: "Menu Item 1 description",
  price: 100,
  type: "drink",
  menuId: menu.id,
});

const request = { id: menuItem.id, menuId: menu.id, userId: user.id };

describe("DeleteMenuItemService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
    await menuRepository.add(menu);
  });

  afterAll(async () => {
    await menuRepository.clear();
    await userRepository.clear();
  });

  beforeEach(async () => {
    await menuItemRepository.add(menuItem);
  });

  afterEach(async () => {
    await menuItemRepository.clear();
  });

  it("Should delete menu item from the database", async () => {
    await sut.execute(request);
    const menuItems = await menuItemRepository.findAllInMenu(menu.id);
    expect(menuItems).toHaveLength(0);
  });

  it("Should throw an error if menu item does not exist", async () => {
    await menuItemRepository.clear();
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
