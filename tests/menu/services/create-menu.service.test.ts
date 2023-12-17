import { makeMenu } from "@/factories";
import { MenuRepository } from "@/modules/menu/protocols";
import { CreateMenuService } from "@/modules/menu/services";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

type SutTypes = {
  sut: CreateMenuService;
  menuRepository: MenuRepository;
  userRepository: UserRepository;
};

const makeSut = (): SutTypes => {
  const { createMenuService: sut, menuRepository, userRepository } = makeMenu();
  return { sut, menuRepository, userRepository };
};

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
  afterEach(async () => {
    const { userRepository } = makeSut();
    await userRepository.clear();
  });

  it("Should create menu and add it to the database", async () => {
    const { sut, menuRepository, userRepository } = makeSut();
    await userRepository.add(user);
    await sut.execute(request);
    const menus = await menuRepository.findAllByUser(user.id);
    expect(menus).toHaveLength(1);
  });

  it("Should throw an error if user does not exist", async () => {
    const { sut } = makeSut();
    await expect(sut.execute(request)).rejects.toThrow();
  });

  it("Should throw if request name is invalid", async () => {
    const { sut, userRepository } = makeSut();
    await userRepository.add(user);
    const nameTooShortRequest = {
      name: "Me",
      description: "Menu 1 description",
      userId: user.id,
    };
    await expect(sut.execute(nameTooShortRequest)).rejects.toThrow();
  });

  it("Should throw if user already has menu with same name", async () => {
    const { sut, userRepository } = makeSut();
    await userRepository.add(user);
    await sut.execute(request);
    await expect(sut.execute(request)).rejects.toThrow();
  });
});
