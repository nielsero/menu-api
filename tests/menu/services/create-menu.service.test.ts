import { User } from "@/modules/user";
import { buyCreateMenuService, buyMenuRepository } from "@/modules/menu/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyCreateMenuService();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();

const user = new User({
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "hashed-password",
});

const request = {
  name: "Menu 1",
  description: "Menu 1 description",
  userId: user.id,
};

describe("CreateMenuService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
  });

  afterAll(async () => {
    await userRepository.clear();
  });

  afterEach(async () => {
    await menuRepository.clear();
  });

  it("Should create menu and add it to the database", async () => {
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    expect(menus).toHaveLength(1);
  });

  it("Should throw an error if user already has menu with same name", async () => {
    await sut.execute(request);
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
