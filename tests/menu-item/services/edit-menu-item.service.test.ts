import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { MenuItem } from "@/modules/menu-item";
import { buyEditMenuItemService, buyMenuItemRepository } from "@/modules/menu-item/store";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyEditMenuItemService();
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

const request = {
  id: menuItem.id,
  name: "Updated Menu Item",
  description: "Updated Menu Item description",
  price: 200,
  type: "food",
  menuId: menu.id,
  userId: user.id,
};

describe("EditMenuItemService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
    await menuRepository.add(menu);
    await menuRepository.add(anotherMenu);
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

  it("Should update menu item and save it to the database", async () => {
    await sut.execute(request);
    const menuItems = await menuItemRepository.findAllInMenu(menu.id);
    const updatedMenuItem = menuItems.find((item) => item.id === request.id);
    const expectedMenuItem = {
      id: request.id,
      name: request.name,
      description: request.description,
      image: expect.any(String),
      price: request.price,
      type: request.type,
      menuId: request.menuId,
    };
    expect(updatedMenuItem).toEqual(expectedMenuItem);
  });

  it("Should throw an error if menu does not exist", async () => {
    const invalidMenuRequest = {
      id: menuItem.id,
      name: "Updated Menu Item",
      description: "Updated Menu Item description",
      price: 200,
      type: "food",
      menuId: "invalid-menu-id",
      userId: user.id,
    };
    await expect(sut.execute(invalidMenuRequest)).rejects.toThrow();
  });

  it("Should throw an error if menu item does not exist", async () => {
    const invalidMenuItemRequest = {
      id: "invalid-menu-item-id",
      name: "Updated Menu Item",
      description: "Updated Menu Item description",
      price: 200,
      type: "food",
      menuId: menu.id,
      userId: user.id,
    };
    await expect(sut.execute(invalidMenuItemRequest)).rejects.toThrow();
  });

  it("Should throw an error if menu item does not belong to the menu", async () => {
    const wrongMenuRequest = {
      id: menuItem.id,
      name: "Updated Menu Item",
      description: "Updated Menu Item description",
      price: 200,
      type: "food",
      menuId: anotherMenu.id,
      userId: user.id,
    };
    await expect(sut.execute(wrongMenuRequest)).rejects.toThrow();
  });

  it("Should throw an error if request is invalid", async () => {
    const nameTooShortRequest = {
      id: menuItem.id,
      name: "Me",
      description: "Updated Menu Item description",
      price: 200,
      type: "food",
      menuId: menu.id,
      userId: user.id,
    };
    const negativePriceRequest = {
      id: menuItem.id,
      name: "Updated Menu Item",
      description: "Updated Menu Item description",
      price: -200,
      type: "food",
      menuId: menu.id,
      userId: user.id,
    };
    const invalidTypeRequest = {
      id: menuItem.id,
      name: "Updated Menu Item",
      description: "Updated Menu Item description",
      price: 200,
      type: "invalid-type",
      menuId: menu.id,
      userId: user.id,
    };
    await expect(sut.execute(nameTooShortRequest)).rejects.toThrow();
    await expect(sut.execute(negativePriceRequest)).rejects.toThrow();
    await expect(sut.execute(invalidTypeRequest)).rejects.toThrow();
  });

  it("Should throw an error if name is already in use", async () => {
    const anotherMenuItem = new MenuItem({
      name: "Menu Item 2",
      description: "Menu Item 2 description",
      price: 200,
      type: "food",
      menuId: menu.id,
    });
    await menuItemRepository.add(anotherMenuItem);
    const sameNameRequest = {
      id: menuItem.id,
      name: anotherMenuItem.name,
      description: "Updated Menu Item description",
      price: 200,
      type: "food",
      menuId: menu.id,
      userId: user.id,
    };
    await expect(sut.execute(sameNameRequest)).rejects.toThrow();
  });

  it("Should update menu item if current name is sent", async () => {
    const currentNameRequest = {
      id: menuItem.id,
      name: menuItem.name,
      description: "Updated Menu Item description",
      price: 200,
      type: "food",
      menuId: menu.id,
      userId: user.id,
    };
    await sut.execute(currentNameRequest);
    const menuItems = await menuItemRepository.findAllInMenu(menu.id);
    const updatedMenuItem = menuItems.find((item) => item.id === currentNameRequest.id);
    const expectedMenuItem = {
      id: currentNameRequest.id,
      name: currentNameRequest.name,
      description: currentNameRequest.description,
      image: expect.any(String),
      price: currentNameRequest.price,
      type: currentNameRequest.type,
      menuId: currentNameRequest.menuId,
    };
    expect(updatedMenuItem).toEqual(expectedMenuItem);
  });
});
