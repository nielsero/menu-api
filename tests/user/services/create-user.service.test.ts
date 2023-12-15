import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";
import { InMemoryUserRepository } from "@/modules/user/providers/repositories";
import { CreateUserService } from "@/modules/user/services";

type SutTypes = {
  sut: CreateUserService;
  repository: UserRepository;
};

const makeSut = (): SutTypes => {
  const repository = new InMemoryUserRepository();
  const sut = new CreateUserService(repository);
  return { sut, repository };
};

describe("CreateUserService", () => {
  it("Should create user and add it to the database", async () => {
    const { sut, repository } = makeSut();

    const request = {
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "password",
    };

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

    const request = {
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "password",
    };

    const user = new User(request);
    repository.add(user);

    expect(sut.execute(request)).rejects.toThrow();
  });
});
