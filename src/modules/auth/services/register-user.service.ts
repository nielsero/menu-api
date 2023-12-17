import { CreateUserService } from "@/modules/user/services";
import { HashProvider, TokenProvider } from "@/modules/auth/protocols";
import { RequestValidator } from "@/shared/protocols";

export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  token: string;
};

export class RegisterUserService {
  constructor(
    private readonly requestValidator: RequestValidator<RegisterUserRequest>,
    private readonly hashProvider: HashProvider,
    private readonly createUserService: CreateUserService,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    await this.requestValidator.validate(request);
    const hashedPassword = await this.hashProvider.hash(request.password);
    await this.createUserService.execute({
      name: request.name,
      email: request.email,
      password: hashedPassword,
    });
    const token = await this.tokenProvider.generate(request.email);
    return { token };
  }
}
