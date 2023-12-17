import { makeUser } from "@/factories";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";
import { CreateUserService } from "@/modules/user/services";
import { UserAlreadyExists } from "@/shared/errors";

type SutTypes = {
  sut: CreateUserService;
  repository: UserRepository;
};

const makeSut = (): SutTypes => {
  const { createUserService: sut, userRepository: repository } = makeUser();
  return { sut, repository };
};

const request = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "password",
};

describe("CreateUserService", () => {
  it("Should create user and add it to the database", async () => {
    const { sut, repository } = makeSut();
    await sut.execute(request);
    const user = await repository.findByEmail(request.email);
    const expectedUser = {
      id: expect.any(String),
      name: request.name,
      email: request.email,
      password: request.password,
    };
    expect(user).toEqual(expectedUser);
  });

  it("Should throw an error if user already exists", async () => {
    const { sut, repository } = makeSut();
    const user = new User(request);
    repository.add(user);
    await expect(sut.execute(request)).rejects.toThrow(UserAlreadyExists);
  });
});
