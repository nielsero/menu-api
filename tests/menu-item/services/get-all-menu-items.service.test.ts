import { Menu } from "@/modules/menu";
import { MenuItem } from "@/modules/menu-item";
import { User } from "@/modules/user";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyMenuItemRepository, buyMenuItemServices } from "@/modules/menu-item/store";
import { buyUserRepository } from "@/modules/user/store";

const { getAllMenuItemsService: sut } = buyMenuItemServices();
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

const menuItem1 = new MenuItem({
  name: "Menu Item 1",
  description: "Menu Item 1 description",
  price: 100,
  type: "drink",
  menuId: menu.id,
});

const menuItem2 = new MenuItem({
  name: "Menu Item 2",
  description: "Menu Item 2 description",
  price: 200,
  type: "food",
  menuId: menu.id,
});

const menuItem3 = new MenuItem({
  name: "Menu Item 3",
  description: "Menu Item 3 description",
  price: 300,
  type: "drink",
  menuId: menu.id,
});

const request = { menuId: menu.id, userId: user.id };

describe("GetAllMenuItemsService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
    await menuRepository.add(menu);
  });

  afterAll(async () => {
    await userRepository.clear();
    await menuRepository.clear();
  });

  beforeEach(async () => {
    await menuItemRepository.add(menuItem1);
    await menuItemRepository.add(menuItem2);
    await menuItemRepository.add(menuItem3);
  });

  afterEach(async () => {
    await menuItemRepository.clear();
  });

  it("Should return all menu items from a menu", async () => {
    const menuItems = await sut.execute(request);
    expect(menuItems.length).toBe(3);
  });

  it("Should return an empty array if menu does not have any menu items", async () => {
    await menuItemRepository.clear();
    const menuItems = await sut.execute(request);
    expect(menuItems.length).toBe(0);
  });

  it("Should throw an error if menu does not exist", async () => {
    const invalidRequest = {
      menuId: "invalid-menu-id",
      userId: user.id,
    };
    await expect(sut.execute(invalidRequest)).rejects.toThrow();
  });
});
