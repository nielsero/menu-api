import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyDeleteMenuService, buyMenuRepository } from "@/modules/menu/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyDeleteMenuService();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();

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

describe("DeleteMenuService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
  });

  afterAll(async () => {
    await userRepository.clear();
  });

  beforeEach(async () => {
    await menuRepository.add(menu);
  });

  afterEach(async () => {
    await menuRepository.clear();
  });

  it("Should delete existing user menu from the database", async () => {
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    expect(menus.length).toBe(0);
  });

  it("Should throw an error if menu does not exist", async () => {
    const nonExistingMenuRequest = {
      id: "fake-menu-id",
      userId: user.id,
    };
    await expect(sut.execute(nonExistingMenuRequest)).rejects.toThrow();
  });
});
