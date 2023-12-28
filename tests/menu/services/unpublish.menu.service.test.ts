import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyMenuRepository, buyMenuServices } from "@/modules/menu/store";
import { buyUserRepository } from "@/modules/user/store";

const { unpublishMenuService: sut } = buyMenuServices();
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
  published: true,
});

const request = {
  id: menu.id,
  userId: user.id,
};

describe("UnpublishMenuService", () => {
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

  it("Should unpublish a menu", async () => {
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    const unpublishedMenu = menus.find((m) => m.id === request.id);
    expect(unpublishedMenu).toBeDefined();
    expect(unpublishedMenu?.published).toBe(false);
  });

  it("Should throw if menu does not exist", async () => {
    const request = {
      id: "wrong-menu-id",
      userId: user.id,
    };
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
