import { User } from "@/modules/user";
import { UserAlreadyExists } from "@/shared/errors";
import { buyUserRepository, buyUserServices } from "@/modules/user/store";

const request = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "password",
};

describe("CreateUserService", () => {
  it("Should create user and add it to the database", async () => {
    const { createUserService: sut } = buyUserServices();
    const repository = buyUserRepository();
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
    const { createUserService: sut } = buyUserServices();
    const repository = buyUserRepository();
    const user = new User(request);
    repository.add(user);
    await expect(sut.execute(request)).rejects.toThrow(UserAlreadyExists);
  });
});
