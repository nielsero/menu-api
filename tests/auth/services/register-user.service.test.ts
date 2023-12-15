import { TOKEN_SECRET } from "@/config";
import { TokenProvider } from "@/modules/auth/protocols";
import { JwtTokenProvider } from "@/modules/auth/providers";
import { ZodRegisterUserRequestValidator } from "@/modules/auth/providers/validators";
import { RegisterUserRequest, RegisterUserService } from "@/modules/auth/services";
import { UserRepository } from "@/modules/user/protocols";
import { InMemoryUserRepository } from "@/modules/user/providers/repositories";
import { CreateUserService } from "@/modules/user/services";
import { RequestValidator } from "@/shared/protocols";

type SutTypes = {
  sut: RegisterUserService;
  validator: RequestValidator<RegisterUserRequest>;
  createUserService: CreateUserService;
  repository: UserRepository;
  tokenProvider: TokenProvider;
};

const makeSut = (): SutTypes => {
  const repository = new InMemoryUserRepository();
  const validator = new ZodRegisterUserRequestValidator();
  const createUserService = new CreateUserService(repository);
  const tokenProvider = new JwtTokenProvider(TOKEN_SECRET);
  const sut = new RegisterUserService(validator, createUserService, tokenProvider);
  return { sut, validator, createUserService, repository, tokenProvider };
};

describe("RegisterUserService", () => {
  it("Should register a user if request is valid", async () => {
    const { sut } = makeSut();
    const request = {
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "password",
    };
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
});
