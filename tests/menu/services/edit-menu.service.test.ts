import { makeMenu } from "@/factories";
import { Menu } from "@/modules/menu/entities";
import { MenuRepository } from "@/modules/menu/protocols";
import { EditMenuService } from "@/modules/menu/services";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";
import { after } from "node:test";

type SutTypes = {
  sut: EditMenuService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const makeSut = (): SutTypes => {
  const { editMenuService: sut, menuRepository, userRepository } = makeMenu();
  return { sut, menuRepository, userRepository };
};

const user = new User({
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "hashed-password",
});

let menu = new Menu({
  name: "Menu 1",
  description: "Menu 1 description",
  userId: user.id,
});

const request = {
  id: menu.id,
  name: "Updated Menu 1",
  description: "Updated Menu 1 description",
  userId: user.id,
};

describe("EditMenuService", () => {
  beforeEach(async () => {
    const { userRepository, menuRepository } = makeSut();
    await userRepository.add(user);
    await menuRepository.add(menu);
  });

  afterEach(async () => {
    const { userRepository, menuRepository } = makeSut();
    await userRepository.clear();
    await menuRepository.clear();
    menu = new Menu({
      name: "Menu 1",
      description: "Menu 1 description",
      userId: user.id,
    });
  });

  it("Should update menu and save it to the database", async () => {
    const { sut, menuRepository } = makeSut();
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    const updatedMenu = menus[0];
    expect(updatedMenu.name).toBe(request.name);
    expect(updatedMenu.description).toBe(request.description);
  });

  it("Should throw an error if user does not exist", async () => {
    const { sut } = makeSut();
    const invalidUserRequest = {
      id: menu.id,
      name: "Updated Menu 1",
      description: "Updated Menu 1 description",
      userId: "invalid-user-id",
    };
    await expect(sut.execute(invalidUserRequest)).rejects.toThrow();
  });

  it("Should throw an error if menu does not exist", async () => {
    const { sut } = makeSut();
    const invalidMenuRequest = {
      id: "invalid-menu-id",
      name: "Updated Menu 1",
      description: "Updated Menu 1 description",
      userId: user.id,
    };
    await expect(sut.execute(invalidMenuRequest)).rejects.toThrow();
  });

  it("Should throw an error if request name is invalid", async () => {
    const { sut } = makeSut();
    const nameTooShortRequest = {
      id: menu.id,
      name: "Me",
      description: "Updated Menu 1 description",
      userId: user.id,
    };
    await expect(sut.execute(nameTooShortRequest)).rejects.toThrow();
  });

  it("Should throw an error if user already has menu with same name", async () => {
    const { sut, menuRepository } = makeSut();
    const anotherMenu = new Menu({
      name: "Menu 2",
      description: "Menu 2 description",
      userId: user.id,
    });
    await menuRepository.add(anotherMenu);
    const sameNameRequest = {
      id: menu.id,
      name: "Menu 2",
      description: "Menu 2 description",
      userId: user.id,
    };
    await expect(sut.execute(sameNameRequest)).rejects.toThrow();
  });

  it("Should update menu if current name is sent", async () => {
    const { sut, menuRepository } = makeSut();
    const currentNameRequest = {
      id: menu.id,
      name: menu.name,
      description: "Updated Menu 1 description",
      userId: user.id,
    };
    await sut.execute(currentNameRequest);
    const menus = await menuRepository.findAllByUser(user.id);
    const updatedMenu = menus[0];
    expect(updatedMenu.name).toBe(currentNameRequest.name);
    expect(updatedMenu.description).toBe(currentNameRequest.description);
  });

  it("Should throw an error if user tries to update another user's menu", async () => {
    const { sut, userRepository } = makeSut();
    const anotherUser = new User({
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      password: "hashed-password",
    });
    await userRepository.add(anotherUser);
    const unauthorizedRequest = {
      id: menu.id,
      name: "Updated Menu 1",
      description: "Updated Menu 1 description",
      userId: anotherUser.id,
    };
    await expect(sut.execute(unauthorizedRequest)).rejects.toThrow();
  });
});
