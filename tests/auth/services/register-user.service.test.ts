import { SALT_ROUNDS, TOKEN_SECRET } from "@/config";
import { HashProvider, TokenProvider } from "@/modules/auth/protocols";
import { BCryptHashProvider, JwtTokenProvider } from "@/modules/auth/providers";
import { ZodRegisterUserRequestValidator } from "@/modules/auth/providers/validators";
import { RegisterUserRequest, RegisterUserService } from "@/modules/auth/services";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";
import { InMemoryUserRepository } from "@/modules/user/providers/repositories";
import { CreateUserService } from "@/modules/user/services";
import { RequestValidator } from "@/shared/protocols";

type SutTypes = {
  sut: RegisterUserService;
  validator: RequestValidator<RegisterUserRequest>;
  hashProvider: HashProvider;
  createUserService: CreateUserService;
  repository: UserRepository;
  tokenProvider: TokenProvider;
};

const makeSut = (): SutTypes => {
  const repository = new InMemoryUserRepository();
  const validator = new ZodRegisterUserRequestValidator();
  const hashProvider = new BCryptHashProvider(SALT_ROUNDS);
  const createUserService = new CreateUserService(repository);
  const tokenProvider = new JwtTokenProvider(TOKEN_SECRET);
  const sut = new RegisterUserService(validator, hashProvider, createUserService, tokenProvider);
  return { sut, validator, hashProvider, createUserService, repository, tokenProvider };
};

const request = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "password",
};

describe("RegisterUserService", () => {
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
    const { sut, repository } = makeSut();
    const user = new User(request);
    repository.add(user);
    expect(sut.execute(request)).rejects.toThrow();
  });

  it("Should hash user password", async () => {
    const { sut, repository } = makeSut();
    await sut.execute(request);
    const user = await repository.findByEmail(request.email);
    expect(user).toBeDefined();
    expect(user?.password).not.toBe(request.password);
  });

  it("Should generate a valid token", async () => {
    const { sut, tokenProvider } = makeSut();
    const response = await sut.execute(request);
    expect(response.token).toBeDefined();
    const token = response.token;
    const decodedToken = await tokenProvider.verifyToken(token);
    expect(decodedToken).toBe(request.email);
  });
});
