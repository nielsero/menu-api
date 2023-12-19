import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyMenuRepository, buyMenuServices } from "@/store/menu";
import { buyUserRepository } from "@/store/user";

const { deleteMenuService: sut } = buyMenuServices();
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

describe("EditMenuService", () => {
  beforeEach(async () => {
    await userRepository.add(user);
    await menuRepository.add(menu);
  });

  afterEach(async () => {
    await userRepository.clear();
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
