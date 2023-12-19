import { User } from "@/modules/user";
import { buyMenuRepository, buyMenuServices } from "@/store/menu";
import { buyUserRepository } from "@/store/user";

const { createMenuService: sut } = buyMenuServices();
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
  beforeEach(async () => {
    await userRepository.add(user);
  });

  afterEach(async () => {
    await userRepository.clear();
    await menuRepository.clear();
  });

  it("Should create menu and add it to the database", async () => {
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    expect(menus).toHaveLength(1);
  });

  it("Should throw an error if request name is invalid", async () => {
    const nameTooShortRequest = {
      name: "Me",
      description: "Menu 1 description",
      userId: user.id,
    };
    await expect(sut.execute(nameTooShortRequest)).rejects.toThrow();
  });

  it("Should throw an error if user already has menu with same name", async () => {
    await sut.execute(request);
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
