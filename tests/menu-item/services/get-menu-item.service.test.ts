import { Menu } from "@/modules/menu";
import { MenuItem } from "@/modules/menu-item";
import { User } from "@/modules/user";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyMenuItemRepository, buyMenuItemServices } from "@/modules/menu-item/store";
import { buyUserRepository } from "@/modules/user/store";

const { getMenuItemService: sut } = buyMenuItemServices();
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

const anotherMenu = new Menu({
  name: "Menu 2",
  description: "Menu 2 description",
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

describe("GetMenuItemService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
    await menuRepository.add(menu);
    await menuRepository.add(anotherMenu);
    await menuItemRepository.add(menuItem);
  });

  afterAll(async () => {
    await menuRepository.clear();
    await userRepository.clear();
    await menuItemRepository.clear();
  });

  it("Should return a menu item", async () => {
    const item = await sut.execute(request);
    expect(item).toEqual(menuItem);
  });

  it("Should throw an error if menu item does not exist", async () => {
    const invalidMenuItemRequest = { ...request, id: "invalid-id" };
    await expect(sut.execute(invalidMenuItemRequest)).rejects.toThrow();
  });

  it("Shoud throw an error if menu does not exist", async () => {
    const invalidMenuRequest = { ...request, menuId: "invalid-id" };
    await expect(sut.execute(invalidMenuRequest)).rejects.toThrow();
  });

  it("Should throw an error if menu item does not belong to the menu", async () => {
    const wrongMenuRequest = { ...request, menuId: anotherMenu.id };
    await expect(sut.execute(wrongMenuRequest)).rejects.toThrow();
  });
});
