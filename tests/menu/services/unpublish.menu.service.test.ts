import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyMenuRepository, buyMenuServices } from "@/store/menu";
import { buyUserRepository } from "@/store/user";

const { unpublishMenuService: sut } = buyMenuServices();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();

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
    await userRepository.add(user);
    await menuRepository.add(menu);
  });

  afterEach(async () => {
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
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    const unpublishedMenu = menus[0];
    expect(unpublishedMenu.published).toBe(false);
  });

  it("Should throw if menu does not exist", async () => {
    const request = {
      id: "wrong-menu-id",
      userId: user.id,
    };
    await expect(sut.execute(request)).rejects.toThrow();
  });

  it("Should throw if user does not exist", async () => {
    const request = {
      id: menu.id,
      userId: "wrong-user-id",
    };
    await expect(sut.execute(request)).rejects.toThrow();
  });

  it("Should throw if user is not the owner of the menu", async () => {
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
