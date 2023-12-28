import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyMenuRepository, buyMenuServices } from "@/modules/menu/store";
import { buyUserRepository } from "@/modules/user/store";

const { publishMenuService: sut } = buyMenuServices();
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

describe("PublishMenuService", () => {
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

  it("Should publish a menu", async () => {
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    const publishedMenu = menus.find((m) => m.id === request.id);
    expect(publishedMenu).toBeDefined();
    expect(publishedMenu?.published).toBe(true);
  });

  it("Should throw an error if menu does not exist", async () => {
    const request = {
      id: "wrong-menu-id",
      userId: user.id,
    };
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
