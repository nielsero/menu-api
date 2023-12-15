import { makeUser } from "@/factories";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";
import { FindUserByEmailService } from "@/modules/user/services";

type SutTypes = {
  sut: FindUserByEmailService;
  repository: UserRepository;
};

const request = { email: "john.doe@gmail.com" };

const makeSut = (): SutTypes => {
  const { findUserByEmailService: sut, userRepository: repository } = makeUser();
  return { sut, repository };
};

describe("FindUserByEmailService", () => {
  it("Should return null if user doesn't exist", async () => {
    const { sut } = makeSut();
    const response = await sut.execute(request);
    expect(response).toBeNull();
  });

  it("Should return user if it exists", async () => {
    const { sut, repository } = makeSut();
    const user = new User({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "password",
    });
    repository.add(user);
    const response = await sut.execute(request);
    expect(response).toEqual(user);
  });
});
