import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyMenuRepository, buyMenuServices } from "@/store/menu";
import { buyUserRepository } from "@/store/user";

const { getAllMenusService: sut } = buyMenuServices();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();

const user = new User({
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "hashed-password",
});

const menu1 = new Menu({
  name: "Menu 1",
  description: "Menu 1 description",
  userId: user.id,
});

const menu2 = new Menu({
  name: "Menu 2",
  description: "Menu 2 description",
  userId: user.id,
});

const menu3 = new Menu({
  name: "Menu 3",
  description: "Menu 3 description",
  userId: user.id,
});

const request = {
  userId: user.id,
};

describe("GetAllMenusService", () => {
  beforeAll(async () => {
    await userRepository.add(user);
  });

  afterAll(async () => {
    await userRepository.clear();
  });

  beforeEach(async () => {
    await menuRepository.add(menu1);
    await menuRepository.add(menu2);
    await menuRepository.add(menu3);
  });

  afterEach(async () => {
    await menuRepository.clear();
  });

  it("Should return all menus", async () => {
    const menus = await sut.execute(request);
    expect(menus.length).toBe(3);
  });

  it("Should return empty array if no menus are found", async () => {
    await menuRepository.clear();
    const menus = await sut.execute(request);
    expect(menus.length).toBe(0);
  });
});
