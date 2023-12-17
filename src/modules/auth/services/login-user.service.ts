import { RequestValidator } from "@/shared/protocols";
import { HashProvider, TokenProvider } from "@/modules/auth/protocols";
import { FindUserByEmailService } from "@/modules/user/services";
import { InvalidCredentials } from "@/shared/errors";

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  token: string;
};

export class LoginUserService {
  constructor(
    private readonly requestValidator: RequestValidator<LoginUserRequest>,
    private readonly hashProvider: HashProvider,
    private readonly findUserByEmailService: FindUserByEmailService,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    await this.requestValidator.validate(request);
    const user = await this.findUserByEmailService.execute({ email: request.email });
    if (!user) throw new InvalidCredentials();
    const isPasswordValid = await this.hashProvider.compare(request.password, user.password);
    if (!isPasswordValid) throw new InvalidCredentials();
    const token = await this.tokenProvider.generate(request.email);
    return { token };
  }
}
