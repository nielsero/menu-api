import { Menu } from "@/modules/menu";
import { MenuItem } from "@/modules/menu-item";
import { User } from "@/modules/user";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyGetMenuItemService, buyMenuItemRepository } from "@/modules/menu-item/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyGetMenuItemService();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();
const menuItemRepository = buyMenuItemRepository();

const user = new User({
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "hashed-password",
});

const menus = [
  new Menu({
    name: "Menu 1",
    description: "Menu 1 description",
    userId: user.id,
  }),
  new Menu({
    name: "Menu 2",
    description: "Menu 2 description",
    userId: user.id,
  }),
];

const menuItem = new MenuItem({
  name: "Menu Item 1",
  description: "Menu Item 1 description",
  price: 100,
  type: "drink",
  menuId: menus[0].id,
});

const request = { id: menuItem.id, menuId: menus[0].id, userId: user.id };

describe("GetMenuItemService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
    await menuRepository.add(menus[0]);
    await menuRepository.add(menus[1]);
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
    const wrongMenuRequest = { ...request, menuId: menus[1].id };
    await expect(sut.execute(wrongMenuRequest)).rejects.toThrow();
  });
});
