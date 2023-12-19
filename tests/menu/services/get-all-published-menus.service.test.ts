import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyMenuRepository, buyMenuServices } from "@/store/menu";
import { buyUserRepository } from "@/store/user";

const { getAllPublishedMenusService: sut } = buyMenuServices();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();

const user1 = new User({
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "hashed-password",
});

const menu1 = new Menu({
  name: "Menu 1",
  description: "Menu 1 description",
  published: true,
  userId: user1.id,
});

const user2 = new User({
  name: "Jane Doe",
  email: "jane.doe@gmail.com",
  password: "hashed-password",
});

const menu2 = new Menu({
  name: "Menu 2",
  description: "Menu 2 description",
  published: true,
  userId: user2.id,
});

describe("GetAllPublishedMenusService", () => {
  beforeEach(async () => {
    await userRepository.add(user1);
    await userRepository.add(user2);
    await menuRepository.add(menu1);
    await menuRepository.add(menu2);
  });

  afterEach(async () => {
    await userRepository.clear();
    await menuRepository.clear();
  });

  it("Should return all published menus", async () => {
    const menus = await sut.execute();
    expect(menus.length).toBe(2);
  });

  it("Should return empty array if no menus are found", async () => {
    await menuRepository.clear();
    const menus = await sut.execute();
    expect(menus.length).toBe(0);
  });
});
