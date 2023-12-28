import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyGetAllPublishedMenusService, buyMenuRepository } from "@/modules/menu/store";
import { buyUserRepository } from "@/modules/user/store";

const sut = buyGetAllPublishedMenusService();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();

const users = [
  new User({
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "hashed-password",
  }),
  new User({
    name: "Jane Doe",
    email: "jane.doe@gmail.com",
    password: "hashed-password",
  }),
];

const menus = [
  new Menu({
    name: "Menu 1",
    description: "Menu 1 description",
    published: true,
    userId: users[0].id,
  }),
  new Menu({
    name: "Menu 2",
    description: "Menu 2 description",
    published: true,
    userId: users[1].id,
  }),
  new Menu({
    name: "Menu 3",
    description: "Menu 3 description",
    published: false,
    userId: users[0].id,
  }),
];

describe("GetAllPublishedMenusService", () => {
  beforeAll(async () => {
    await userRepository.add(users[0]);
    await userRepository.add(users[1]);
  });

  afterAll(async () => {
    await userRepository.clear();
  });

  beforeEach(async () => {
    await menuRepository.add(menus[0]);
    await menuRepository.add(menus[1]);
    await menuRepository.add(menus[2]);
  });

  afterEach(async () => {
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
