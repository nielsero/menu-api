import { makeMenu } from "@/factories";
import { Menu } from "@/modules/menu/entities";
import { MenuRepository } from "@/modules/menu/protocols";
import { DeleteMenuService } from "@/modules/menu/services";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

type SutTypes = {
  sut: DeleteMenuService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const makeSut = (): SutTypes => {
  const { deleteMenuService: sut, menuRepository, userRepository } = makeMenu();
  return { sut, menuRepository, userRepository };
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
  id: menu.id,
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
  });

  it("Should delete existing user menu from the database", async () => {
    const { sut, menuRepository } = makeSut();
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    expect(menus.length).toBe(0);
  });

  it("Should throw an error if menu does not exist", async () => {
    const { sut } = makeSut();
    const nonExistingMenuRequest = {
      id: "fake-menu-id",
      userId: user.id,
    };
    await expect(sut.execute(nonExistingMenuRequest)).rejects.toThrow();
  });

  it("Should throw an error if user does not exist", async () => {
    const { sut } = makeSut();
    const nonExistingUserRequest = {
      id: menu.id,
      userId: "fake-user-id",
    };
    await expect(sut.execute(nonExistingUserRequest)).rejects.toThrow();
  });

  it("Should throw an error if user is not the owner of the menu", async () => {
    const { sut, userRepository } = makeSut();
    const otherUser = new User({
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      password: "hashed-password",
    });
    await userRepository.add(otherUser);
    const otherUserRequest = {
      id: menu.id,
      userId: otherUser.id,
    };
    await expect(sut.execute(otherUserRequest)).rejects.toThrow();
  });
});