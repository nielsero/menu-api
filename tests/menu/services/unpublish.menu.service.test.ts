import { makeMenu } from "@/factories";
import { Menu } from "@/modules/menu/entities";
import { MenuRepository } from "@/modules/menu/protocols";
import { UnpublishMenuService } from "@/modules/menu/services";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

type SutTypes = {
  sut: UnpublishMenuService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const makeSut = (): SutTypes => {
  const { unpublishMenuService: sut, menuRepository, userRepository } = makeMenu();
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
  published: true,
});

const request = {
  id: menu.id,
  userId: user.id,
};

describe("UnpublishMenuService", () => {
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
      published: true,
    });
  });

  it("Should unpublish a menu", async () => {
    const { sut, menuRepository } = makeSut();
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    const unpublishedMenu = menus[0];
    expect(unpublishedMenu.published).toBe(false);
  });

  it("Should throw if menu does not exist", async () => {
    const { sut } = makeSut();
    const request = {
      id: "wrong-menu-id",
      userId: user.id,
    };
    await expect(sut.execute(request)).rejects.toThrow();
  });

  it("Should throw if user does not exist", async () => {
    const { sut } = makeSut();
    const request = {
      id: menu.id,
      userId: "wrong-user-id",
    };
    await expect(sut.execute(request)).rejects.toThrow();
  });

  it("Should throw if user is not the owner of the menu", async () => {
    const { sut, userRepository } = makeSut();
    const anotherUser = new User({
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      password: "hashed-password",
    });
    await userRepository.add(anotherUser);
    const anotherUserRequest = {
      id: menu.id,
      userId: anotherUser.id,
    };
    await expect(sut.execute(anotherUserRequest)).rejects.toThrow();
  });
});
