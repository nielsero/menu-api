import { makeMenu } from "@/factories";
import { Menu } from "@/modules/menu/entities";
import { MenuRepository } from "@/modules/menu/protocols";
import { GetAllMenusService } from "@/modules/menu/services";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

type SutTypes = {
  sut: GetAllMenusService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const makeSut = (): SutTypes => {
  const { getAllMenusService: sut, menuRepository, userRepository } = makeMenu();
  return { sut, menuRepository, userRepository };
};

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
  beforeEach(async () => {
    const { userRepository, menuRepository } = makeSut();
    await userRepository.add(user);
    await menuRepository.add(menu1);
    await menuRepository.add(menu2);
    await menuRepository.add(menu3);
  });

  afterEach(async () => {
    const { userRepository, menuRepository } = makeSut();
    await userRepository.clear();
    await menuRepository.clear();
  });

  it("Should return all menus", async () => {
    const { sut } = makeSut();
    const menus = await sut.execute(request);
    expect(menus.length).toBe(3);
  });

  it("Should return empty array if no menus are found", async () => {
    const { sut, menuRepository } = makeSut();
    await menuRepository.clear();
    const menus = await sut.execute(request);
    expect(menus.length).toBe(0);
  });
});
