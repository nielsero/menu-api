import { makeAuth } from "@/factories/auth.factory";
import { HashProvider, TokenProvider } from "@/modules/auth/protocols";
import { RegisterUserService } from "@/modules/auth/services";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";

type SutTypes = {
  sut: RegisterUserService;
  hashProvider: HashProvider;
  userRepository: UserRepository;
  tokenProvider: TokenProvider;
};

const makeSut = (): SutTypes => {
  const { registerUserService: sut, hashProvider, userRepository, tokenProvider } = makeAuth();
  return { sut, hashProvider, userRepository, tokenProvider };
};

const request = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "password",
};

describe("RegisterUserService", () => {
  afterEach(async () => {
    const { userRepository } = makeSut();
    await userRepository.clear();
  });

  it("Should register a user if request is valid", async () => {
    const { sut } = makeSut();
    const response = await sut.execute(request);
    expect(response).toEqual({ token: expect.any(String) });
  });

  it("Should throw an error if request is invalid", async () => {
    const { sut } = makeSut();
    const nameTooShortRequest = {
      name: "Jo",
      email: "john.doe@gmail.com",
      password: "password",
    };
    const invalidEmailRequest = {
      name: "John Doe",
      email: "john.doe",
      password: "password",
    };
    const passwordTooShortRequest = {
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "pass",
    };
    expect(sut.execute(nameTooShortRequest)).rejects.toThrow();
    expect(sut.execute(invalidEmailRequest)).rejects.toThrow();
    expect(sut.execute(passwordTooShortRequest)).rejects.toThrow();
  });

  it("Should throw an error if user already exists", async () => {
    const { sut, userRepository } = makeSut();
    const user = new User(request);
    userRepository.add(user);
    expect(sut.execute(request)).rejects.toThrow();
  });

  it("Should correctly hash user password", async () => {
    const { sut, userRepository, hashProvider } = makeSut();
    await sut.execute(request);
    const user = await userRepository.findByEmail(request.email);
    expect(user).toBeDefined();
    expect(user?.password).not.toBe(request.password);
    const isPasswordCorrect = await hashProvider.compare(request.password, user?.password || "");
    expect(isPasswordCorrect).toBe(true);
  });

  it("Should generate a valid token", async () => {
    const { sut, tokenProvider } = makeSut();
    const response = await sut.execute(request);
    expect(response.token).toBeDefined();
    const token = response.token;
    const decodedToken = await tokenProvider.verify(token);
    expect(decodedToken).toBe(request.email);
  });
});
