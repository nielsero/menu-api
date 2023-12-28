import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyAddMenuItemService, buyMenuItemRepository } from "@/modules/menu-item/store";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyAddMenuItemService();
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

const request = {
  name: "Menu Item 1",
  description: "Menu Item 1 description",
  price: 100,
  type: "drink",
  menuId: menu.id,
  userId: user.id,
};

describe("AddMenuItemService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
    await menuRepository.add(menu);
  });

  afterAll(async () => {
    await menuRepository.clear();
    await userRepository.clear();
  });

  afterEach(async () => {
    await menuItemRepository.clear();
  });

  it("Should add menu item to the database", async () => {
    await sut.execute(request);
    const menuItems = await menuItemRepository.findAllInMenu(menu.id);
    const expectedMenuItem = {
      id: expect.any(String),
      name: request.name,
      description: request.description,
      image: expect.any(String),
      price: request.price,
      type: request.type,
      menuId: request.menuId,
    };
    expect(menuItems).toHaveLength(1);
    expect(menuItems[0]).toEqual(expectedMenuItem);
  });

  it("Should throw an error if menu does not exist", async () => {
    const invalidMenuRequest = {
      name: "Menu Item 1",
      description: "Menu Item 1 description",
      price: 100,
      type: "drink",
      menuId: "invalid-menu-id",
      userId: user.id,
    };
    await expect(sut.execute(invalidMenuRequest)).rejects.toThrow();
  });

  it("Should throw an error if menu already has item with same name", async () => {
    await sut.execute(request);
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
