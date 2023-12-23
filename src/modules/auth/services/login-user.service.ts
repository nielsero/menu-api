import { RequestValidator } from "@/shared/protocols";
import { HashProvider, TokenProvider } from "@/modules/auth/protocols";
import { GetUserByEmailService } from "@/modules/user/services";
import { InvalidCredentials } from "@/shared/errors";

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  token: string;
};

export type LoginUserProviders = {
  requestValidator: RequestValidator<LoginUserRequest>;
  hashProvider: HashProvider;
  getUserByEmailService: GetUserByEmailService;
  tokenProvider: TokenProvider;
};

export class LoginUserService {
  private readonly requestValidator: RequestValidator<LoginUserRequest>;
  private readonly hashProvider: HashProvider;
  private readonly getUserByEmailService: GetUserByEmailService;
  private readonly tokenProvider: TokenProvider;

  constructor(private readonly providers: LoginUserProviders) {
    this.requestValidator = providers.requestValidator;
    this.hashProvider = providers.hashProvider;
    this.getUserByEmailService = providers.getUserByEmailService;
    this.tokenProvider = providers.tokenProvider;
  }

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    await this.requestValidator.validate(request);
    const user = await this.getUserByEmailService.execute({ email: request.email });
    if (!user) throw new InvalidCredentials();
    const isPasswordValid = await this.hashProvider.compare(request.password, user.password);
    if (!isPasswordValid) throw new InvalidCredentials();
    const token = await this.tokenProvider.generate(request.email);
    return { token };
  }
}
