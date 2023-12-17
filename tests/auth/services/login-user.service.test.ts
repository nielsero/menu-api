import { makeAuth } from "@/factories/auth.factory";
import { HashProvider, TokenProvider } from "@/modules/auth/protocols";
import { LoginUserService } from "@/modules/auth/services";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

type SutTypes = {
  sut: LoginUserService;
  hashProvider: HashProvider;
  userRepository: UserRepository;
  tokenProvider: TokenProvider;
};

const makeSut = (): SutTypes => {
  const { loginUserService: sut, hashProvider, userRepository, tokenProvider } = makeAuth();
  return { sut, hashProvider, userRepository, tokenProvider };
};

const request = {
  email: "john.doe@gmail.com",
  password: "password",
};

describe("LoginUserService", () => {
  it("Should login a user if he's already registered", async () => {
    const { sut, hashProvider, userRepository } = makeSut();
    const hashedPassword = await hashProvider.hash("password");
    const user = new User({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: hashedPassword,
    });
    userRepository.add(user);
    const response = await sut.execute(request);
    expect(response.token).toBeDefined();
  });

  it("Should throw an error if request is invalid", async () => {
    const { sut } = makeSut();
    const invalidEmailRequest = {
      email: "john.doe",
      password: "password",
    };
    expect(sut.execute(invalidEmailRequest)).rejects.toThrow();
  });

  it("Should throw an error if user is not found", async () => {
    const { sut } = makeSut();
    expect(sut.execute(request)).rejects.toThrow();
  });

  it("Should throw an error if password is incorrect", async () => {
    const { sut, hashProvider, userRepository } = makeSut();
    const hashedPassword = await hashProvider.hash("password");
    const user = new User({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: hashedPassword,
    });
    userRepository.add(user);
    const incorrectPasswordRequest = {
      email: "john.doe@gmail.com",
      password: "not-password",
    };
    expect(sut.execute(incorrectPasswordRequest)).rejects.toThrow();
  });

  it("Should generate a valid token", async () => {
    const { sut, hashProvider, userRepository, tokenProvider } = makeSut();
    const hashedPassword = await hashProvider.hash("password");
    const user = new User({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: hashedPassword,
    });
    userRepository.add(user);
    const response = await sut.execute(request);
    const token = response.token;
    const decodedToken = await tokenProvider.verify(token);
    expect(response.token).toBeDefined();
    expect(decodedToken).toBe(request.email);
  });
});
