import { makeMenuItem } from "@/factories";
import { Menu } from "@/modules/menu";
import { MenuRepository } from "@/modules/menu/protocols";
import { MenuItemRepository } from "@/modules/menu-item/protocols";
import { AddMenuItemService } from "@/modules/menu-item/services";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

type SutTypes = {
  sut: AddMenuItemService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
  menuItemRepository: MenuItemRepository;
};

const makeSut = (): SutTypes => {
  const { addMenuItemService: sut, menuRepository, userRepository, menuItemRepository } = makeMenuItem();
  return { sut, menuRepository, userRepository, menuItemRepository };
};

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
  beforeEach(async () => {
    const { userRepository, menuRepository } = makeSut();
    await userRepository.add(user);
    await menuRepository.add(menu);
  });

  afterEach(async () => {
    const { userRepository, menuRepository, menuItemRepository } = makeSut();
    await userRepository.clear();
    await menuRepository.clear();
    await menuItemRepository.clear();
  });

  it("Should add menu item to the database", async () => {
    const { sut, menuItemRepository } = makeSut();
    await sut.execute(request);
    const menuItems = await menuItemRepository.findAllInMenu(menu.id);
    expect(menuItems).toHaveLength(1);
  });

  it("Should throw an error if request name is invalid", async () => {
    const { sut } = makeSut();
    const nameTooShortRequest = {
      name: "Me",
      description: "Menu Item 1 description",
      price: 100,
      type: "drink",
      menuId: menu.id,
      userId: user.id,
    };
    await expect(sut.execute(nameTooShortRequest)).rejects.toThrow();
  });

  it("Should throw an error if request price is invalid", async () => {
    const { sut } = makeSut();
    const priceTooLowRequest = {
      name: "Menu Item 1",
      description: "Menu Item 1 description",
      price: -1,
      type: "drink",
      menuId: menu.id,
      userId: user.id,
    };
    await expect(sut.execute(priceTooLowRequest)).rejects.toThrow();
  });

  it("Should throw an error if request type is invalid", async () => {
    const { sut } = makeSut();
    const invalidTypeRequest = {
      name: "Menu Item 1",
      description: "Menu Item 1 description",
      price: 100,
      type: "invalid",
      menuId: menu.id,
      userId: user.id,
    };
    await expect(sut.execute(invalidTypeRequest)).rejects.toThrow();
  });

  it("Should throw an error if menu does not exist", async () => {
    const { sut, menuRepository } = makeSut();
    await menuRepository.clear();
    await expect(sut.execute(request)).rejects.toThrow();
  });

  it("Should throw an error if user does not own the menu", async () => {
    const { sut } = makeSut();
    const otherUser = new User({
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      password: "hashed-password",
    });
    const otherUserRequest = {
      name: "Menu Item 1",
      description: "Menu Item 1 description",
      price: 100,
      type: "drink",
      menuId: menu.id,
      userId: otherUser.id,
    };
    await expect(sut.execute(otherUserRequest)).rejects.toThrow();
  });

  it("Should throw an error if user already has menu item with same name", async () => {
    const { sut } = makeSut();
    await sut.execute(request);
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
