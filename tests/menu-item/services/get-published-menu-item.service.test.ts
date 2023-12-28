import { Menu } from "@/modules/menu";
import { MenuItem } from "@/modules/menu-item";
import { User } from "@/modules/user";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyGetPublishedMenuItemService, buyMenuItemRepository } from "@/modules/menu-item/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyGetPublishedMenuItemService();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();
const menuItemRepository = buyMenuItemRepository();

const user = new User({
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "hashed-password",
});

const publishedMenu = new Menu({
  name: "Published Menu",
  description: "Published Menu description",
  published: true,
  userId: user.id,
});

const unpublishedMenu = new Menu({
  name: "Menu 1",
  description: "Menu 1 description",
  userId: user.id,
});

const publishedMenuItem = new MenuItem({
  name: "Published Menu Item",
  description: "Published Menu Item description",
  price: 100,
  type: "drink",
  menuId: publishedMenu.id,
});

const unpublishedMenuItem = new MenuItem({
  name: "Menu Item 1",
  description: "Menu Item 1 description",
  price: 200,
  type: "food",
  menuId: unpublishedMenu.id,
});

const request = { id: publishedMenuItem.id, menuId: publishedMenu.id, userId: user.id };

describe("GetPublishedMenuItemService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
    await menuRepository.add(unpublishedMenu);
    await menuRepository.add(publishedMenu);
    await menuItemRepository.add(unpublishedMenuItem);
    await menuItemRepository.add(publishedMenuItem);
  });

  afterAll(async () => {
    await menuRepository.clear();
    await userRepository.clear();
    await menuItemRepository.clear();
  });

  it("Should return a published menu item", async () => {
    const item = await sut.execute(request);
    expect(item).toEqual(publishedMenuItem);
  });

  it("Should throw an error if menu item does not exist", async () => {
    const invalidMenuItemRequest = { id: "invalid-id", menuId: publishedMenu.id, userId: user.id };
    await expect(sut.execute(invalidMenuItemRequest)).rejects.toThrow();
  });

  it("Should throw an error if menu does not exist", async () => {
    const invalidMenuRequest = { id: publishedMenuItem.id, menuId: "invalid-id", userId: user.id };
    await expect(sut.execute(invalidMenuRequest)).rejects.toThrow();
  });

  it("Should throw an error if item does not belong to the menu", async () => {
    const wrongMenuRequest = { id: publishedMenuItem.id, menuId: unpublishedMenu.id, userId: user.id };
    await expect(sut.execute(wrongMenuRequest)).rejects.toThrow();
  });

  it("Should throw an error if menu is not published", async () => {
    const request = { id: unpublishedMenuItem.id, menuId: unpublishedMenu.id, userId: user.id };
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
