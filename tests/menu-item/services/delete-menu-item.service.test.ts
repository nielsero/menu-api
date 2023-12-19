import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { MenuItem } from "@/modules/menu-item";
import { buyMenuItemRepository, buyMenuItemServices } from "@/store/menu-item";
import { buyMenuRepository } from "@/store/menu";
import { buyUserRepository } from "@/store/user";

const { deleteMenuItemService: sut } = buyMenuItemServices();
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

const request = {
  id: menuItem.id,
  menuId: menu.id,
  userId: user.id,
};

describe("DeleteMenuItemService", () => {
  beforeEach(async () => {
    await userRepository.add(user);
    await menuRepository.add(menu);
    await menuItemRepository.add(menuItem);
  });

  afterEach(async () => {
    await userRepository.clear();
    await menuRepository.clear();
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

  it("Should throw an error if user is not the owner of the menu item", async () => {
    const anotherUser = new User({
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      password: "hashed-password",
    });
    userRepository.add(anotherUser);
    const anotherUserRequest = {
      id: menuItem.id,
      menuId: menu.id,
      userId: anotherUser.id,
    };
    await expect(sut.execute(anotherUserRequest)).rejects.toThrow();
  });
});
