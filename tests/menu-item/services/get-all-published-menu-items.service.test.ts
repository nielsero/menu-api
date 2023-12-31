import { Menu } from "@/modules/menu";
import { MenuItem } from "@/modules/menu-item";
import { User } from "@/modules/user";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyMenuItemRepository, buyGetAllPublishedMenuItemsService } from "@/modules/menu-item/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyGetAllPublishedMenuItemsService();
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
  name: "Unpublished Menu",
  description: "Unpublished Menu description",
  userId: user.id,
});

const publishedMenuItems = [
  new MenuItem({
    name: "Published Menu Item 1",
    description: "Published Menu Item description",
    price: 100,
    type: "drink",
    menuId: publishedMenu.id,
  }),
  new MenuItem({
    name: "Published Menu Item 2",
    description: "Published Menu Item description",
    price: 200,
    type: "food",
    menuId: publishedMenu.id,
  }),
];

const request = { menuId: publishedMenu.id };

describe("GetAllPublishedMenuItemsService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
    await menuRepository.add(publishedMenu);
    await menuRepository.add(unpublishedMenu);
  });

  afterAll(async () => {
    await menuRepository.clear();
    await userRepository.clear();
  });

  beforeEach(async () => {
    await menuItemRepository.add(publishedMenuItems[0]);
    await menuItemRepository.add(publishedMenuItems[1]);
  });

  afterEach(async () => {
    await menuItemRepository.clear();
  });

  it("Should return all menu items from published menu", async () => {
    const menuItems = await sut.execute(request);
    expect(menuItems.length).toBe(2);
  });

  it("Should return an empty array if published menu is empty", async () => {
    await menuItemRepository.clear();
    const menuItems = await sut.execute(request);
    expect(menuItems.length).toBe(0);
  });

  it("Should throw an error if menu does not exist", async () => {
    const invalidMenuRequest = { menuId: "invalid-id" };
    await expect(sut.execute(invalidMenuRequest)).rejects.toThrow();
  });

  it("Should throw an error if menu is not published", async () => {
    const unpublishedMenuRequest = { menuId: unpublishedMenu.id };
    await expect(sut.execute(unpublishedMenuRequest)).rejects.toThrow();
  });
});
