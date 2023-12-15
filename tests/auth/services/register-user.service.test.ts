import { TOKEN_SECRET } from "@/config";
import { TokenProvider } from "@/modules/auth/protocols";
import { JwtTokenProvider } from "@/modules/auth/providers";
import { RegisterUserService } from "@/modules/auth/services";
import { UserRepository } from "@/modules/user/protocols";
import { InMemoryUserRepository } from "@/modules/user/providers/repositories";
import { CreateUserService } from "@/modules/user/services";

type SutTypes = {
  sut: RegisterUserService;
  createUserService: CreateUserService;
  repository: UserRepository;
  tokenProvider: TokenProvider;
};

const makeSut = (): SutTypes => {
  const repository = new InMemoryUserRepository();
  const createUserService = new CreateUserService(repository);
  const tokenProvider = new JwtTokenProvider(TOKEN_SECRET);
  const sut = new RegisterUserService(createUserService, tokenProvider);
  return { sut, createUserService, repository, tokenProvider };
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
});
