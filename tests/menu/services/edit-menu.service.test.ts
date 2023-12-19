import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyMenuRepository, buyMenuServices } from "@/store/menu";
import { buyUserRepository } from "@/store/user";

const { editMenuService: sut } = buyMenuServices();
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
  name: "Updated Menu 1",
  description: "Updated Menu 1 description",
  userId: user.id,
};

describe("EditMenuService", () => {
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

  it("Should update menu and save it to the database", async () => {
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    const updatedMenu = menus.find((m) => m.id === request.id);
    expect(updatedMenu).toBeDefined();
    expect(updatedMenu?.name).toBe(request.name);
    expect(updatedMenu?.description).toBe(request.description);
  });

  it("Should throw an error if menu does not exist", async () => {
    const invalidMenuRequest = {
      id: "invalid-menu-id",
      name: "Updated Menu 1",
      description: "Updated Menu 1 description",
      userId: user.id,
    };
    await expect(sut.execute(invalidMenuRequest)).rejects.toThrow();
  });

  it("Should throw an error if request name is invalid", async () => {
    const nameTooShortRequest = {
      id: menu.id,
      name: "Me",
      description: "Updated Menu 1 description",
      userId: user.id,
    };
    await expect(sut.execute(nameTooShortRequest)).rejects.toThrow();
  });

  it("Should throw an error if user already has menu with same name", async () => {
    const anotherMenu = new Menu({
      name: "Menu 2",
      description: "Menu 2 description",
      userId: user.id,
    });
    await menuRepository.add(anotherMenu);
    const sameNameRequest = {
      id: menu.id,
      name: "Menu 2",
      description: "Menu 2 description",
      userId: user.id,
    };
    await expect(sut.execute(sameNameRequest)).rejects.toThrow();
  });

  it("Should update menu if current name is sent", async () => {
    const currentNameRequest = {
      id: menu.id,
      name: menu.name,
      description: "Updated Menu 1 description",
      userId: user.id,
    };
    await sut.execute(currentNameRequest);
    const menus = await menuRepository.findAllByUser(user.id);
    const updatedMenu = menus.find((m) => m.id === request.id);
    expect(updatedMenu).toBeDefined();
    expect(updatedMenu?.name).toBe(currentNameRequest.name);
    expect(updatedMenu?.description).toBe(currentNameRequest.description);
  });
});
